import { TransactionProps } from '@/app/(home)/transaction/types'
import { Timestamp } from 'firebase-admin/firestore'

export type TypeTransaction = 'buy' | 'sell'

export interface TransactionDBProps {
  type: TypeTransaction
  period: number
  month: number
  date: Timestamp
  quantity: number
  price: number
}

export type SaveTransaction = (props: TransactionProps) => Promise<void>
export type GetTransactions = () => Promise<TransactionDBProps[]>
