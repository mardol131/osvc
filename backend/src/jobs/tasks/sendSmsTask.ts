import { sendSms } from '@/functions/notifications'
import { Field, TaskConfig } from 'payload'

const sendSmsInputSchema: Field[] = [
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
]

export const sendSmsTask: TaskConfig<any> = {
  retries: 3,
  slug: 'sendSms',
  inputSchema: sendSmsInputSchema,
  handler: async ({ input }) => {
    try {
      const smsRes = await sendSms(input.smsBody, `${input.phonePrefix}${input.phone}`)

      console.log(smsRes)
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
