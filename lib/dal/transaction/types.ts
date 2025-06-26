import { Timestamp } from 'firebase-admin/firestore'

import { TransactionProps } from '@/app/(home)/transaction/actions/types'
import { TxTypes } from '@/app/(home)/transaction/constants'

import { DBProps } from '../types'

export type TypeTransaction = (typeof TxTypes)[keyof typeof TxTypes]

export type StatusType = 'created' | 'deleted'

export interface TransactionDBProps
  extends Omit<TransactionProps, 'date'>,
    DBProps {
  date: Timestamp
  status: StatusType
  uid: string
}

export type SaveTxType = (
  tx: TransactionProps,
  status: StatusType,
  uid: string
) => Promise<TransactionProps | undefined>

export type GetTransaction = (
  id: string
) => Promise<TransactionProps | undefined>

export type TransformTxType = (
  props: TransactionDBProps,
  id: string
) => TransactionProps
