import { adminOrApiKeyAuth } from '@/functions/ACL'
import { createGeneralNotificationSms, sendSms } from '@/functions/notifications'
import { renderMonthlyNotificationEmail, sendEmail } from '@osvc/react-email'
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
        {
          name: 'useEmail',
          type: 'checkbox',
          label: 'Odeslat notifikaci e-mailem',
          defaultValue: true,
        },
        {
          name: 'useSms',
          type: 'checkbox',
          label: 'Odeslat notifikaci SMS zprávou',
          defaultValue: true,
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Testovací email (spouští se při uložení draftu)',
      admin: {
        position: 'sidebar',
        initCollapsed: false,
      },
      fields: [
        {
          name: 'emailForTest',
          type: 'email',
          label: 'E-mailová adresa pro odeslání testovacího e-mailu',
        },
        {
          name: 'phoneForTest',
          type: 'text',
          label: 'Telefonní číslo pro odeslání testovací SMS zprávy',
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
    beforeChange: [
      async ({ data }) => {
        if (data._status === 'draft') {
          type Notification = {
            text: string
            mobileText: string
            link?: string | null
            description: string
            date?: string | null
            activityGroups: string[]
          }

          type CustomMessage = {
            heading: string
            mobileHeading?: string | null
            notifications: Notification[]
            order?: number | null
          }
          const customMessages: CustomMessage[] = []

          // Group notifications by activity groups
          if (data.notifications && Array.isArray(data.notifications)) {
            const groupedByActivityGroup = new Map<string, Notification[]>()
            const activityGroupNames = new Map<string, string>()

            // Group notifications by each activity group
            data.notifications.forEach((notification: any) => {
              if (notification.activityGroups && Array.isArray(notification.activityGroups)) {
                notification.activityGroups.forEach((activityGroup: any) => {
                  const groupId =
                    typeof activityGroup === 'string' ? activityGroup : activityGroup.id
                  const groupName =
                    typeof activityGroup === 'string'
                      ? activityGroup
                      : activityGroup.name || activityGroup.title || activityGroup.id

                  if (!groupedByActivityGroup.has(groupId)) {
                    groupedByActivityGroup.set(groupId, [])
                  }
                  activityGroupNames.set(groupId, groupName)
                  groupedByActivityGroup.get(groupId)!.push(notification)
                })
              }
            })

            // Convert grouped notifications to custom messages
            groupedByActivityGroup.forEach((notifications, groupId) => {
              customMessages.push({
                heading: activityGroupNames.get(groupId) || groupId,
                notifications: notifications,
              })
            })
          }

          customMessages.sort((a, b) => {
            const orderA = a.order || 0
            const orderB = b.order || 0

            // Položky s order: 1 jsou vždy první
            if (orderA === 1 && orderB !== 1) return -1
            if (orderB === 1 && orderA !== 1) return 1
            return (b.notifications.length || 0) - (a.notifications.length || 0)
          })

          if (data.emailForTest) {
            try {
              const emailBody = await renderMonthlyNotificationEmail({
                messages: customMessages,
                dateLabel: `${data.month} ${data.year}`,
                accessLink: `${process.env.WEBSITE_URL}/testovací-access-link`,
              })

              const res = await sendEmail(
                'OSVČ365 <info@osvc365.cz>',
                [data.emailForTest],
                'testovací email - monthly draft',
                emailBody,
              )

              console.log('Testovací email odeslán, response:', res)
            } catch {
              console.error('Chyba při odesílání testovacího emailu na adresu:', data.emailForTest)
            }
          }

          if (data.phoneForTest) {
            const smsBody = createGeneralNotificationSms({
              messages: customMessages.filter((msg) => msg.notifications.length > 0),
              accessId: 'testovací-access-id',
              dateLabel: `${data.month} ${data.year}`,
            })

            try {
              const smsRes = await sendSms(smsBody, `${data.phoneForTest}`)

              console.log(smsRes)
            } catch (error) {
              console.error(`Error sending monthly notification to ${data.phoneForTest}:`, error)
              throw error
            }
          }

          data.emailForTest = undefined
          data.phoneForTest = undefined
        }
        return data
      },
    ],
  },
}
