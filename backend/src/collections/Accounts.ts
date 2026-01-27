import { apiKeyAuth } from '@/functions/ACL'
import type { CollectionConfig } from 'payload'

export const Accounts: CollectionConfig = {
  slug: 'accounts',
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
      name: 'stripe',
      type: 'group',
      fields: [
        {
          name: 'customerId',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'terms',
      type: 'checkbox',
      label: 'Souhlas s obchodními podmínkami',
      required: true,
    },
    {
      name: 'marketing',
      type: 'checkbox',
      label: 'Souhlas se zasíláním marketingových sdělení',
    },
  ],
}
