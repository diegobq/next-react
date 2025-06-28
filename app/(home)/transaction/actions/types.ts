import {
  TransactionDBProps,
  TypeTransaction,
} from '@/lib/dal/transaction/types'

export type StatusType = 'created' | 'pending' | 'deleted'

export interface TransactionProps {
  id?: string
  type: TypeTransaction
  status: StatusType
  period: number
  month: number
  date: string
  quantity: number
  price: number
}

export type GetTxDataFromTxDBType = (
  params: TransactionDBProps
) => TransactionProps
