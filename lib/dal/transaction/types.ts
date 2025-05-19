import { Timestamp } from 'firebase-admin/firestore'

import { DBProps } from '../types'

export type TypeTransaction = 'buy' | 'sell'

export interface TransactionDBProps extends TransactionProps, DBProps {}

export interface TransactionProps {
  id?: string
  type: TypeTransaction
  period: number
  month: number
  date: Timestamp
  quantity: number
  price: number
}

export type SaveTransaction = (
  id: string,
  props: TransactionDBProps
) => Promise<void>
export type GetTransactions = () => Promise<TransactionProps[]>
export type GetTransaction = (
  id: string
) => Promise<TransactionProps | undefined>
