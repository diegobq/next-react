import { TypeTransaction } from '@/lib/dal/transaction/types'

export interface TransactionProps {
  type: TypeTransaction
  period: number
  month: number
  date: string
  quantity: number
  price: number
}
