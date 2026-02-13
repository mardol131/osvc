import { adminOrApiKeyAuth } from '@/functions/ACL'
import type { CollectionConfig } from 'payload'
import webpush from 'web-push'

export const PushSubscriptions: CollectionConfig = {
  slug: 'push-subscriptions',
  admin: {
    useAsTitle: 'id',
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
      const user = req.user
      const query = req.query
      if (user && user.collection === 'accounts') {
        return {
          endpoint: {
            equals: query?.endpoint as string | undefined,
          },
        }
      }
      return adminOrApiKeyAuth(req)
    },
    update: async ({ req }) => {
      const user = req.user
      const query = req.query
      if (user && user.collection === 'accounts') {
        return {
          endpoint: {
            equals: query?.endpoint as string | undefined,
          },
        }
      }
      return adminOrApiKeyAuth(req)
    },
    delete: async ({ req }) => {
      const user = req.user
      const query = req.query
      if (user && user.collection === 'accounts') {
        return {
          endpoint: {
            equals: query?.endpoint as string | undefined,
          },
        }
      }
      return adminOrApiKeyAuth(req)
    },
  },
  fields: [
    {
      name: 'endpoint',
      type: 'text',
      unique: false,
      required: true,
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
    {
      name: 'sendTestSubscriptionAfterSave',
      type: 'checkbox',
      admin: {
        position: 'sidebar',
        description: 'Odeslat testovací push notifikaci po uložení této subscription',
      },
    },
    {
      name: 'testNotificationTitle',
      type: 'text',
      label: 'Název testovací notifikace',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'testNotificationBody',
      type: 'text',
      label: 'Text testovací notifikace',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'testNotificationUrl',
      type: 'text',
      label: 'URL pro testovací notifikaci',
      admin: {
        position: 'sidebar',
      },
    },
  ],
  hooks: {
    beforeChange: [
      //   async ({ data, req, operation }) => {
      //     const user = req.user

      //     // Při vytváření nové subscripce zkontrolujeme, jestli už neexistuje pro stejné endpoint
      //     if (data.endpoint && operation === 'create') {
      //       const existing = await req.payload.find({
      //         collection: 'push-subscriptions',
      //         where: {
      //           endpoint: {
      //             equals: data.endpoint,
      //           },
      //         },
      //       })

      //       if (existing.totalDocs > 0) {
      //         throw new Error('Subscription s tímto endpoint již existuje')
      //       }
      //     }
      //   },

      //   async ({ data, req, operation }) => {
      //     // Při vytváření nové subscripce přiřadíme ji k aktuálnímu uživateli, pokud je přihlášen
      //     const user = req.user
      //     let body = {} as any

      //     if (req.json && typeof req.json === 'function') {
      //       try {
      //         body = await req.json()
      //       } catch (e) {
      //         body = {}
      //       }
      //     }

      //     if (user && user.collection === 'accounts' && operation) {
      //       if (body?.deleteAccount !== true) {
      //         data.account = user.id
      //       } else {
      //         console.log('Odebírám subscription z účtu kvůli deleteAccount flagu')
      //       }
      //     }
      //     return data
      //   },

      async ({ data, req }) => {
        const user = req.user
        if (!user || user.collection !== 'accounts') return data

        if (req.query?.deleteAccount || req.query?.deleteAccount === 'true') {
          data.account = null
          console.log('Odebírám subscription z účtu kvůli deleteAccount flagu v query')
          return data
        }

        data.account = user.id

        return data
      },
      async ({ data, operation }) => {
        if (data.sendTestSubscriptionAfterSave && operation === 'update') {
          webpush.setVapidDetails(
            process.env.NEXT_PUBLIC_VAPID_SUBJECT || 'mailto:info@osvc365.cz',
            process.env.NEXT_PUBLIC_VAPID_KEY || '',
            process.env.VAPID_PRIVATE_KEY || '',
          )

          try {
            await webpush.sendNotification(
              {
                endpoint: data.endpoint,
                keys: {
                  p256dh: data.p256dh,
                  auth: data.auth,
                },
              },
              JSON.stringify({
                title: data.testNotificationTitle || 'Testovací notifikace',
                body: data.testNotificationBody || 'Toto je testovací push notifikace',
                data: {
                  url: data.testNotificationUrl || `/testovací-access-link`,
                },
              }),
            )
          } catch (error) {
            console.error('Chyba při odesílání testovací push notifikace:', error)
          }

          console.log(data)

          data.sendTestSubscriptionAfterSave = false
          data.testNotificationTitle = undefined
          data.testNotificationBody = undefined
          data.testNotificationUrl = undefined
        }

        return data
      },
    ],
    beforeRead: [
      async ({ req, doc }) => {
        const user = req.user
        console.log('Kontroluji přístup k subscription pro uživatele', user?.id)
        if (user && user.collection === 'accounts') {
          if (doc.account) {
            const accountId = typeof doc.account === 'string' ? doc.account : doc.account.id
            console.log(
              'Kontroluji přístup k subscription pro uživatele',
              user.id,
              's accountId',
              accountId,
            )
            if (accountId !== user.id) {
              return (doc.account = null)
            }
          }
        }
      },
    ],
  },
}
