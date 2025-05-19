import { ITypesConfig } from './types'

export const typesConfig: ITypesConfig = {
  buy: {
    id: 'buy',
    label: 'buy',
    value: 'buy',
  },
  sell: {
    id: 'sell',
    label: 'sell',
    value: 'sell',
  },
}

export const validTypes = Object.keys(typesConfig)

export const fieldsConfig = [
  {
    id: 'date',
    name: 'date',
    type: 'date',
    required: true,
  },
  {
    id: 'quantity',
    name: 'quantity',
    type: 'number',
    min: 1,
    step: '1',
    required: true,
  },
  {
    id: 'price',
    name: 'price',
    type: 'number',
    min: 1,
    step: '0.01',
    required: true,
  },
]

export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]
