import { CustomMessage, Notification } from '@/jobs/workflows/monthlyNotificationWorkflow'
import { format } from 'date-fns'

export async function sendSms(message: string, phoneNumber: string) {
  if (!process.env.SMSMANAGER_API_KEY || !process.env.SMSMANAGER_API_URL) {
    throw new Error('SMS Manager API Key or URL is not defined')
  }
  const resp = await fetch(`${process.env.SMSMANAGER_API_URL}/message`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.SMSMANAGER_API_KEY,
    },
    body: JSON.stringify({
      body: message,
      to: [
        {
          phone_number: phoneNumber,
        },
      ],
    }),
  })

  const data = await resp.json()
  return data
}

export type createGeneralNotificationSmsParams = {
  messages: CustomMessage[]
  accessId: string
  dateLabel: string
}

export function createGeneralNotificationSms({
  messages,
  accessId,
  dateLabel,
}: createGeneralNotificationSmsParams) {
  const notificationsCount = messages.reduce((count, group) => {
    return count + group.notifications.length
  }, 0)

  if (notificationsCount === 0) {
    return removeDiacritics(
      `OSVC365: ${dateLabel}\n\nŽádné změny nebo povinnosti pro vaše předplatné.\n\nDetail: osvc365.cz/${accessId}`,
    )
  }

  const content = messages.map((messageGroup, i) => {
    const notificationsHeading = `${messageGroup.mobileHeading || messageGroup.heading}:\n`
    const notificationsText = messageGroup.notifications
      .map(
        (notification) =>
          `- ${notification.mobileText || notification.text}${notification.date ? ` do ${format(new Date(notification.date), 'd.M.yyyy')}` : ''}`,
      )
      .join('\n')
    return notificationsHeading + notificationsText
  })

  const smsBody = `OSVC365: ${dateLabel}\n\n${content.join('\n\n')}\n\nDetail: osvc365.cz/${accessId}`

  return removeDiacritics(smsBody)
}

export function createAlertNotificationSms({
  mobileText,
  date,
  accessId,
}: {
  mobileText: string
  date: string
  accessId: string
}) {
  const body = `OSVČ365\n\nNadcházející povinnost: ${mobileText}. \n\nTermín: ${format(new Date(date), 'd.M.yyyy')}\n\nDetail: osvc365.cz/${accessId}`
  return removeDiacritics(body)
}

export function removeDiacritics(text: string): string {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}
