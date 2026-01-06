import { getQueueName } from '@/payload.config'
import { WorkflowConfig } from 'payload'
import { createObligationInputSchema } from '../tasks/createObligationTask'

export const createObligationWorkflow: WorkflowConfig<any> = {
  slug: 'createObligationWorkflow',
  inputSchema: createObligationInputSchema,
  queue: 'createObligationQueue',
  retries: 3,
  handler: async ({ job, tasks }) => {
    await tasks.createObligation('1', {
      input: {
        text: job.input.text,
        mobileText: job.input.mobileText,
        link: job.input.link,
        description: job.input.description,
        date: job.input.date,
        activityGroupKey: job.input.activityGroupKey,
      },
    })

    console.log('Obligation successfully created')
  },
}
