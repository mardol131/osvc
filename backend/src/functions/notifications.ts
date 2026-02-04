import { CustomMessage, Notification } from '@/jobs/workflows/monthlyNotificationWorkflow'
import { format } from 'date-fns'

//&ensp;

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

export type CreateGeneralNotificationEmailParams = {
  messages: CustomMessage[]
  dateLabel: string
  accessLink: string
}

export function createGeneralNotificationEmail({
  messages,
  dateLabel,
  accessLink,
}: CreateGeneralNotificationEmailParams) {
  const notificationsCount = messages.reduce((count, group) => {
    return count + group.notifications.length
  }, 0)

  if (notificationsCount === 0) {
    return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
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
              Měsíční přehled změn
            
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
                      Na ${dateLabel} u vašeho předplatného nesledujeme žádné
                      povinnosti.
                    </p>
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
                      <!-- -->2026<!-- -->
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
  }

  const messagesBody = messages
    .map((messageGroup) => {
      const notificationsList = messageGroup.notifications
        .map((notification) => {
          if (!notification) return ''

          return ` <li>
                          <p
                            style="font-size:14px;line-height:24px;color:#333;font-family:-apple-system, BlinkMacSystemFont, &#x27;Segoe UI&#x27;, &#x27;Roboto&#x27;, &#x27;Oxygen&#x27;, &#x27;Ubuntu&#x27;, &#x27;Cantarell&#x27;, &#x27;Fira Sans&#x27;, &#x27;Droid Sans&#x27;, &#x27;Helvetica Neue&#x27;, sans-serif;margin:24px 0;margin-top:24px;margin-right:0;margin-bottom:24px;margin-left:0">
                            ${notification.text}
                            ${
                              notification.link
                                ? `&nbsp;-&nbsp;<a style="font-weight:600;color:#f59f0a" href="${notification.link}"
                              >Více informací</a
                            >`
                                : ''
                            }
                            ${
                              notification.date
                                ? `<br
                              style="color:#333;font-family:-apple-system, BlinkMacSystemFont, &#x27;Segoe UI&#x27;, &#x27;Roboto&#x27;, &#x27;Oxygen&#x27;, &#x27;Ubuntu&#x27;, &#x27;Cantarell&#x27;, &#x27;Fira Sans&#x27;, &#x27;Droid Sans&#x27;, &#x27;Helvetica Neue&#x27;, sans-serif;font-size:14px;margin:24px 0;white-space:nowrap;font-weight:700" />
                              Do &nbsp;<span
                              style="font-weight:600"
                              >${format(new Date(notification.date), 'd.M.yyyy')}</span
                            >`
                                : ''
                            }
                          </p>
                        </li>`
        })
        .join('')

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
                    <a
                      href="${accessLink}"
                      style="color:#067df7;text-decoration-line:none"
                      target="_blank"
                      ><button
                        style="background-color:#f59f0a;border:none;padding:10px 20px;color:#fff;cursor:pointer;border-radius:5px;font-weight:500;text-decoration:none;font-size:16px">
                        Detailní informace
                      </button></a
                    >
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
                      &nbsp;2025&nbsp;
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

export function createAlertNotificationEmail({
  text,
  description,
  date,
  link,
  accessLink,
  header,
}: {
  text: string
  description: string
  date: string
  link?: string
  accessLink?: string
  header: string
}) {
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
              Blížící se termín
             
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
                      ${header}
                    </h1>
                    <div>
                      <h1
                        style="color:#333;font-family:-apple-system, BlinkMacSystemFont, &#x27;Segoe UI&#x27;, &#x27;Roboto&#x27;, &#x27;Oxygen&#x27;, &#x27;Ubuntu&#x27;, &#x27;Cantarell&#x27;, &#x27;Fira Sans&#x27;, &#x27;Droid Sans&#x27;, &#x27;Helvetica Neue&#x27;, sans-serif;font-size:18px;font-weight:bold;margin:40px 0;padding:0;margin-bottom:12px">
                        ${text}
                      </h1>
                      <ul style="margin-top:12px;margin-bottom:24px">
                        <li>
                          <p
                            style="font-size:14px;line-height:24px;color:#333;font-family:-apple-system, BlinkMacSystemFont, &#x27;Segoe UI&#x27;, &#x27;Roboto&#x27;, &#x27;Oxygen&#x27;, &#x27;Ubuntu&#x27;, &#x27;Cantarell&#x27;, &#x27;Fira Sans&#x27;, &#x27;Droid Sans&#x27;, &#x27;Helvetica Neue&#x27;, sans-serif;margin:24px 0;margin-top:24px;margin-right:0;margin-bottom:24px;margin-left:0">
                            ${description}
                           ${
                             link
                               ? ` -<!-- --> <a style="font-weight:600;color:#f59f0a" href="${link}"
                              >${link}</a
                            >`
                               : ''
                           }
                            <br
                              style="color:#333;font-family:-apple-system, BlinkMacSystemFont, &#x27;Segoe UI&#x27;, &#x27;Roboto&#x27;, &#x27;Oxygen&#x27;, &#x27;Ubuntu&#x27;, &#x27;Cantarell&#x27;, &#x27;Fira Sans&#x27;, &#x27;Droid Sans&#x27;, &#x27;Helvetica Neue&#x27;, sans-serif;font-size:14px;margin:24px 0;white-space:nowrap;font-weight:700" /><span
                              style="font-weight:600"
                              >Do ${format(new Date(date), 'd.M.yyyy')}</span
                            >
                          </p>
                        </li>
                      </ul>
                    </div>
                   ${
                     accessLink
                       ? ` <a
                      href="${accessLink}"
                      style="color:#067df7;text-decoration-line:none"
                      target="_blank"
                      ><button
                        style="background-color:#f59f0a;border:none;padding:10px 20px;color:#fff;cursor:pointer;border-radius:5px;font-weight:500;text-decoration:none;font-size:14px">
                        Měsíční souhrn
                      </button></a
                    >`
                       : ''
                   }
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
                      <!-- -->2026<!-- -->
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

export function createConfirmationEmail(code: string) {
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
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
              Potvrzujeme přihlášení k odběru služeb
             
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
                      OSVČ365: Předplatné je aktivní
                    </h1>
                    <p
                      style="font-size:14px;line-height:24px;color:#333;font-family:-apple-system, BlinkMacSystemFont, &#x27;Segoe UI&#x27;, &#x27;Roboto&#x27;, &#x27;Oxygen&#x27;, &#x27;Ubuntu&#x27;, &#x27;Cantarell&#x27;, &#x27;Fira Sans&#x27;, &#x27;Droid Sans&#x27;, &#x27;Helvetica Neue&#x27;, sans-serif;margin:24px 0;margin-bottom:14px;margin-top:24px;margin-right:0;margin-left:0">
                      Od této chvíle Vám budeme pravidelně zasílat užitečné
                      informace, povinnosti a novinky týkající se živností v
                      České republice.
                    </p>
                  ${
                    code
                      ? `  <p
                      style="font-size:14px;line-height:24px;color:#333;font-family:-apple-system, BlinkMacSystemFont, &#x27;Segoe UI&#x27;, &#x27;Roboto&#x27;, &#x27;Oxygen&#x27;, &#x27;Ubuntu&#x27;, &#x27;Cantarell&#x27;, &#x27;Fira Sans&#x27;, &#x27;Droid Sans&#x27;, &#x27;Helvetica Neue&#x27;, sans-serif;margin:24px 0;margin-bottom:14px;margin-top:24px;margin-right:0;margin-left:0">
                      Níže naleznete slevový kód, který můžete darovat svým
                      známým nebo využít pro svůj další nákup.
                    </p>
                    <div>
                      <h1
                        style="color:#333;font-family:-apple-system, BlinkMacSystemFont, &#x27;Segoe UI&#x27;, &#x27;Roboto&#x27;, &#x27;Oxygen&#x27;, &#x27;Ubuntu&#x27;, &#x27;Cantarell&#x27;, &#x27;Fira Sans&#x27;, &#x27;Droid Sans&#x27;, &#x27;Helvetica Neue&#x27;, sans-serif;font-size:18px;font-weight:bold;margin:40px 0;padding:0;margin-bottom:12px">
                        Slevový kód
                      </h1>
                      <p
                        style="font-size:18px;line-height:24px;background-color:orange;color:white;border-radius:5px;border:1px solid #eee;padding:16px 4.5%;width:90.5%;font-family:-apple-system, BlinkMacSystemFont, &#x27;Segoe UI&#x27;, &#x27;Roboto&#x27;, &#x27;Oxygen&#x27;, &#x27;Ubuntu&#x27;, &#x27;Cantarell&#x27;, &#x27;Fira Sans&#x27;, &#x27;Droid Sans&#x27;, &#x27;Helvetica Neue&#x27;, sans-serif;text-align:center;font-weight:bold;margin-top:16px;margin-bottom:16px">
                        ${code}
                      </p>
                    </div>`
                      : ''
                  }
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
                      &ensp;2026&ensp;
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
}

export function removeDiacritics(text: string): string {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}
