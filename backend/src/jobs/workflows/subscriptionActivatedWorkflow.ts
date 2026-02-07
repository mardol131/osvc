import { WorkflowConfig } from 'payload'
import { renderConfirmationEmail } from '@osvc/react-email'

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
    {
      type: 'text',
      name: 'accountEmail',
      required: true,
    },
  ],
  queue: 'subscriptionActivatedQueue',
  retries: 3,
  handler: async ({ job, tasks }) => {
    const emailBody = await renderConfirmationEmail({
      code: job.input.promotionCode,
      accountEmail: job.input.accountEmail,
    })

    await tasks.sendEmail('send-activation-email', {
      input: {
        email: job.input.email,
        subject: 'Potvrzení aktivace předplatného',
        body: emailBody,
      },
    })
  },
}
