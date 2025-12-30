import { apiKeyAuth } from '@/functions/ACL'
import type { CollectionConfig } from 'payload'

export const DraftSubscribes: CollectionConfig = {
  slug: 'draft-subscribes',
  access: {
    create: async ({ req }) => {
      const apiKey = req.headers.get('authorization')
      if (!apiKey) return false
      return apiKeyAuth(apiKey)
    },
    read: () => true,
  },
  fields: [
    {
      name: 'activityGroups',
      type: 'relationship',
      relationTo: 'activity-groups',
      hasMany: true,
    },
  ],
}
