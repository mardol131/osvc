import { adminOrApiKeyAuth } from '@/functions/ACL'
import type { CollectionConfig } from 'payload'

export const PushSubscriptions: CollectionConfig = {
  slug: 'push-subscriptions',
  admin: {
    useAsTitle: 'endpoint',
  },
  access: {
    create: async ({ req }) => {
      const user = req.user
      if (user && user.collection === 'accounts') {
        return {
          account: {
            equals: user.id,
          },
        }
      }
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
        readOnly: true,
      },
    },
    {
      name: 'auth',
      type: 'text',
      required: true,
      admin: {
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
  hooks: {
    beforeChange: [
      async ({ data, req }) => {
        // Při vytváření nové subscripce zkontrolujeme, jestli už neexistuje pro stejné endpoint
        if (data.endpoint) {
          const existing = await req.payload.find({
            collection: 'push-subscriptions',
            where: {
              endpoint: {
                equals: data.endpoint,
              },
            },
          })
          if (existing.totalDocs > 0) {
            throw new Error('Subscription with this endpoint already exists')
          }
        }
      },

      async ({ data, req }) => {
        // Při vytváření nové subscripce přiřadíme ji k aktuálnímu uživateli, pokud je přihlášen
        const user = req.user
        if (user && user.collection === 'accounts') {
          data.account = user.id
        }
        return data
      },
    ],
  },
}
