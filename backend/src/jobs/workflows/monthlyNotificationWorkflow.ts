import { WorkflowConfig } from 'payload'

export const monthlyNotificationsWorkflow: WorkflowConfig<any> = {
  slug: 'monthlyNotificationsWorkflow',
  inputSchema: [
    {
      name: 'email',
      type: 'text',
      required: true,
    },
    {
      name: 'body',
      type: 'textarea',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
    },
    {
      name: 'phonePrefix',
      type: 'text',
      required: true,
    },
    {
      name: 'smsBody',
      type: 'textarea',
      required: true,
    },
  ],
  queue: 'monthlyNotificationsQueue',
  retries: 3,
  handler: async ({ job, tasks }) => {
    await tasks.sendEmail('1', {
      input: {
        email: job.input.email,
        body: job.input.body,
        subject: 'Měsíční přehled změn a povinností',
      },
    })
    await tasks.sendSms('2', {
      input: {
        phone: job.input.phone,
        phonePrefix: job.input.phonePrefix,
        smsBody: job.input.smsBody,
      },
    })

    console.log('Monthly notification successfully send')
  },
}
