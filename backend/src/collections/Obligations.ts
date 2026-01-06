import { apiKeyAuth } from '@/functions/ACL'
import type { CollectionConfig } from 'payload'
import { notificationFields } from './MonthlyNotification'

export const Obligations: CollectionConfig = {
  slug: 'obligations',
  access: {
    read: ({ req }) => {
      if (req.user && req.user?.role.includes('admin')) return true
      const apiKey = req.headers.get('authorization')
      if (!apiKey) return false
      return apiKeyAuth(apiKey)
    },
    delete: ({ req }) => {
      if (req.user && req.user?.role.includes('admin')) return true
      const apiKey = req.headers.get('authorization')
      if (!apiKey) return false
      return apiKeyAuth(apiKey)
    },
  },
  fields: [
    ...notificationFields,
    {
      name: 'activityGroups',
      type: 'relationship',
      relationTo: 'activity-groups',
      hasMany: true,
      required: true,
    },
  ],
}
