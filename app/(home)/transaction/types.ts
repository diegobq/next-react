import { TypeTransaction } from '@/lib/dal/transaction/types'

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
