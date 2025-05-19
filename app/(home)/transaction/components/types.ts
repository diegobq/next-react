import { TypeTransaction } from '@/lib/dal/transaction/types'

import { TransactionProps } from '../types'

export interface BackCtaProps {
  period: number
}

export interface NewCtaProps {
  type: TypeTransaction
}

export interface TxCardProps {
  tx: TransactionProps
}

export interface TxFormProps {
  tx: TransactionProps
}
