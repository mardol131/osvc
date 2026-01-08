import { set, subDays } from 'date-fns'
import { Field, TaskConfig } from 'payload'

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
      const activityGroups = await payload
        .find({
          collection: 'activity-groups',
          where: {
            slug: { equals: input.activityGroupKey },
          },
        })
        .then((res) => res.docs)

      const resp = await payload.create({
        collection: 'obligations',
        data: {
          text: input.text,
          mobileText: input.mobileText,
          link: input.link,
          description: input.description,
          date: input.date,
          activityGroups: input.activityGroups,
        },
      })

      const waitUntilDate = set(subDays(new Date(input.date), 1), {
        hours: 8,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      })

      const res = await payload.jobs.queue({
        workflow: 'alertNotificationWorkflow',
        waitUntil: waitUntilDate,
        input: {
          obligationId: resp.id,
        },
      })

      console.log(res)
    } catch (error) {
      console.error(`Error sending monthly notification to ${input.email}:`, error)
      throw error
    }
    return {
      output: {
        success: true,
      },
    }
  },
}
