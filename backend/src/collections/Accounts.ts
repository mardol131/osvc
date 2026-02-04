import { adminOrApiKeyAuth, apiKeyAuth } from '@/functions/ACL'
import { jwtSign, type CollectionConfig } from 'payload'
import crypto from 'crypto'
import { sendEmail } from '@osvc/react-email'

export const Accounts: CollectionConfig = {
  slug: 'accounts',
  auth: true,
  admin: {
    useAsTitle: 'email',
  },
  access: {
    create: async ({ req }) => {
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
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'stripe',
      type: 'group',
      fields: [
        {
          name: 'customerId',
          type: 'text',
        },
      ],
    },
    {
      name: 'terms',
      type: 'checkbox',
      label: 'Souhlas s obchodními podmínkami',
      required: true,
    },
    {
      name: 'marketing',
      type: 'checkbox',
      label: 'Souhlas se zasíláním marketingových sdělení',
    },
    {
      name: 'magicToken',
      type: 'text',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'magicTokenExpiration',
      type: 'date',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'passwordRelation',
      type: 'relationship',
      relationTo: 'passwords',
      admin: {
        readOnly: true,
      },
      required: true,
    },
  ],
  endpoints: [
    {
      method: 'get',
      path: '/send-magic-link-email',
      handler: async (req) => {
        const apiKey = req.headers.get('authorization')
        if (!apiKey) {
          return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 })
        }
        const isAuthorized = apiKeyAuth(apiKey)
        if (!isAuthorized) {
          return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 })
        }
        const { email } = req.query
        if (!email || typeof email !== 'string') {
          return new Response(
            JSON.stringify({ message: 'Bad Request: Missing or invalid email parameter' }),
            { status: 400 },
          )
        }

        const payload = req.payload

        const accounts = await payload.find({
          collection: 'accounts',
          where: {
            email: {
              equals: email,
            },
          },
        })
        if (accounts.totalDocs === 0) {
          return new Response(JSON.stringify({ message: 'Account not found' }), { status: 404 })
        }

        const token = crypto.randomBytes(32).toString('hex')
        const expires = new Date(Date.now() + 15 * 60 * 1000)

        await payload.update({
          collection: 'accounts',
          id: accounts.docs[0].id,
          data: {
            magicToken: token,
            magicTokenExpiration: expires.toISOString(),
          },
        })

        const link = `${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/magic-login?token=${token}&email=${email}`

        await sendEmail(
          'info@osvc365.cz',
          [email],
          'Váš odkaz pro přihlášení',
          `<p>Klikněte na následující odkaz pro přihlášení (platný 15 minut):</p><p><a href="${link}">${link}</a></p>`,
        )

        return new Response(JSON.stringify({ message: 'Magic link sent' }), { status: 200 })
      },
    },
    {
      method: 'get',
      path: '/verify-token',
      handler: async (req) => {
        const { email, token } = req.query
        if (!email || typeof email !== 'string' || !token || typeof token !== 'string') {
          return new Response(
            JSON.stringify({ message: 'Bad Request: Missing or invalid parameters' }),
            { status: 400 },
          )
        }

        // const apiKey = req.headers.get('authorization')
        // if (!apiKey) {
        //   return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 })
        // }
        // const isAuthorized = apiKeyAuth(apiKey)
        // if (!isAuthorized) {
        //   return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 })
        // }

        const payload = req.payload
        const accounts = await payload.find({
          collection: 'accounts',
          where: {
            email: {
              equals: email,
            },
          },
        })
        if (accounts.totalDocs === 0) {
          return new Response(JSON.stringify({ message: 'Account not found' }), { status: 404 })
        }
        const account = accounts.docs[0]

        if (
          account.magicToken !== token
          //   !account.magicTokenExpiration ||
          //   new Date(account.magicTokenExpiration) < new Date()
        ) {
          return new Response(JSON.stringify({ message: 'Invalid or expired token' }), {
            status: 401,
          })
        }

        if (!process.env.PAYLOAD_SECRET) {
          return new Response(
            JSON.stringify({ message: 'Server configuration error: Missing PAYLOAD_SECRET' }),
            { status: 500 },
          )
        }

        const authToken = await jwtSign({
          fieldsToSign: {
            id: account.id,
            email: account.email,
            collection: 'accounts',
          },
          secret: process.env.PAYLOAD_SECRET,
          tokenExpiration: 1000 * 60 * 60 * 24 * 7, // 7 dní
        })

        // // Vyčistit magic token
        // await payload.update({
        //   collection: 'accounts',
        //   id: account.id,
        //   data: {
        //     magicToken: null,
        //     magicTokenExpiration: null,
        //   },
        // })

        const response = new Response(
          JSON.stringify({
            token: authToken.token,
            user: {
              id: account.id,
              email: account.email,
            },
          }),
          { status: 200 },
        )

        // Nastavit Set-Cookie header aby Payload token validoval
        response.headers.set(
          'Set-Cookie',
          `payload-token=${authToken.token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${7 * 24 * 60 * 60}`,
        )

        return response
      },
    },
  ],
}
