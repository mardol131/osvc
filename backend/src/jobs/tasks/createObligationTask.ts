import { set, subDays } from 'date-fns'
import { Field, TaskConfig } from 'payload'

const daysMatrix = [
  { substractDays: 21 },
  { substractDays: 14 },
  { substractDays: 7 },
  { substractDays: 1 },
]

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
        },
      })

      const dueDate = new Date(input.date)
      const now = new Date()
      let hasAtleastOneTask = false

      for (const { substractDays } of daysMatrix) {
        const milestoneDate = set(subDays(dueDate, substractDays), {
          hours: 8,
          minutes: 0,
          seconds: 0,
          milliseconds: 0,
        })

        if (milestoneDate <= now) continue
        if (milestoneDate >= dueDate) continue

        await payload.jobs.queue({
          workflow: 'alertNotificationWorkflow',
          waitUntil: milestoneDate,
          input: {
            obligationId: resp.id,
          },
        })

        hasAtleastOneTask = true
      }

      // Fallback: if obligation is created too late,
      // schedule last alert even if it runs immediately

      if (!hasAtleastOneTask) {
        const milestoneDate = set(subDays(dueDate, 1), {
          hours: 8,
          minutes: 0,
          seconds: 0,
          milliseconds: 0,
        })

        await payload.jobs.queue({
          workflow: 'alertNotificationWorkflow',
          waitUntil: milestoneDate,
          input: {
            obligationId: resp.id,
          },
        })
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
