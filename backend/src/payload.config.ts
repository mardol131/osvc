import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { Accesses } from './collections/Access'
import { ActivityGroups } from './collections/ActivityGroups'
import { Alerts } from './collections/Alerts'
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
import { createObligationWorkflow } from './jobs/workflows/createObligationWorkflow'
import { monthlyNotificationsWorkflow } from './jobs/workflows/monthlyNotificationWorkflow'
import { subscriptionCreatedWorkflow } from './jobs/workflows/subscriptionCreatedWorkflow'
import { checkSubscriptionValidityWorkflow } from './jobs/workflows/checkSubscriptionValidityWorkflow'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const getQueueName = (
  name:
    | 'monthlyNotificationsQueue'
    | 'createObligationQueue'
    | 'alertNotificationsQueue'
    | 'subscriptionCreatedQueue'
    | 'checkSubscriptionValidityQueue',
) => {
  return name
}

export default buildConfig({
  jobs: {
    shouldAutoRun: () => true,
    autoRun: [
      {
        cron: '* * * * *',
        queue: getQueueName('monthlyNotificationsQueue'),
      },
      {
        cron: '* * * * *',
        queue: getQueueName('createObligationQueue'),
      },
      {
        cron: '* * * * *',
        queue: getQueueName('alertNotificationsQueue'),
      },
      {
        cron: '* * * * *',
        queue: getQueueName('subscriptionCreatedQueue'),
      },
    ],
    tasks: [sendEmailTask, sendSmsTask, createObligationTask, getRecordTask],
    workflows: [
      monthlyNotificationsWorkflow,
      createObligationWorkflow,
      alertNotificationWorkflow,
      subscriptionCreatedWorkflow,
      checkSubscriptionValidityWorkflow,
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
    Alerts,
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
