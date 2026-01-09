import { getQueueName } from '@/payload.config'
import { WorkflowConfig } from 'payload'
import { createObligationInputSchema } from '../tasks/createObligationTask'
import { createConfirmationEmail } from '@/functions/notifications'

export const subscriptionCreatedWorkflow: WorkflowConfig<any> = {
  slug: 'subscriptionCreatedWorkflow',
  inputSchema: [
    {
      type: 'text',
      name: 'promotionCode',
      required: false,
    },
    {
      type: 'text',
      name: 'email',
      required: true,
    },
  ],
  queue: 'subscriptionCreatedQueue',
  retries: 3,
  handler: async ({ job, tasks }) => {
    const emailBody = createConfirmationEmail(job.input.promotionCode)

    await tasks.sendEmail('send-confirmation-email', {
      input: {
        email: job.input.email,
        subject: 'Subscription Confirmation',
        body: emailBody,
      },
    })

    console.log('Confirmation email sent to', job.input.email)
  },
}
