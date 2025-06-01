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
  uid: string
}

export type SaveType = (
  id: string,
  uid: string,
  status: StatusType,
  tx?: TransactionProps
) => Promise<TransactionProps | undefined>

export type SaveTransaction = (
  id: string,
  uid: string,
  tx: TransactionProps
) => Promise<TransactionProps | undefined>
export type GetTransaction = (
  id: string
) => Promise<TransactionProps | undefined>

export type TransformTxType = (
  props: TransactionDBProps,
  id: string
) => TransactionProps
