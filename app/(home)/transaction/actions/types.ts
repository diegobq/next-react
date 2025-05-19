import { TransactionDBProps } from '@/lib/dal/transaction/types'

import { TransactionProps } from '../types'

export type GetTxDataFromTxDBType = (
  params: TransactionDBProps
) => TransactionProps
