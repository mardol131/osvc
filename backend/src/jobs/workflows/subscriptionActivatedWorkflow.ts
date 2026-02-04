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
  ],
  queue: 'subscriptionActivatedQueue',
  retries: 3,
  handler: async ({ job, tasks }) => {
    const emailBody = await renderConfirmationEmail({ code: job.input.promotionCode })

    await tasks.sendEmail('send-activation-email', {
      input: {
        email: job.input.email,
        subject: 'Potvrzení aktivace předplatného',
        body: emailBody,
      },
    })

    console.log('Activation email sent to', job.input.email)
    console.log('With promotion code:', job.input.promotionCode)
  },
}
