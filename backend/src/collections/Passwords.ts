import { adminOrApiKeyAuth } from '@/functions/ACL'
import type { CollectionConfig } from 'payload'
import crypto from 'crypto'
import { encryptPassword } from '@/functions/encrypting'
const ALGORITHM = 'aes-256-cbc'

export const Passwords: CollectionConfig = {
  slug: 'passwords',
  access: {
    read: ({ req }) => {
      return adminOrApiKeyAuth(req)
    },
    create: ({ req }) => {
      return adminOrApiKeyAuth(req)
    },
  },
  fields: [
    {
      name: 'password',
      type: 'text',
      required: true,
      admin: {
        readOnly: true,
      },
    },
  ],
  hooks: {
    beforeValidate: [
      async ({ data }) => {
        if (!data) {
          throw new Error('No data provided')
        }

        if ('password' in data && typeof data.password === 'string') {
          data.password = encryptPassword(data.password)
        }
        return data
      },
    ],
  },
}
