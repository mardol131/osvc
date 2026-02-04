import { adminOrApiKeyAuth, apiKeyAuth } from '@/functions/ACL'
import type { CollectionConfig } from 'payload'
import { notificationFields } from './MonthlyNotification'

export const Obligations: CollectionConfig = {
  slug: 'obligations',
  access: {
    read: ({ req }) => {
      return adminOrApiKeyAuth(req)
    },
    delete: ({ req }) => {
      return adminOrApiKeyAuth(req)
    },
  },
  fields: [
    ...notificationFields,
    { name: 'date', type: 'date', required: true },
    { name: 'monthlyNotificationId', type: 'text', required: true },
  ],
}
