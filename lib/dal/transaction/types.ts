import { Timestamp } from 'firebase-admin/firestore'

import { TransactionProps } from '@/app/(home)/transaction/actions/types'
import { TxTypes } from '@/app/(home)/transaction/constants'

import { DBProps } from '../types'

export type TypeTransaction = (typeof TxTypes)[keyof typeof TxTypes]

type StatusType = 'created' | 'deleted'

export interface TransactionDBProps
  extends Omit<TransactionProps, 'date'>,
    DBProps {
  date: Timestamp
  status: StatusType
}

export type SaveType = (
  id: string,
  status: StatusType,
  tx?: TransactionProps
) => Promise<void>

export type SaveTransaction = (
  id: string,
  props: TransactionProps
) => Promise<void>
export type GetTransactions = () => Promise<TransactionProps[]>
export type GetTransaction = (
  id: string
) => Promise<TransactionProps | undefined>

export type TransformTxType = (props: TransactionDBProps) => TransactionProps
