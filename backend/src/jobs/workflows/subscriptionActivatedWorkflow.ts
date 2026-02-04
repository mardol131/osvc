import { createConfirmationEmail } from '@/functions/notifications'
import { WorkflowConfig } from 'payload'

export const subscriptionActivatedWorkflow: WorkflowConfig<any> = {
  slug: 'subscriptionActivatedWorkflow',
  inputSchema: [
    {
      type: 'text',
      name: 'promotionCode',
    },
    {
      type: 'text',
      name: 'email',
      required: true,
    },
  ],
  queue: 'subscriptionActivatedQueue',
  retries: 3,
  handler: async ({ job, tasks }) => {
    const emailBody = createConfirmationEmail(job.input.promotionCode)

    await tasks.sendEmail('send-confirmation-email', {
      input: {
        email: job.input.email,
        subject: 'Potvrzení aktivace předplatného',
        body: emailBody,
      },
    })

    console.log('Confirmation email sent to', job.input.email)
  },
}
