import { apiKeyAuth } from '@/functions/ACL'
import type { CollectionConfig } from 'payload'

export const Accesses: CollectionConfig = {
  slug: 'accesses',
  access: {
    read: ({ req }) => {
      if (req.user && req.user?.role.includes('admin')) return true
      const apiKey = req.headers.get('authorization')
      if (!apiKey) return false
      return apiKeyAuth(apiKey)
    },
  },
  fields: [
    {
      name: 'activityGroups',
      type: 'relationship',
      relationTo: 'activity-groups',
      hasMany: true,
    },
    {
      name: 'monthlyNotification',
      type: 'relationship',
      relationTo: 'monthly-notifications',
      required: true,
    },
    {
      name: 'subscribe',
      type: 'relationship',
      relationTo: 'subscribes',
      required: true,
    },
    {
      name: 'accessId',
      type: 'text',
      required: true,
      unique: true,
    },
  ],
}
