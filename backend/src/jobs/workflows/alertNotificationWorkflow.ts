import { createAlertNotificationSms, removeDiacritics } from '@/functions/notifications'
import { renderAlertNotificationEmail } from '@/functions/render-email'
import { Obligation } from '@/payload-types'
import { getQueueName } from '@/payload.config'
import { differenceInDays } from 'date-fns'
import { WorkflowConfig } from 'payload'

export const alertNotificationWorkflow: WorkflowConfig<any> = {
  slug: 'alertNotificationWorkflow',
  inputSchema: [
    {
      name: 'obligationId',
      type: 'text',
      required: true,
    },
  ],
  queue: 'alertNotificationsQueue',
  retries: 5,
  handler: async ({ job, tasks, inlineTask }) => {
    const obligation = (await tasks.getRecord('get-obligation', {
      input: {
        id: job.input.obligationId,
        collection: 'obligations',
      },
    })) as Obligation

    if (!obligation) {
      throw new Error(`Obligation with ID ${job.input.obligationId} not found`)
    }

    if (!obligation.date) {
      console.warn(`Obligation with ID ${obligation.id} has no date, skipping notifications`)
      return
    }

    console.log(`Processing alert notifications for obligation ID ${obligation.id}`)

    const subscribes = await inlineTask('get-subscribes', {
      task: async ({ req: { payload } }) => {
        const subscribes = await payload.find({
          collection: 'subscribes',
          where: {
            activityGroups: {
              in: obligation.activityGroups.map((group) =>
                typeof group === 'string' ? group : group.id,
              ),
            },
            active: { equals: true },
          },
          showHiddenFields: true,
        })

        return { output: subscribes }
      },
    })

    if (subscribes.totalDocs === 0) {
      console.log(`No subscribes found for obligation ID ${obligation.id}`)
      return
    }

    for (const subscribe of subscribes.docs) {
      if (!subscribe.email || !subscribe.phone || !subscribe.phonePrefix) {
        console.warn(`Skipping subscribe with ID ${subscribe.id} due to missing contact info`)
        continue
      }

      const access = await inlineTask('get-latest-user-access', {
        task: async ({ req: { payload } }) => {
          const accesses = await payload.find({
            collection: 'accesses',
            where: {
              subscribe: {
                equals: subscribe.id,
              },
              monthlyNotification: {
                equals: obligation.monthlyNotificationId,
              },
            },
            limit: 1,
          })
          return {
            output: accesses.docs[0] || { success: false },
          }
        },
      })

      const dayGap = differenceInDays(new Date(obligation.date), new Date())

      let header: string = ''

      if (dayGap <= 0) {
        header = 'Dnes je poslední den pro splnění povinnosti'
      } else {
        header = `Zbývá ${dayGap} ${dayGap === 1 ? 'den' : dayGap <= 4 ? 'dny' : 'dní'} pro splnění povinnosti`
      }

      const smsBody = createAlertNotificationSms({
        mobileText: obligation.mobileText || obligation.text,
        date: obligation.date,
        accessId: access && access.accessId,
      })

      await tasks.sendEmail('send-alert-notification-email', {
        input: {
          email: subscribe.email,
          body: await renderAlertNotificationEmail({
            date: new Date(obligation.date),
            dayGap,
            heading: obligation.text,
            description: obligation.description,
            link: obligation.link || undefined,
            accessLink: access && `${process.env.WEBSITE_URL}/${access.accessId}`,
          }),
          subject: 'Připomínka nadcházející povinnosti',
        },
      })

      await tasks.sendSms('send-alert-notification-sms', {
        input: {
          phone: subscribe.phone,
          phonePrefix: subscribe.phonePrefix,
          smsBody: removeDiacritics(smsBody),
        },
      })

      console.log(`Alert notification sent to subscribe ID ${subscribe.id}`)
    }
  },
}
