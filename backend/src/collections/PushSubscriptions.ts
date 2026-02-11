import { adminOrApiKeyAuth } from '@/functions/ACL'
import type { CollectionConfig } from 'payload'
import webpush from 'web-push'

export const PushSubscriptions: CollectionConfig = {
  slug: 'push-subscriptions',
  admin: {
    useAsTitle: 'endpoint',
  },
  access: {
    create: async ({ req }) => {
      const user = req.user
      if (user && user.collection === 'accounts') {
        return true
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
  endpoints: [
    {
      path: '/send-notification',
      method: 'post',
      handler: async (req) => {
        let body: Record<string, unknown> = {}
        try {
          body = req.json ? await req.json() : {}
        } catch {
          return new Response(JSON.stringify({ success: false, message: 'Invalid JSON body' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          })
        }

        const title = body.title as string | undefined
        const message = body.message as string | undefined
        const notificationId = body.notificationId as string | number | undefined

        if (!title || !message) {
          const response: Response = new Response(
            JSON.stringify({ success: false, message: 'Title and message are required' }),
            {
              status: 400,
              headers: { 'Content-Type': 'application/json' },
            },
          )
          return response
        }

        if (!notificationId) {
          const response: Response = new Response(
            JSON.stringify({ success: false, message: 'Notification ID is required' }),
            {
              status: 400,
              headers: { 'Content-Type': 'application/json' },
            },
          )
          return response
        }

        const pushSubscribe = await req.payload.findByID({
          collection: 'push-subscriptions',
          id: notificationId,
        })
        if (!pushSubscribe) {
          const response: Response = new Response(
            JSON.stringify({ success: false, message: 'Subscription not found' }),
            {
              status: 404,
              headers: { 'Content-Type': 'application/json' },
            },
          )
          return response
        }

        webpush.setVapidDetails(
          process.env.NEXT_PUBLIC_VAPID_SUBJECT!,
          process.env.NEXT_PUBLIC_VAPID_KEY!,
          process.env.VAPID_PRIVATE_KEY!,
        )

        const payload = JSON.stringify({
          title: 'OSVC365.cz - Notifikace',
          body: message,
          url: '/',
        })

        const response = await webpush.sendNotification(
          {
            endpoint: pushSubscribe.endpoint,
            keys: {
              p256dh: pushSubscribe.p256dh,
              auth: pushSubscribe.auth,
            },
          },
          payload,
        )
        console.log(response)

        return new Response(
          JSON.stringify({ success: true, message: 'Notification endpoint ready' }),
          {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          },
        )
      },
    },
  ],
}
