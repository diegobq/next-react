import { TypeTransaction } from '@/lib/dal/transaction/types'

import { TransactionProps } from '../actions/types'

export interface BackCtaProps {
  period: number
}

export interface NewCtaProps {
  type: TypeTransaction
}

export interface TxCardProps {
  tx: TransactionProps
  showPeriod: boolean
}

export interface TxFormProps {
  tx: TransactionProps
}
