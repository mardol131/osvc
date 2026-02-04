import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { Accesses } from './collections/Accesses'
import { ActivityGroups } from './collections/ActivityGroups'
import { Media } from './collections/Media'
import { MonthlyNotifications } from './collections/MonthlyNotification'
import { Obligations } from './collections/Obligations'
import { Subscribes } from './collections/Subscribes'
import { Users } from './collections/Users'
import { createObligationTask } from './jobs/tasks/createObligationTask'
import { getRecordTask } from './jobs/tasks/getRecordTask'
import { sendEmailTask } from './jobs/tasks/sendEmailTask'
import { sendSmsTask } from './jobs/tasks/sendSmsTask'
import { alertNotificationWorkflow } from './jobs/workflows/alertNotificationWorkflow'
import { monthlyNotificationsWorkflow } from './jobs/workflows/monthlyNotificationWorkflow'
import { subscriptionActivatedWorkflow } from './jobs/workflows/subscriptionActivatedWorkflow'
import { addMarketingContactWorkflow } from './jobs/workflows/addMarketingContactWorkflow'
import { Accounts } from './collections/Accounts'
import { Passwords } from './collections/Passwords'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const getQueueName = (
  name:
    | 'monthlyNotificationsQueue'
    | 'alertNotificationsQueue'
    | 'subscriptionActivatedQueue'
    | 'addMarketingContactQueue',
) => {
  return name
}

export default buildConfig({
  jobs: {
    shouldAutoRun: () => true,
    autoRun: [
      {
        cron: process.env.CRON_MONTHLY_NOTIFICATION_QUEUE || '0 16 * * *',
        queue: getQueueName('monthlyNotificationsQueue'),
      },
      {
        cron: process.env.CRON_ALERT_NOTIFICATIONS_QUEUE || '30 16 * * *',
        queue: getQueueName('alertNotificationsQueue'),
      },
      {
        cron: process.env.CRON_SUBSCRIPTION_ACTIVATED_QUEUE || '* * * * *',
        queue: getQueueName('subscriptionActivatedQueue'),
      },
      {
        cron: process.env.CRON_ADD_MARKETING_CONTACT_QUEUE || '0 15 * * *',
        queue: getQueueName('addMarketingContactQueue'),
      },
    ],
    tasks: [sendEmailTask, sendSmsTask, createObligationTask, getRecordTask],
    workflows: [
      monthlyNotificationsWorkflow,
      alertNotificationWorkflow,
      subscriptionActivatedWorkflow,
      addMarketingContactWorkflow,
    ],
  },
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
    ActivityGroups,
    Subscribes,
    MonthlyNotifications,
    Accesses,
    Obligations,
    Accounts,
    Passwords,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URL || '',
  }),
  plugins: [],
  cors: ['http://localhost:3000', process.env.NEXT_PUBLIC_WEBSITE_URL || 'https://osvc365.cz'],
})
