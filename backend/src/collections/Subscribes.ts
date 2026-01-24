import { apiKeyAuth } from '@/functions/ACL'
import { generateAlphanumericId } from '@/functions/generateAlphanumericId'
import { addYears } from 'date-fns'
import type { CollectionConfig } from 'payload'

export const Subscribes: CollectionConfig = {
  slug: 'subscribes',
  admin: {
    useAsTitle: 'email',
  },
  access: {
    create: async ({ req }) => {
      if (req.user && req.user?.role.includes('admin')) return true
      const apiKey = req.headers.get('authorization')
      if (!apiKey) return false
      return apiKeyAuth(apiKey)
    },
    read: async ({ req }) => {
      if (req.user && req.user?.role.includes('admin')) return true
      const apiKey = req.headers.get('authorization')
      if (!apiKey) return false
      return apiKeyAuth(apiKey)
    },
    update: async ({ req }) => {
      if (req.user && req.user?.role.includes('admin')) return true
      const apiKey = req.headers.get('authorization')

      if (!apiKey) return false
      return apiKeyAuth(apiKey)
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
      required: true,
    },

    {
      name: 'customerId',
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
  ],
  hooks: {
    afterChange: [
      async ({ doc, req: { payload }, operation }) => {
        if (operation === 'create') {
          await payload.jobs.queue({
            workflow: 'subscriptionCreatedWorkflow',
            input: {
              promotionCode: doc.promotionCode,
              email: doc.email,
            },
          })

          await payload.jobs.queue({
            workflow: 'addMarketingContactWorkflow',
            input: {
              subscriptionId: doc.id,
            },
          })
        }

        return doc
      },
    ],
  },
}
