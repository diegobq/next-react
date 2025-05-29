import { TransactionProps } from '../actions/types'

export interface BackCtaProps {
  period: number
}

export interface TxCardProps {
  tx: TransactionProps
  showPeriod: boolean
}

export interface TxFormProps {
  tx: TransactionProps
}
