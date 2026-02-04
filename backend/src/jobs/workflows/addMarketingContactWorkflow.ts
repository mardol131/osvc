import { WorkflowConfig } from 'payload'

export const addMarketingContactWorkflow: WorkflowConfig<any> = {
  slug: 'addMarketingContactWorkflow',
  inputSchema: [
    {
      name: 'subscriptionId',
      type: 'text',
      required: true,
    },
  ],
  queue: 'addMarketingContactQueue',
  retries: 3,
  handler: async ({ job, tasks, req: { payload }, inlineTask }) => {
    await inlineTask('addMarketingContactTask', {
      retries: 3,
      task: async () => {
        const record = await payload.findByID({
          collection: 'subscribes',
          id: job.input.subscriptionId,
        })

        if (record.marketing) {
          const response = await fetch(`${process.env.BREVO_API_URL}/contacts`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'api-key': process.env.BREVO_API_KEY || '',
            },
            body: JSON.stringify({
              email: record.email,
              listIds: [3],
              updateEnabled: true,
              attributes: {
                PHONE: record.phone,
                PHONE_PREFIX: record.phonePrefix,
                SUBSCRIPTION_ID: record.id,
              },
            }),
          })

          if (!response.ok) {
            console.error('Failed to add marketing contact:', await response.text())
            throw new Error(`Failed to add marketing contact: ${response.statusText}`)
          }
        }

        return { output: record }
      },
    })
  },
}
