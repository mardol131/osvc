import { CustomMessage } from '@/collections/MonthlyNotification'
import { format } from 'date-fns'

export async function sendEmail(sender: string, to: string[], subject: string, html_body: string) {
  if (!process.env.EMAIL_API_URL || !process.env.SMTP2GO_API_KEY) {
    throw new Error('Email API URL or SMTP2GO API Key is not defined')
  }

  const response = await fetch(`${process.env.EMAIL_API_URL}/email/send`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Smtp2go-Api-Key': process.env.SMTP2GO_API_KEY,
      accept: 'application/json',
    },
    body: JSON.stringify({
      sender,
      to,
      subject,
      html_body,
    }),
  })

  if (!response.ok) {
    throw new Error(`Failed to send email: ${response.statusText}`)
  }
  return response.json()
}

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

export async function createGeneralNotificationEmail(messages: CustomMessage[], dateLabel: string) {
  const messagesBody = messages
    .map((messageGroup) => {
      const notificationsList = messageGroup.notifications
        .map((notification) => {
          return ` <li>
                          <p
                            style="font-size:14px;line-height:24px;color:#333;font-family:-apple-system, BlinkMacSystemFont, &#x27;Segoe UI&#x27;, &#x27;Roboto&#x27;, &#x27;Oxygen&#x27;, &#x27;Ubuntu&#x27;, &#x27;Cantarell&#x27;, &#x27;Fira Sans&#x27;, &#x27;Droid Sans&#x27;, &#x27;Helvetica Neue&#x27;, sans-serif;margin:24px 0;margin-top:24px;margin-right:0;margin-bottom:24px;margin-left:0">
                            ${notification.text}
                            ${
                              notification.link
                                ? `<!-- -->-<!-- --><a style="font-weight:600;color:#f59f0a" href="${notification.link}"
                              >Odkaz</a
                            >`
                                : ''
                            }
                            ${
                              notification.date
                                ? `<br
                              style="color:#333;font-family:-apple-system, BlinkMacSystemFont, &#x27;Segoe UI&#x27;, &#x27;Roboto&#x27;, &#x27;Oxygen&#x27;, &#x27;Ubuntu&#x27;, &#x27;Cantarell&#x27;, &#x27;Fira Sans&#x27;, &#x27;Droid Sans&#x27;, &#x27;Helvetica Neue&#x27;, sans-serif;font-size:14px;margin:24px 0;white-space:nowrap;font-weight:700" />
                              Do <!-- --><span
                              style="font-weight:600"
                              >${format(new Date(notification.date), 'd.M.yyyy')}</span
                            >`
                                : ''
                            }
                          </p>
                        </li>`
        })
        .join('')

      console.log('notificationsList:', notificationsList)

      return `<h2 style="color:#333;font-family:-apple-system, BlinkMacSystemFont, &#x27;Segoe UI&#x27;, &#x27;Roboto&#x27;, &#x27;Oxygen&#x27;, &#x27;Ubuntu&#x27;, &#x27;Cantarell&#x27;, &#x27;Fira Sans&#x27;, &#x27;Droid Sans&#x27;, &#x27;Helvetica Neue&#x27;, sans-serif;font-size:18px;font-weight:bold;margin:40px 0;padding:0;margin-bottom:12px">
                        ${messageGroup.heading}
            </h2>
            <ul style="margin-top:12px;margin-bottom:24px">
                ${
                  notificationsList.length > 0
                    ? notificationsList
                    : `  <p
                            style="font-size:14px;line-height:24px;color:#333;font-family:-apple-system, BlinkMacSystemFont, &#x27;Segoe UI&#x27;, &#x27;Roboto&#x27;, &#x27;Oxygen&#x27;, &#x27;Ubuntu&#x27;, &#x27;Cantarell&#x27;, &#x27;Fira Sans&#x27;, &#x27;Droid Sans&#x27;, &#x27;Helvetica Neue&#x27;, sans-serif;margin:24px 0;margin-top:24px;margin-right:0;margin-bottom:24px;margin-left:0">
                            V této kategorii není žádné upozornění.
                          </p>`
                }
            </ul>`
    })
    .join('')

  const emailBody = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" lang="en">
  <head>
    <link
      rel="preload"
      as="image"
      href="https://www.osvc365.cz/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo-osvc.9507aaa6.png&amp;w=128&amp;q=75" />
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
    <meta name="x-apple-disable-message-reformatting" />
  </head>
  <body style="background-color:#ffffff">
    <!--$--><!--html--><!--head--><!--body-->
    <table
      border="0"
      width="100%"
      cellpadding="0"
      cellspacing="0"
      role="presentation"
      align="center">
      <tbody>
        <tr>
          <td style="background-color:#ffffff">
            <div
              style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0"
              data-skip-in-text="true">
              Přehled změn a povinnosti na ${dateLabel}
            </div>
            <table
              align="center"
              width="100%"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              style="max-width:37.5em;padding-left:12px;padding-right:12px;margin:0 auto">
              <tbody>
                <tr style="width:100%">
                  <td>
                    <h1
                      style="color:#333;font-family:-apple-system, BlinkMacSystemFont, &#x27;Segoe UI&#x27;, &#x27;Roboto&#x27;, &#x27;Oxygen&#x27;, &#x27;Ubuntu&#x27;, &#x27;Cantarell&#x27;, &#x27;Fira Sans&#x27;, &#x27;Droid Sans&#x27;, &#x27;Helvetica Neue&#x27;, sans-serif;font-size:24px;font-weight:bold;margin:40px 0;padding:0">
                      OSVČ365: Přehled změn a povinností na ${dateLabel}
                    </h1>
                    <p
                      style="font-size:14px;line-height:24px;color:#333;font-family:-apple-system, BlinkMacSystemFont, &#x27;Segoe UI&#x27;, &#x27;Roboto&#x27;, &#x27;Oxygen&#x27;, &#x27;Ubuntu&#x27;, &#x27;Cantarell&#x27;, &#x27;Fira Sans&#x27;, &#x27;Droid Sans&#x27;, &#x27;Helvetica Neue&#x27;, sans-serif;margin:24px 0;margin-bottom:14px;margin-top:24px;margin-right:0;margin-left:0">
                      Níže Vám posíláme přehled změn a povinností na ${dateLabel}.
                    </p>
                    ${messagesBody}
                    <p
                      style="font-size:14px;line-height:24px;color:#333;font-family:-apple-system, BlinkMacSystemFont, &#x27;Segoe UI&#x27;, &#x27;Roboto&#x27;, &#x27;Oxygen&#x27;, &#x27;Ubuntu&#x27;, &#x27;Cantarell&#x27;, &#x27;Fira Sans&#x27;, &#x27;Droid Sans&#x27;, &#x27;Helvetica Neue&#x27;, sans-serif;margin:24px 0;margin-top:24px;margin-right:0;margin-bottom:24px;margin-left:0">
                      S pozdravem,<br />Tým OSVČ365
                    </p>
                    <img
                      alt="OSVČ365 Logo"
                      height="32"
                      src="https://www.osvc365.cz/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo-osvc.9507aaa6.png&amp;w=128&amp;q=75"
                      style="display:block;outline:none;border:none;text-decoration:none"
                      width="32" />
                    <p
                      style="font-size:12px;line-height:22px;color:#898989;font-family:-apple-system, BlinkMacSystemFont, &#x27;Segoe UI&#x27;, &#x27;Roboto&#x27;, &#x27;Oxygen&#x27;, &#x27;Ubuntu&#x27;, &#x27;Cantarell&#x27;, &#x27;Fira Sans&#x27;, &#x27;Droid Sans&#x27;, &#x27;Helvetica Neue&#x27;, sans-serif;margin-top:12px;margin-bottom:24px">
                      <a
                        href="https://osvc365.cz"
                        style="color:#898989;text-decoration-line:none;font-family:-apple-system, BlinkMacSystemFont, &#x27;Segoe UI&#x27;, &#x27;Roboto&#x27;, &#x27;Oxygen&#x27;, &#x27;Ubuntu&#x27;, &#x27;Cantarell&#x27;, &#x27;Fira Sans&#x27;, &#x27;Droid Sans&#x27;, &#x27;Helvetica Neue&#x27;, sans-serif;font-size:14px;text-decoration:underline"
                        target="_blank"
                        >OSVČ365</a
                      >
                    </p>
                    <p
                      style="font-size:12px;line-height:22px;color:#898989;font-family:-apple-system, BlinkMacSystemFont, &#x27;Segoe UI&#x27;, &#x27;Roboto&#x27;, &#x27;Oxygen&#x27;, &#x27;Ubuntu&#x27;, &#x27;Cantarell&#x27;, &#x27;Fira Sans&#x27;, &#x27;Droid Sans&#x27;, &#x27;Helvetica Neue&#x27;, sans-serif;margin-top:0;margin-bottom:24px">
                      ©
                      <!-- -->2025<!-- -->
                      OSVČ365. Všechna práva vyhrazena.
                    </p>
                    <p
                      style="font-size:12px;line-height:22px;color:#898989;font-family:-apple-system, BlinkMacSystemFont, &#x27;Segoe UI&#x27;, &#x27;Roboto&#x27;, &#x27;Oxygen&#x27;, &#x27;Ubuntu&#x27;, &#x27;Cantarell&#x27;, &#x27;Fira Sans&#x27;, &#x27;Droid Sans&#x27;, &#x27;Helvetica Neue&#x27;, sans-serif;margin-top:0;margin-bottom:24px">
                      Údaje v tomto emailu nelze považovat za právní či daňové
                      poradenství. Pro konkrétní situace doporučujeme konzultaci
                      s odborníkem.
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
    <!--/$-->
  </body>
</html>
`

  return emailBody
}

export async function createGeneralNotificationSms(
  messages: CustomMessage[],
  accessId: string,
  dateLabel: string,
) {
  const notificationsCount = messages.reduce((count, group) => {
    return count + group.notifications.length
  }, 0)

  if (notificationsCount === 0) {
    return `OSVC365: V tomto měsíci nejsou žádné nové informace.`
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

export function removeDiacritics(text: string): string {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}
