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
      return adminOrApiKeyAuth(req)
    },
    update: async ({ req }) => {
      return adminOrApiKeyAuth(req)
    },
  },
  fields: [
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
    },
    {
      name: 'phonePrefix',
      type: 'text',
      required: true,
    },
    {
      name: 'activityGroups',
      type: 'relationship',
      relationTo: 'activity-groups',
      hasMany: true,
      required: true,
    },
    {
      name: 'terms',
      type: 'checkbox',
      label: 'Souhlasím s obchodními podmínkami a zpracováním osobních údajů',
      required: true,
      admin: {
        readOnly: true,
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
    },
    {
      name: 'active',
      type: 'checkbox',
      label: 'Aktivní předplatné',
      defaultValue: false,
    },
    {
      name: 'promocodeAlreadySent',
      type: 'checkbox',
      label: 'Promokód již byl odeslán',
      defaultValue: false,
    },
    {
      name: 'promotionCode',
      type: 'text',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'stripeSubscribeId',
      type: 'text',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'subscribeId',
      type: 'text',
      defaultValue: () => generateAlphanumericId(),
      required: true,
    },
    {
      name: 'account',
      type: 'relationship',
      relationTo: 'accounts',
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

        if (
          operation === 'update' &&
          previousDoc &&
          previousDoc.active === false &&
          doc.active === true
        ) {
          console.log({
            previousDoc,
            doc,
          })
          if (previousDoc.promocodeAlreadySent === false && doc.promocodeAlreadySent === true) {
            console.log('Email with promotion code')
            await payload.jobs.queue({
              workflow: 'subscriptionActivatedWorkflow',
              input: {
                promotionCode: doc.promotionCode,
                email: doc.email,
              },
            })
          } else if (doc.promocodeAlreadySent === true) {
            console.log('Email without promotion code')
            await payload.jobs.queue({
              workflow: 'subscriptionActivatedWorkflow',
              input: {
                email: doc.email,
              },
            })
          }
        }

        return doc
      },
    ],
  },
}
