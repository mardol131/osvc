import { adminOrApiKeyAuth } from '@/functions/ACL'
import { set } from 'date-fns'
import type { CollectionConfig, Field } from 'payload'

export const notificationFields: Field[] = [
  { name: 'text', type: 'textarea', required: true },
  { name: 'mobileText', type: 'textarea', required: true },
  { name: 'description', type: 'textarea', required: true },
  { name: 'link', type: 'text' },
  {
    name: 'activityGroups',
    type: 'relationship',
    relationTo: 'activity-groups',
    hasMany: true,
    required: true,
  },
]

const monthsArray = [
  'Leden',
  'Únor',
  'Březen',
  'Duben',
  'Květen',
  'Červen',
  'Červenec',
  'Srpen',
  'Září',
  'Říjen',
  'Listopad',
  'Prosinec',
]

export const MonthlyNotifications: CollectionConfig = {
  slug: 'monthly-notifications',
  access: {
    read: ({ req }) => {
      return adminOrApiKeyAuth(req)
    },
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      type: 'collapsible',
      label: 'Měsíc a rok, na který notifikace cílí',
      admin: {
        position: 'sidebar',
        initCollapsed: false,
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
          defaultValue: () => {
            const monthIndex = new Date().getMonth()
            if (monthIndex === 11) {
              return monthsArray[0]
            }
            return monthsArray[monthIndex + 1]
          },
          admin: {
            position: 'sidebar',
          },
          required: true,
        },
        {
          name: 'year',
          type: 'text',
          required: true,
          defaultValue: () => {
            if (new Date().getMonth() === 11) {
              return (new Date().getFullYear() + 1).toString()
            }
            return new Date().getFullYear().toString()
          },
          admin: {
            position: 'sidebar',
          },
        },
      ],
    },
    {
      name: 'notifications',
      label: 'Notifikace',
      type: 'array',
      fields: [
        ...notificationFields,
        { name: 'date', type: 'date', label: 'Poslední možné datum pro vyplnění' },
      ],
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc, req: { payload } }) => {
        if (doc._status === 'draft') {
          console.log('Draft detected, skipping notifications sending.')
          return doc
        }

        const waitUntil = set(new Date(), {
          date: 20,
          hours: 16,
          minutes: 0,
          seconds: 0,
          milliseconds: 0,
        })

        await payload.jobs.queue({
          workflow: 'monthlyNotificationsWorkflow',
          waitUntil: waitUntil,
          input: {
            monthlyNotificationId: doc.id,
          },
        })

        return doc
      },
    ],
  },
}
