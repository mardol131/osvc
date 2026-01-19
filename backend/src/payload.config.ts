import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { Accesses } from './collections/Access'
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
import { subscriptionCreatedWorkflow } from './jobs/workflows/subscriptionCreatedWorkflow'
import { addMarketingContactWorkflow } from './jobs/workflows/addMarketingContactWorkflow'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const getQueueName = (
  name:
    | 'monthlyNotificationsQueue'
    | 'alertNotificationsQueue'
    | 'subscriptionCreatedQueue'
    | 'addMarketingContactQueue',
) => {
  return name
}

export default buildConfig({
  jobs: {
    shouldAutoRun: () => true,
    autoRun: [
      {
        cron: '0 16 * * *',
        queue: getQueueName('monthlyNotificationsQueue'),
      },
      {
        cron: '30 16 * * *',
        queue: getQueueName('alertNotificationsQueue'),
      },
      {
        cron: '* * * * *',
        queue: getQueueName('subscriptionCreatedQueue'),
      },
      {
        cron: '0 15 * * *',
        queue: getQueueName('addMarketingContactQueue'),
      },
    ],
    tasks: [sendEmailTask, sendSmsTask, createObligationTask, getRecordTask],
    workflows: [
      monthlyNotificationsWorkflow,
      alertNotificationWorkflow,
      subscriptionCreatedWorkflow,
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
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URL || '',
  }),
  sharp,
  plugins: [],
  cors: ['http://localhost:3000', process.env.NEXT_PUBLIC_WEBSITE_URL || ''],
})
