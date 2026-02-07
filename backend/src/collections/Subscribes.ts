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
        if (operation === 'create') {
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
  },
}
