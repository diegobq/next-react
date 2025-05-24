import {
  TransactionDBProps,
  TypeTransaction,
} from '@/lib/dal/transaction/types'

export interface TransactionProps {
  id?: string
  type: TypeTransaction
  period: number
  month: number
  date: string
  quantity: number
  price: number
}

export type GetTxDataFromTxDBType = (
  params: TransactionDBProps
) => TransactionProps
