import { apiKeyAuth } from '@/functions/ACL'
import {
  createGeneralNotificationEmail,
  createGeneralNotificationSms,
} from '@/functions/notifications'
import { Subscribe } from '@/payload-types'
import type { CollectionConfig, Field } from 'payload'

export const notificationFields: Field[] = [
  { name: 'text', type: 'textarea', required: true },
  { name: 'mobileText', type: 'textarea', required: true },
  { name: 'description', type: 'textarea', required: true },
  { name: 'link', type: 'text' },
  { name: 'date', type: 'date' },
]

const ALPHABET = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
const ID_LENGTH = 18

function generateAlphanumericId(length = ID_LENGTH) {
  const array = new Uint8Array(length)
  crypto.getRandomValues(array)
  return Array.from(array)
    .map((b) => ALPHABET[b % ALPHABET.length])
    .join('')
}

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
      type: 'group',
      fields: [
        {
          name: 'general',
          type: 'array',
          label: 'Obecné',
          fields: notificationFields,
        },
        {
          name: 'it_services',
          type: 'array',
          label: 'IT Services',
          fields: notificationFields,
        },
        {
          name: 'culture_sport',
          type: 'array',
          label: 'Culture & Sport',
          fields: notificationFields,
        },
        {
          name: 'education',
          type: 'array',
          label: 'Education',
          fields: notificationFields,
        },
        {
          name: 'marketing',
          type: 'array',
          label: 'Marketing',
          fields: notificationFields,
        },
        {
          name: 'consulting',
          type: 'array',
          label: 'Consulting',
          fields: notificationFields,
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
          const response = await payload.find({
            collection: 'subscribes',
            where: { active: { equals: true } },
          })

          const subscribes = response.docs

          const data: GeneralNotificationMessages = doc.data

          const notificationGroups = Object.entries(data).map(([key, notifications]) => {
            return { key, notifications }
          })

          notificationGroups.forEach(async ({ key, notifications }) => {
            if (notifications.length === 0) return

            notifications.forEach(async (notification) => {
              if (!notification.date) return

              try {
                await payload.jobs.queue({
                  workflow: 'createObligationWorkflow',
                  input: {
                    text: notification.text,
                    mobileText: notification.mobileText,
                    link: notification.link,
                    description: notification.description,
                    date: notification.date,
                    activityGroupKey: key,
                  },
                })
              } catch (err) {
                console.error('Error creating obligation for notification:', notification, err)
                return
              }
            })

            return
          })

          subscribes.forEach(async (subscribe: Subscribe) => {
            try {
              if (!subscribe.email || !subscribe.phone || !subscribe.phonePrefix) {
                console.warn(
                  `Skipping subscribe with ID ${subscribe.id} due to missing contact info`,
                )
                return
              }

              const customMessages: CustomMessage[] = []

              const activityGroups = subscribe.activityGroups?.map((group) => {
                if (typeof group !== 'string') return group
              })

              let accessId: string | undefined = undefined

              for (let i = 0; i < 5; i++) {
                const id = generateAlphanumericId()

                const exists = await payload.find({
                  collection: 'accesses',
                  where: { accessId: { equals: id } },
                  limit: 1,
                })

                console.log('Access ID check:', id, exists.docs)

                if (exists.docs.length !== 0) continue

                accessId = id
                break
              }

              if (!accessId) {
                console.error(`Failed to generate unique accessId for subscribe ID ${subscribe.id}`)
                return
              }

              const accessResponse = await payload.create({
                collection: 'accesses',
                data: {
                  activityGroups: subscribe.activityGroups || [],
                  monthlyNotifications: doc.id,
                  subscribe: subscribe.id,
                  accessId: accessId,
                },
              })

              if (!accessResponse || !accessResponse.id) {
                console.error(`Failed to create access for subscribe ID ${subscribe.id}`)
                return
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
                `${process.env.WEBSITE_URL}/${accessResponse.accessId}`,
              )

              const smsBody = await createGeneralNotificationSms(
                customMessages,
                accessResponse.accessId,
                `${doc.month} ${doc.year}`,
              )

              await payload.jobs.queue({
                workflow: 'monthlyNotificationsWorkflow',
                input: {
                  email: subscribe.email,
                  body: emailBody,
                  phone: subscribe.phone,
                  phonePrefix: subscribe.phonePrefix,
                  smsBody: smsBody,
                },
              })
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
  mobileText: string
  link?: string
  description: string
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
