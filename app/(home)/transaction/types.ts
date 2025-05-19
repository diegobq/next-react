import { TypeTransaction } from '@/lib/dal/transaction/types'

export interface TransactionProps {
  id?: string
  type: TypeTransaction
  period: number
  month: number
  date: string
  quantity: number
  price: number
}

export interface OptionProps {
  id: string
  value: number
  label: string
}

export interface ITypesConfig {
  [key: string]: {
    id: string
    label: string
    value: TypeTransaction
  }
}
