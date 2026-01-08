import { apiKeyAuth } from '@/functions/ACL'
import {
  createGeneralNotificationEmail,
  createGeneralNotificationSms,
} from '@/functions/notifications'
import { ActivityGroup, Subscribe } from '@/payload-types'
import type { CollectionConfig, Field } from 'payload'

export const notificationFields: Field[] = [
  { name: 'text', type: 'textarea', required: true },
  { name: 'mobileText', type: 'textarea', required: true },
  { name: 'description', type: 'textarea', required: true },
  { name: 'link', type: 'text' },
  { name: 'date', type: 'date' },
  {
    name: 'activityGroups',
    type: 'relationship',
    relationTo: 'activity-groups',
    hasMany: true,
    required: true,
  },
]

export const MonthlyNotifications: CollectionConfig = {
  slug: 'monthly-notifications',
  access: {
    read: ({ req }) => {
      if (req.user && req.user?.role.includes('admin')) return true
      const apiKey = req.headers.get('authorization')
      if (!apiKey) return false
      return apiKeyAuth(apiKey)
    },
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'month',
      type: 'select',
      options: [
        { label: 'Leden', value: 'Leden' },
        { label: 'Únor', value: 'Únor' },
        { label: 'Březen', value: 'Březen' },
        { label: 'Duben', value: 'Duben' },
        { label: 'Květen', value: 'Květen' },
        { label: 'Červen', value: 'Červen' },
        { label: 'Červenec', value: 'Červenec' },
        { label: 'Srpen', value: 'Srpen' },
        { label: 'Září', value: 'Září' },
        { label: 'Říjen', value: 'Říjen' },
        { label: 'Listopad', value: 'Listopad' },
        { label: 'Prosinec', value: 'Prosinec' },
      ],
      admin: {
        position: 'sidebar',
      },
      required: true,
    },
    {
      name: 'year',
      type: 'select',
      required: true,
      options: [
        { label: '2023', value: '2023' },
        { label: '2024', value: '2024' },
        { label: '2025', value: '2025' },
        { label: '2026', value: '2026' },
        { label: '2027', value: '2027' },
        { label: '2028', value: '2028' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'data',
      type: 'array',
      fields: notificationFields,
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc, req: { payload } }) => {
        if (doc._status === 'draft') {
          console.log('Draft detected, skipping notifications sending.')
          return doc
        }

        await payload.jobs.queue({
          workflow: 'monthlyNotificationsWorkflow',
          input: {
            monthlyNotificationId: doc.id,
          },
        })

        return doc
      },
    ],
  },
}
