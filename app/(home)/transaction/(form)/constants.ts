import { TypeTransaction } from '@/lib/dal/transaction/types'

import { TxTypes } from '../constants'

export interface ITypesConfig {
  [key: string]: {
    id: string
    label: string
    value: TypeTransaction
  }
}

export const typesConfig: ITypesConfig = {
  buy: {
    id: TxTypes.BUY,
    label: TxTypes.BUY,
    value: TxTypes.BUY,
  },
  sell: {
    id: TxTypes.SELL,
    label: TxTypes.SELL,
    value: TxTypes.SELL,
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
