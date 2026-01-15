import { getQueueName } from '@/payload.config'
import { WorkflowConfig } from 'payload'
import { createObligationInputSchema } from '../tasks/createObligationTask'
import { createConfirmationEmail } from '@/functions/notifications'

export const checkSubscriptionValidityWorkflow: WorkflowConfig<any> = {
  slug: 'checkSubscriptionValidityWorkflow',
  inputSchema: [
    {
      name: 'subscriptionId',
      type: 'text',
      required: true,
    },
  ],
  queue: 'checkSubscriptionValidityQueue',
  retries: 3,
  handler: async ({ job, tasks, req: { payload }, inlineTask }) => {
    const subscriptionRecord = await inlineTask('getRecordTask', {
      retries: 3,
      task: async () => {
        const record = await payload.findByID({
          collection: 'subscribes',
          id: job.input.subscriptionId,
        })
        return { output: record }
      },
    })
  },
}
