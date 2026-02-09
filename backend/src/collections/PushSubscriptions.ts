import { adminOrApiKeyAuth } from '@/functions/ACL'
import type { CollectionConfig } from 'payload'

export const PushSubscriptions: CollectionConfig = {
  slug: 'push-subscriptions',
  admin: {
    useAsTitle: 'endpoint',
  },
  access: {
    create: async ({ req }) => {
      // Lze vytvořit přes API klíč nebo frontend
      return adminOrApiKeyAuth(req)
    },
    read: async ({ req }) => {
      return adminOrApiKeyAuth(req)
    },
    update: async ({ req }) => {
      return adminOrApiKeyAuth(req)
    },
    delete: async ({ req }) => {
      return adminOrApiKeyAuth(req)
    },
  },
  fields: [
    {
      name: 'endpoint',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'p256dh',
      type: 'text',
      required: true,
      admin: {
        hidden: true,
        readOnly: true,
      },
    },
    {
      name: 'auth',
      type: 'text',
      required: true,
      admin: {
        hidden: true,
        readOnly: true,
      },
    },
    {
      name: 'account',
      type: 'relationship',
      relationTo: 'accounts',
      required: false,
    },
  ],
}
