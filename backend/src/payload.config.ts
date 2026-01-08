import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig, Collection, CollectionSlug, Field, TypedCollection } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { ActivityGroups } from './collections/ActivityGroups'
import { Subscribes } from './collections/Subscribes'
import { DraftSubscribes } from './collections/DraftSubscribes'
import { Alerts } from './collections/Alerts'
import { Accesses } from './collections/Access'
import { Obligations } from './collections/Obligations'
import { createAlertNotificationEmail, sendEmail, sendSms } from './functions/notifications'
import { set, subDays } from 'date-fns'
import { Obligation } from './payload-types'
import { MonthlyNotifications } from './collections/MonthlyNotification'
import { sendEmailTask } from './jobs/tasks/sendEmailTask'
import { sendSmsTask } from './jobs/tasks/sendSmsTask'
import { createObligationTask } from './jobs/tasks/createObligationTask'
import { getRecordTask } from './jobs/tasks/getRecordTask'
import { monthlyNotificationsWorkflow } from './jobs/workflows/monthlyNotificationWorkflow'
import { createObligationWorkflow } from './jobs/workflows/createObligationWorkflow'
import { alertNotificationWorkflow } from './jobs/workflows/alertNotificationWorkflow'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const getQueueName = (
  name: 'monthlyNotificationsQueue' | 'createObligationQueue' | 'alertNotificationsQueue',
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
      //   {
      //     cron: '* * * * *',
      //     queue: getQueueName('createObligationQueue'),
      //   },
      //   {
      //     cron: '* * * * *',
      //     queue: getQueueName('alertNotificationsQueue'),
      //   },
    ],
    tasks: [sendEmailTask, sendSmsTask, createObligationTask, getRecordTask],
    workflows: [monthlyNotificationsWorkflow, createObligationWorkflow, alertNotificationWorkflow],
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
