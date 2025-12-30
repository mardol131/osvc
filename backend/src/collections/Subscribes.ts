import { apiKeyAuth } from '@/functions/ACL'
import type { CollectionConfig } from 'payload'

export const Subscribes: CollectionConfig = {
  slug: 'subscribes',
  admin: {
    useAsTitle: 'email',
  },
  access: {
    create: async ({ req }) => {
      const apiKey = req.headers.get('authorization')
      if (!apiKey) return false
      return apiKeyAuth(apiKey)
    },
    read: () => true,
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
      required: false,
    },
    {
      name: 'phonePrefix',
      type: 'text',
      required: false,
    },
    {
      name: 'activityGroups',
      type: 'relationship',
      relationTo: 'activity-groups',
      hasMany: true,
    },
    {
      name: 'active',
      type: 'checkbox',
      label: 'Aktivní předplatné',
      defaultValue: false,
    },
  ],
}
