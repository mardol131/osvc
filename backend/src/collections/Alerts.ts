import type { CollectionConfig } from 'payload'

export const Alerts: CollectionConfig = {
  slug: 'alerts',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'date',
      type: 'date',
      label: 'Datum odeslání upozornění',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'repeating',
      type: 'checkbox',
      label: 'Opakující se upozornění',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'frequency',
      type: 'select',
      admin: {
        position: 'sidebar',
      },
      label: 'Frekvence opakování',
      options: [
        {
          label: 'Denně',
          value: 'daily',
        },
        {
          label: 'Týdně',
          value: 'weekly',
        },
        {
          label: 'Měsíčně',
          value: 'monthly',
        },
        {
          label: 'Čtvrtletně',
          value: 'quarterly',
        },
        {
          label: 'Ročně',
          value: 'yearly',
        },
      ],
    },
    {
      name: 'day',
      type: 'number',
      label: 'Den v měsíci pro opakování',
      admin: {
        position: 'sidebar',
      },
      min: 1,
      max: 31,
    },
    {
      name: 'month',
      type: 'number',
      label: 'Měsíc v roce pro opakování',
      admin: {
        position: 'sidebar',
      },
      min: 1,
      max: 12,
    },
    {
      name: 'name',
      type: 'text',
      label: 'Název upozornění',
      required: true,
    },
    {
      name: 'general',
      type: 'checkbox',
      label: 'Obecná upozornění',
    },
    {
      name: 'activityGroups',
      type: 'relationship',
      label: 'Skupiny činností',
      relationTo: 'activity-groups',
      hasMany: true,
    },
  ],
}
