'use server'

import { revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'

import { getAuthenticatedUserServer } from '@/app/(auth)/actions/authAction'
import { TRANSACTION_PAGE } from '@/app/(auth)/constants'
import { ActionResponse } from '@/app/types'
import { GET_AVAILABLE_TXS_TAG } from '@/lib/dal/tags'
import { getAvailableTxs, getTransaction, saveTx } from '@/lib/dal/transaction'

import { TransactionSchema } from './schema'
import { StatusType, TransactionProps } from './types'

async function update(
  tx: TransactionProps,
  uid: string,
  status?: StatusType
): Promise<ActionResponse<TransactionProps>> {
  const { period } = tx

  try {
    const data = await saveTx(tx, uid, status)
    if (!data) {
      return {
        success: false,
        message: 'An error occurred while saving the transaction',
        error: 'Failed to save transaction',
      }
    }
  } catch (error) {
    console.error('Transaction save error:', error)
    return {
      success: false,
      message: 'Unexpected error occurred while saving the transaction',
      error: 'Failed to save transaction',
    }
  }

  revalidateTag(GET_AVAILABLE_TXS_TAG, { expire: 0 })
  redirect(`${TRANSACTION_PAGE}?period=${period}`)
}

export async function save(
  formData: FormData
): Promise<ActionResponse<TransactionProps>> {
  const { uid } = await getAuthenticatedUserServer()

  const data = {
    id: formData.get('id') as string,
    type: formData.get('type') as string,
    status: formData.get('status') as string,
    date: formData.get('date') as string,
    period: formData.get('period') as string,
    month: formData.get('month') as string,
    quantity: formData.get('quantity') as string,
    price: formData.get('price') as string,
  }

  const { data: tx, success, error } = TransactionSchema.safeParse(data)

  if (!success) {
    return {
      success: false,
      message: 'Transaction error',
      errors: error.flatten().fieldErrors,
    }
  }

  return update(tx, uid)
}

export async function remove(
  tx: TransactionProps
): Promise<ActionResponse<TransactionProps>> {
  const { uid } = await getAuthenticatedUserServer()

  return update(tx, uid, 'deleted')
}

export async function get(
  id: string
): Promise<ActionResponse<TransactionProps>> {
  await getAuthenticatedUserServer()
  try {
    if (!id) {
      return {
        success: true,
        message: 'new transaction',
      }
    }

    const transaction = await getTransaction(id)

    if (!transaction) {
      return {
        data: undefined,
        success: false,
        message: 'not found transaction',
      }
    }

    return {
      data: transaction,
      success: true,
      message: 'get Transaction',
    }
  } catch (error) {
    console.error('get transaction error:', error)
    return {
      success: false,
      message: 'An error occurred while getting the transaction',
      error: 'Failed to get transaction',
    }
  }
}

export async function getAll(): Promise<ActionResponse<TransactionProps[]>> {
  const { uid } = await getAuthenticatedUserServer()

  return getAvailableTxs(uid)
    .then((data) => ({
      data,
      success: true,
      message: 'Transactions saved',
    }))
    .catch((error) => {
      console.error('get transactions error:', error)
      return {
        success: false,
        message: 'An error occurred while getting the transactions',
        error: 'Failed to get transactions',
      }
    })
}
