import { Timestamp } from 'firebase-admin/firestore'

import {
  StatusType,
  TransactionProps,
} from '@/app/(home)/transaction/actions/types'
import { TxTypes } from '@/app/(home)/transaction/constants'

import { DBProps } from '../types'

export type TypeTransaction = (typeof TxTypes)[keyof typeof TxTypes]

export interface TransactionDBProps
  extends Omit<TransactionProps, 'id' | 'date'>,
    DBProps {
  date: Timestamp
  uid: string
}

export type SaveTxType = (
  tx: TransactionProps,
  uid: string,
  status?: StatusType
) => Promise<TransactionProps | undefined>

export type GetTransaction = (
  id: string
) => Promise<TransactionProps | undefined>

export type TransformTxType = (
  props: TransactionDBProps,
  id: string
) => TransactionProps
