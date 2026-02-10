import { adminOrApiKeyAuth } from '@/functions/ACL'
import { generateAlphanumericId } from '@/functions/generateAlphanumericId'
import type { CollectionConfig } from 'payload'

export const Subscribes: CollectionConfig = {
  slug: 'subscribes',
  admin: {
    useAsTitle: 'email',
  },
  access: {
    create: async ({ req }) => {
      return adminOrApiKeyAuth(req)
    },
    read: async ({ req }) => {
      const user = req.user
      if (user && user.collection === 'accounts') {
        return {
          account: {
            equals: user.id,
          },
        }
      }
      return adminOrApiKeyAuth(req)
    },
    update: async ({ req }) => {
      const user = req.user
      // Běžný uživatel může měnit svoje předplatné
      if (user && user.collection === 'accounts') {
        return {
          account: {
            equals: user.id,
          },
        }
      }
      return adminOrApiKeyAuth(req)
    },
    delete: async ({ req }) => {
      return adminOrApiKeyAuth(req)
    },
  },
  fields: [
    {
      name: 'email',
      type: 'email',
      admin: {
        readOnly: true,
      },
      required: true,
      access: {
        update: async ({ req }) => {
          // Běžný uživatel může měnit email
          return true
        },
      },
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
      admin: {
        readOnly: true,
      },
      access: {
        update: async ({ req }) => {
          // Běžný uživatel může měnit phone
          return true
        },
      },
    },
    {
      name: 'phonePrefix',
      type: 'text',
      required: true,
      admin: {
        readOnly: true,
      },
      access: {
        update: async ({ req }) => {
          // Běžný uživatel může měnit phonePrefix
          return true
        },
      },
    },
    {
      name: 'activityGroups',
      type: 'relationship',
      relationTo: 'activity-groups',
      admin: {
        readOnly: true,
      },
      hasMany: true,
      required: true,
      access: {
        update: async ({ req }) => {
          // Běžný uživatel nemůže měnit activityGroups
          return adminOrApiKeyAuth(req)
        },
      },
    },
    {
      name: 'notificationSettings',
      type: 'group',
      admin: {
        readOnly: true,
      },
      fields: [
        {
          name: 'emailNotifications',
          type: 'checkbox',
          label: 'Emailové notifikace',
          defaultValue: true,
        },
        {
          name: 'smsNotifications',
          type: 'checkbox',
          label: 'SMS notifikace',
          defaultValue: true,
        },
        {
          name: 'mobileNotifications',
          type: 'checkbox',
          label: 'Mobilní notifikace',
          defaultValue: false,
        },
        {
          name: 'browserNotifications',
          type: 'checkbox',
          label: 'Browser notifikace',
          defaultValue: false,
        },
      ],
    },
    {
      name: 'terms',
      type: 'checkbox',
      label: 'Souhlasím s obchodními podmínkami a zpracováním osobních údajů',
      required: true,
      admin: {
        readOnly: true,
      },
      access: {
        update: async ({ req }) => {
          // Běžný uživatel nemůže měnit activityGroups
          return adminOrApiKeyAuth(req)
        },
      },
    },
    {
      name: 'marketing',
      type: 'checkbox',
      label: 'Souhlas s marketingem',
      required: false,
      admin: {
        readOnly: true,
      },
      access: {
        update: async ({ req }) => {
          // Běžný uživatel nemůže měnit activityGroups
          return adminOrApiKeyAuth(req)
        },
      },
    },
    {
      name: 'active',
      type: 'checkbox',
      label: 'Aktivní předplatné',
      defaultValue: false,
      access: {
        update: async ({ req }) => {
          // Běžný uživatel nemůže měnit active
          return adminOrApiKeyAuth(req)
        },
      },
    },
    {
      name: 'promocodeAlreadySent',
      type: 'checkbox',
      label: 'Promokód již byl odeslán',
      defaultValue: false,
      admin: {
        readOnly: true,
      },
      access: {
        update: async ({ req }) => {
          // Běžný uživatel nemůže měnit promocodeAlreadySent
          return adminOrApiKeyAuth(req)
        },
      },
    },
    {
      name: 'promotionCode',
      type: 'text',
      admin: {
        readOnly: true,
      },
      access: {
        update: async ({ req }) => {
          // Běžný uživatel nemůže měnit activityGroups
          return adminOrApiKeyAuth(req)
        },
      },
    },
    {
      name: 'stripeSubscribeId',
      type: 'text',
      admin: {
        readOnly: true,
      },
      access: {
        update: async ({ req }) => {
          // Běžný uživatel nemůže měnit activityGroups
          return adminOrApiKeyAuth(req)
        },
      },
    },
    {
      name: 'subscribeId',
      type: 'text',
      admin: {
        readOnly: true,
      },
      defaultValue: () => generateAlphanumericId(),
      required: true,
      access: {
        update: async ({ req }) => {
          // Běžný uživatel nemůže měnit activityGroups
          return adminOrApiKeyAuth(req)
        },
      },
    },
    {
      name: 'account',
      type: 'relationship',
      relationTo: 'accounts',
      required: true,
      access: {
        update: async ({ req }) => {
          // Běžný uživatel nemůže měnit account
          return adminOrApiKeyAuth(req)
        },
      },
      admin: {
        readOnly: true,
      },
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc, previousDoc, req: { payload }, operation }) => {
        if (operation === 'create' && (doc.marketing || doc.marketing === 'true')) {
          await payload.jobs.queue({
            workflow: 'addMarketingContactWorkflow',
            input: {
              subscriptionId: doc.id,
            },
          })
        }

        let accountEmail = ''
        if (typeof doc.account === 'string') {
          const account = await payload.findByID({
            id: doc.account,
            collection: 'accounts',
          })
          accountEmail = account?.email || ''
        } else {
          accountEmail = doc.email
        }

        if (
          operation === 'update' &&
          previousDoc &&
          previousDoc.active === false &&
          doc.active === true
        ) {
          if (previousDoc.promocodeAlreadySent === false && doc.promocodeAlreadySent) {
            await payload.jobs.queue({
              workflow: 'subscriptionActivatedWorkflow',
              input: {
                promotionCode: doc.promotionCode,
                email: doc.email,
                accountEmail: accountEmail,
              },
            })
          } else {
            await payload.jobs.queue({
              workflow: 'subscriptionActivatedWorkflow',
              input: {
                email: doc.email,
                accountEmail: accountEmail,
              },
            })
          }
        }

        return doc
      },
    ],
    beforeChange: [
      async ({ data }) => {
        if (data && data.email) {
          data.email = data.email.toLowerCase()
        }
        return data
      },
    ],
  },
}
