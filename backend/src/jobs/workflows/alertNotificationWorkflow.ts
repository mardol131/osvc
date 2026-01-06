import { createAlertNotificationEmail } from '@/functions/notifications'
import { Obligation } from '@/payload-types'
import { getQueueName } from '@/payload.config'
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

    console.log(`Processing alert notifications for obligation ID ${obligation.id}`)

    const subscribes = await inlineTask('get-subscribes', {
      task: async ({ req: { payload } }) => {
        const subscribes = await payload.find({
          collection: 'subscribes',
          where: {
            activityGroups: {
              in: obligation.activityGroups
                .filter((group) => typeof group !== 'string')
                .map((group) => group.id),
            },
            active: { equals: true },
          },
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

      const emailBody = createAlertNotificationEmail({
        text: obligation.text,
        description: obligation.description,
        date: obligation.date || undefined,
        link: obligation.link || undefined,
      })

      const smsBody = `Připomínáme Vám nadcházející povinnost: ${obligation.text}. Termín: ${obligation.date}. Více info na OSVC365.cz.`

      await tasks.sendEmail('send-alert-notification-email', {
        input: {
          email: subscribe.email,
          body: emailBody,
          subject: 'Připomínka nadcházející povinnosti',
        },
      })

      await tasks.sendSms('send-alert-notification-sms', {
        input: {
          phone: subscribe.phone,
          phonePrefix: subscribe.phonePrefix,
          smsBody: smsBody,
        },
      })

      console.log(`Alert notification sent to subscribe ID ${subscribe.id}`)
    }
  },
}
