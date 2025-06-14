'use server'

import { redirect } from 'next/navigation'

import { getAuthenticatedUserServer } from '@/app/(auth)/actions/authAction'
import { TRANSACTION_PAGE } from '@/app/(auth)/constants'
import { ActionResponse } from '@/app/types'
import {
  getAvailableTxs,
  getTransaction,
  removeTx,
  saveTx,
} from '@/lib/dal/transaction'

import { TransactionSchema } from './schema'
import { TransactionProps } from './types'

export async function save(
  formData: FormData
): Promise<ActionResponse<TransactionProps>> {
  const { uid } = await getAuthenticatedUserServer()

  const data = {
    type: formData.get('type') as string,
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

  try {
    const data = await saveTx(formData.get('id') as string, uid, tx)
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

  redirect(`${TRANSACTION_PAGE}?period=${data.period}`)
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

export async function remove(id: string): Promise<ActionResponse> {
  const { uid } = await getAuthenticatedUserServer()

  let data
  try {
    data = await removeTx(id, uid)
  } catch (error) {
    console.error('remove transaction error:', error)
    return {
      success: false,
      message: 'Unexpected error occurred while removing the transaction',
      error: 'Failed to remove transaction',
    }
  }

  if (!data) {
    return {
      success: false,
      message: 'An error occurred while removing the transaction',
      error: 'Failed to remove transaction',
    }
  }
  redirect(`${TRANSACTION_PAGE}?period=${data.period}`)
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
