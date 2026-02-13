import { adminOrApiKeyAuth, apiKeyAuth } from '@/functions/ACL'
import { jwtSign, type CollectionConfig } from 'payload'
import crypto from 'crypto'
import { sendEmail } from '@osvc/react-email'
import { decryptPassword } from '@/functions/encrypting'
import { renderMagicLinkLoginEmail } from '@osvc/react-email'
import { renderCreatePasswordEmail } from 'node_modules/@osvc/react-email/dist/functions/render-email'

export const Accounts: CollectionConfig = {
  slug: 'accounts',
  auth: {
    forgotPassword: {
      generateEmailHTML: async (data) => {
        const query = data?.req?.query

        const link = `${typeof query?.redirectUrl === 'string' ? query.redirectUrl : ''}?token=${data?.token}&loginModalScreen=set-password&openLoginModal=true`
        const newPasswordEmail = await renderCreatePasswordEmail({
          link: link,
        })

        await sendEmail(
          'OSVČ365 <info@osvc365.cz>',
          data?.user?.email,
          'Nastavení nového hesla',
          newPasswordEmail,
        )

        return newPasswordEmail
      },
    },
  },
  admin: {
    useAsTitle: 'email',
  },

  access: {
    create: async ({ req }) => {
      return adminOrApiKeyAuth(req)
    },
    read: async ({ req }) => {
      const user = req.user
      if (user && user.collection === 'accounts') {
        return {
          id: {
            equals: user.id,
          },
        }
      }
      return adminOrApiKeyAuth(req)
    },
    update: async ({ req }) => {
      const user = req.user
      if (user && user.collection === 'accounts') {
        return {
          id: {
            equals: user.id,
          },
        }
      }
      return adminOrApiKeyAuth(req)
    },
    delete: async ({ req }) => {
      return adminOrApiKeyAuth(req)
    },
  },

  fields: [
    {
      name: 'stripe',
      type: 'group',
      fields: [
        {
          name: 'customerId',
          type: 'text',
        },
      ],
      access: {
        update: async ({ req }) => {
          return adminOrApiKeyAuth(req)
        },
      },
    },
    {
      name: 'terms',
      type: 'checkbox',
      label: 'Souhlas s obchodními podmínkami',
      required: true,
      access: {
        update: async ({ req }) => {
          return adminOrApiKeyAuth(req)
        },
      },
    },
    {
      name: 'marketing',
      type: 'checkbox',
      label: 'Souhlas se zasíláním marketingových sdělení',
      access: {
        update: async ({ req }) => {
          return adminOrApiKeyAuth(req)
        },
      },
    },
  ],
}
