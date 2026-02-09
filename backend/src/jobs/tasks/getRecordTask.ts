import { CollectionSlug, TaskConfig } from 'payload'

export const getRecordTask: TaskConfig<any> = {
  retries: 3,
  slug: 'getRecord',
  inputSchema: [
    {
      name: 'id',
      type: 'text',
      required: true,
    },
    {
      name: 'collection',
      type: 'text',
      required: true,
    },
  ],
  handler: async ({
    input,
    req: { payload },
  }: {
    input: { id: string; collection: CollectionSlug }
    req: { payload: any }
  }) => {
    try {
      const record = await payload.findByID({
        collection: input.collection,
        id: input.id,
      })

      if (!record) {
        throw new Error(`Record with ID ${input.id} not found in collection ${input.collection}`)
      }

      return {
        output: record,
      }
    } catch (error) {
      throw error
    }
  },
}
