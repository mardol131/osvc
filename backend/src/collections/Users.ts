import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: {
    useSessions: true,
    useAPIKey: true,
  },
  fields: [
    {
      name: 'role',
      type: 'select',
      options: ['admin', 'public-api'],
      required: true,
      hasMany: true,
    },
  ],
}
