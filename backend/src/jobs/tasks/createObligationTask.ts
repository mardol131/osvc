import { set, subDays } from 'date-fns'
import { Field, TaskConfig } from 'payload'

const daysMatrix = [{ substractDays: 7 }, { substractDays: 2 }, { substractDays: 0 }]

export const createObligationInputSchema: Field[] = [
  {
    name: 'text',
    type: 'text',
    required: true,
  },
  {
    name: 'mobileText',
    type: 'text',
  },
  {
    name: 'link',
    type: 'text',
  },
  {
    name: 'description',
    type: 'textarea',
  },
  {
    name: 'date',
    type: 'text',
  },
  {
    name: 'activityGroups',
    type: 'array',
    required: true,
    fields: [
      {
        name: 'activityGroupId',
        type: 'text',
        required: true,
      },
    ],
  },
  {
    name: 'monthlyNotificationId',
    type: 'text',
    required: true,
  },
]

export const createObligationTask: TaskConfig<any> = {
  retries: 3,
  slug: 'createObligation',
  inputSchema: createObligationInputSchema,
  handler: async ({ input, req: { payload } }) => {
    try {
      const resp = await payload.create({
        collection: 'obligations',
        data: {
          text: input.text,
          mobileText: input.mobileText,
          link: input.link,
          description: input.description,
          date: input.date,
          activityGroups: input.activityGroups.map(
            (ag: { activityGroupId: string }) => ag.activityGroupId,
          ),
          monthlyNotificationId: input.monthlyNotificationId,
        },
      })

      const dueDate = new Date(input.date)
      const now = new Date()

      const dueDateOnly = set(dueDate, { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 })
      const nowDateOnly = set(now, { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 })

      if (dueDateOnly <= nowDateOnly) {
        console.log(
          `For obligation with ID ${resp.id} is due date ${dueDate.toISOString()} is today or in the past, scheduling alert notification workflow immediately.`,
        )
        await payload.jobs.queue({
          workflow: 'alertNotificationWorkflow',
          waitUntil: now,
          input: {
            obligationId: resp.id,
          },
        })
      } else {
        for (const { substractDays } of daysMatrix) {
          const milestoneDate = set(subDays(dueDate, substractDays), {
            hours: 8,
            minutes: 0,
            seconds: 0,
            milliseconds: 0,
          })

          if (milestoneDate <= now || milestoneDate > dueDate) {
            console.log(
              `Skipping scheduling alert notification workflow for obligation ID ${resp.id} at ${milestoneDate.toISOString()} as the date is in the past or after due date.`,
            )
            continue
          }

          await payload.jobs.queue({
            workflow: 'alertNotificationWorkflow',
            waitUntil: milestoneDate,
            input: {
              obligationId: resp.id,
            },
          })

          console.log(
            `Scheduled alert notification workflow for obligation ID ${resp.id} at ${milestoneDate.toISOString()}`,
          )
        }
      }
    } catch (error) {
      console.error('Error creating obligation or scheduling workflows:', error)
      throw error
    }
    return {
      output: {
        success: true,
      },
    }
  },
}
