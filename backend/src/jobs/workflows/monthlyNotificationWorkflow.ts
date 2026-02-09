import { generateAlphanumericId } from '@/functions/generateAlphanumericId'
import { createGeneralNotificationSms } from '@/functions/notifications'
import { ActivityGroup } from '@/payload-types'
import { WorkflowConfig } from 'payload'
import { renderMonthlyNotificationEmail } from '@osvc/react-email'

export type Notification = {
  text: string
  mobileText: string
  link?: string | null
  description: string
  date?: string | null
  activityGroups: (string | ActivityGroup)[]
}

export type CustomMessage = {
  heading: string
  mobileHeading?: string | null
  notifications: Notification[]
  order?: number | null
}

export const monthlyNotificationsWorkflow: WorkflowConfig<any> = {
  slug: 'monthlyNotificationsWorkflow',
  inputSchema: [
    {
      name: 'monthlyNotificationId',
      type: 'text',
      required: true,
    },
  ],
  queue: 'monthlyNotificationsQueue',
  retries: 3,
  handler: async ({ job, tasks, req: { payload }, inlineTask }) => {
    const subscribes = await inlineTask('get-subscribes', {
      task: async ({ req: { payload } }) => {
        const subscribes = await payload.find({
          collection: 'subscribes',
          where: {
            active: { equals: true },
          },
          showHiddenFields: true,
          depth: 1,
        })
        return { output: subscribes.docs }
      },
    })

    if (subscribes.length === 0) {
      return
    }

    const monthlyNotification = await inlineTask('get-monthly-notification', {
      task: async ({ req: { payload } }) => {
        const monthlyNotification = await payload.findByID({
          collection: 'monthly-notifications',
          id: job.input.monthlyNotificationId,
        })

        return { output: monthlyNotification }
      },
    })

    const activityGroupsMap = await inlineTask('get-activity-groups', {
      task: async ({ req: { payload } }) => {
        const activityGroups = await payload.find({
          collection: 'activity-groups',
        })

        const activityGroupsMap = new Map(activityGroups.docs.map((g) => [g.id, g]))

        return { output: activityGroupsMap }
      },
    })

    const data = monthlyNotification.notifications

    if (!data) {
      return
    }

    await Promise.all(
      data
        .filter((n) => n.date)
        .map(async (notification) => {
          try {
            await tasks.createObligation('create-obligation-task', {
              input: {
                text: notification.text,
                mobileText: notification.mobileText,
                link: notification.link,
                description: notification.description,
                date: notification.date,
                activityGroups: notification.activityGroups.map((group) => ({
                  activityGroupId: typeof group === 'string' ? group : group.id,
                })),
                monthlyNotificationId: monthlyNotification.id,
              },
            })
          } catch (error) {
            console.error(
              `Error creating obligation for notification with date ${notification.date}:`,
              error,
            )
          }
        }),
    )

    for (const subscribe of subscribes) {
      try {
        if (!subscribe.email || !subscribe.phone || !subscribe.phonePrefix) {
          console.warn(`Skipping subscribe with ID ${subscribe.id} due to missing contact info`)
          continue
        }

        const accessResponse = await inlineTask(
          `create-access-for-subscribeId-${subscribe.id}-monthlyNotification-${monthlyNotification.id}`,
          {
            task: async ({ req: { payload } }) => {
              let accessId: string | undefined = undefined

              for (let i = 0; i < 5; i++) {
                const id = generateAlphanumericId()

                const exists = await payload.find({
                  collection: 'accesses',
                  where: { accessId: { equals: id } },
                  limit: 1,
                })

                if (exists.docs.length !== 0) continue

                accessId = id
                break
              }

              if (!accessId) {
                throw new Error('Failed to generate unique access ID after 5 attempts')
              }

              const accessResponse = await payload.create({
                collection: 'accesses',
                data: {
                  activityGroups: subscribe.activityGroups || [],
                  monthlyNotification: monthlyNotification.id,
                  subscribe: subscribe.id,
                  subscribeId: subscribe.subscribeId,
                  accessId: accessId,
                },
              })

              return { output: accessResponse }
            },
          },
        )

        const customMessages: CustomMessage[] = []

        for (const ag of subscribe.activityGroups || []) {
          const activityGroup =
            typeof ag === 'string' ? activityGroupsMap.get(ag) : activityGroupsMap.get(ag.id)
          if (!activityGroup) continue

          const notifications = data.filter((notification) =>
            notification.activityGroups?.some((group) =>
              typeof group === 'string'
                ? group === activityGroup.id
                : group.id === activityGroup.id,
            ),
          )

          customMessages.push({
            heading: activityGroup.name,
            mobileHeading: activityGroup.mobileName || activityGroup.name,
            order: activityGroup.order,
            notifications,
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

        let accountEmail = ''

        if (typeof subscribe.account === 'string') {
          const account = await payload.findByID({
            collection: 'accounts',
            id: subscribe.account,
          })
          accountEmail = account.email
        } else {
          accountEmail = subscribe.account.email
        }

        const emailBody = await renderMonthlyNotificationEmail({
          accountEmail: accountEmail,
          messages: customMessages,
          dateLabel: `${monthlyNotification.month} ${monthlyNotification.year}`,
          accessLink: `${process.env.WEBSITE_URL}/${accessResponse.accessId}`,
        })

        const smsBody = createGeneralNotificationSms({
          messages: customMessages.filter((msg) => msg.notifications.length > 0),
          accessId: accessResponse.accessId,
          dateLabel: `${monthlyNotification.month} ${monthlyNotification.year}`,
        })

        if (monthlyNotification.useEmail) {
          await payload.jobs.queue({
            task: 'sendEmail',
            queue: 'send-email-queue',
            input: {
              email: subscribe.email,
              body: emailBody,
              subject: 'Měsíční přehled změn a povinností',
            },
          })
        }
        if (monthlyNotification.useSms) {
          await payload.jobs.queue({
            task: 'sendSms',
            queue: 'send-sms-queue',
            input: {
              phone: subscribe.phone,
              phonePrefix: subscribe.phonePrefix,
              smsBody: smsBody,
            },
          })
        }
      } catch (error) {
        console.error(`Error sending notification to ${subscribe.email}:`, error)
      }
    }
  },
}
