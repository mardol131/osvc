import { apiKeyAuth } from '@/functions/ACL'
import {
  createGeneralNotificationEmail,
  createGeneralNotificationSms,
  sendEmail,
  sendSms,
} from '@/functions/notifications'
import { Subscribe } from '@/payload-types'
import type { CollectionConfig, Field } from 'payload'

const messagedField: Field[] = [
  { name: 'text', type: 'textarea', required: true },
  { name: 'mobileText', type: 'textarea' },
  { name: 'description', type: 'textarea' },
  { name: 'link', type: 'text' },
  { name: 'date', type: 'date' },
]

export const MonthlyNotification: CollectionConfig = {
  slug: 'monthly-notification',
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
      type: 'group',
      fields: [
        {
          name: 'general',
          type: 'array',
          label: 'Obecné',
          fields: messagedField,
        },
        {
          name: 'it_services',
          type: 'array',
          label: 'IT Services',
          fields: messagedField,
        },
        {
          name: 'culture_sport',
          type: 'array',
          label: 'Culture & Sport',
          fields: messagedField,
        },
        {
          name: 'education',
          type: 'array',
          label: 'Education',
          fields: messagedField,
        },
        {
          name: 'marketing',
          type: 'array',
          label: 'Marketing',
          fields: messagedField,
        },
        {
          name: 'consulting',
          type: 'array',
          label: 'Consulting',
          fields: messagedField,
        },
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

        try {
          const response = await payload.find({ collection: 'subscribes' })

          const subscribes = response.docs

          subscribes.forEach(async (subscribe: Subscribe) => {
            try {
              if (!subscribe.email) {
                console.warn(`Skipping subscribe with ID ${subscribe.id} due to missing email`)
                return
              }

              const email = subscribe.email

              const customMessages: CustomMessage[] = []

              const activityGroups = subscribe.activityGroups?.map((group) => {
                if (typeof group !== 'string') return group
              })

              const accessResponse = await payload.create({
                collection: 'accesses',
                data: {
                  activityGroups: subscribe.activityGroups || [],
                  monthlyNotification: doc.id,
                },
              })

              console.log('accessResponse:', accessResponse)

              if (!accessResponse || !accessResponse.id) {
                console.error(`Failed to create access for subscribe ID ${subscribe.id}`)
                return
              }

              if (doc.data.general && doc.data.general.length > 0) {
                customMessages.push({
                  groupKey: 'general',
                  heading: 'Obecné novinky a povinnosti',
                  mobileHeading: 'Obecné',
                  notifications: doc.data.general,
                })
              }

              activityGroups?.map((ag) => {
                customMessages.push({
                  groupKey: ag?.slug || '',
                  heading: ag?.name || '',
                  mobileHeading: ag?.mobileName || ag?.name,
                  notifications: doc.data[ag?.slug as keyof GeneralNotificationMessages] || [],
                })
              })

              const emailBody = await createGeneralNotificationEmail(
                customMessages,
                `${doc.month} ${doc.year}`,
              )

              const res = await sendEmail(
                'OSVČ365 <info@osvc365.cz>',
                [email],
                'Měsíční přehled změn',
                emailBody,
              )

              console.log(`Email sent to ${email}:`, res)

              const smsBody = await createGeneralNotificationSms(
                customMessages,
                accessResponse.id,
                `${doc.month} ${doc.year}`,
              )

              const smsRes = await sendSms(smsBody, `${subscribe.phonePrefix}${subscribe.phone}`)

              console.log(`SMS sent to ${subscribe.phone}:`, smsRes)
            } catch (error) {
              console.error(`Error sending notification to ${subscribe.email}:`, error)
            }
          })
        } catch (error) {
          console.error('Error fetching subscribes:', error)
        }

        return doc
      },
    ],
  },
}

export type Notification = {
  text: string
  mobileText?: string
  link?: string
  date?: string
}

export type GeneralNotificationMessages = {
  general: Notification[]
  it_services: Notification[]
  consulting: Notification[]
  marketing: Notification[]
  education: Notification[]
  culture_sport: Notification[]
}

export type CustomMessage = {
  groupKey: string
  heading: string
  mobileHeading?: string
  notifications: Notification[]
}
