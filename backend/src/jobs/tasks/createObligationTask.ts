import { set, subDays } from 'date-fns'
import { Field, TaskConfig } from 'payload'

const daysMatrix = [{ substractDays: 5 }, { substractDays: 0 }]

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

      // Připravit všechny milestones a zjistit, které jsou v budoucnosti
      const milestones = daysMatrix.map(({ substractDays }) => {
        const milestoneDate = set(subDays(dueDate, substractDays), {
          hours: 8,
          minutes: 0,
          seconds: 0,
          milliseconds: 0,
        })
        return {
          date: milestoneDate,
          substractDays,
          isFuture: milestoneDate > now,
        }
      })

      const futureMilestones = milestones.filter((m) => m.isFuture)

      // Pokud nejsou žádné budoucí milestones, vytvořit okamžitou notifikaci
      if (futureMilestones.length === 0) {
        await payload.jobs.queue({
          workflow: 'alertNotificationWorkflow',
          waitUntil: now,
          input: {
            obligationId: resp.id,
          },
        })
      } else {
        // Vytvořit notifikace jen pro budoucí milestones
        for (const milestone of futureMilestones) {
          await payload.jobs.queue({
            workflow: 'alertNotificationWorkflow',
            waitUntil: milestone.date,
            input: {
              obligationId: resp.id,
            },
          })
        }
      }
    } catch (error) {
      throw error
    }
    return {
      output: {
        success: true,
      },
    }
  },
}
