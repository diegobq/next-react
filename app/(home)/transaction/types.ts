import { TypeTransaction } from '@/lib/dal/transaction/types'

export interface OptionProps {
  id: string
  value: string
  label: string
}

export interface ITypesConfig {
  [key: string]: {
    id: string
    label: string
    value: TypeTransaction
  }
}
