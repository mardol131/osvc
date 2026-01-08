import type { CollectionConfig } from 'payload'

export const ActivityGroups: CollectionConfig = {
  slug: 'activity-groups',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'Unikátní identifikátor skupiny činností',
      },
    },
    {
      name: 'priceId',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'Unikátní identifikátor od Stripe - Price ID',
      },
    },
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'Název skupiny obchodních činností',
      },
    },
    {
      name: 'mobileName',
      type: 'text',
      admin: {
        description: 'Název skupiny obchodních činností',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Popis skupiny činností',
      },
    },
    {
      name: 'price',
      type: 'number',
      required: true,
      admin: {
        description: 'Cena v korunách',
      },
      defaultValue: 199,
    },
    {
      name: 'items',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'item',
          type: 'textarea',
          required: true,
        },
      ],
      admin: {
        description: 'Seznam konkrétních činností v rámci této skupiny',
      },
    },
    {
      name: 'order',
      type: 'number',
    },
  ],
}
