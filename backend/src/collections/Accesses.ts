import { adminOrApiKeyAuth } from '@/functions/ACL'
import type { CollectionConfig } from 'payload'

export const Accesses: CollectionConfig = {
  slug: 'accesses',
  access: {
    read: ({ req }) => {
      return adminOrApiKeyAuth(req)
    },
    delete: ({ req }) => {
      return adminOrApiKeyAuth(req)
    },
    update: ({ req }) => {
      return adminOrApiKeyAuth(req)
    },
    create: ({ req }) => {
      return adminOrApiKeyAuth(req)
    },
  },
  fields: [
    {
      name: 'activityGroups',
      type: 'relationship',
      relationTo: 'activity-groups',
      hasMany: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'monthlyNotification',
      type: 'relationship',
      relationTo: 'monthly-notifications',
      required: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'subscribe',
      type: 'relationship',
      relationTo: 'subscribes',
      required: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'subscribeId',
      type: 'text',
      required: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'accessId',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        readOnly: true,
      },
    },
  ],
}
