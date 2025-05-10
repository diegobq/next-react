'use server'

import { ActionResponse } from '@/app/types'
import { getTransactions, saveTransaction } from '@/lib/dal/transaction'
import { TransactionSchema } from './schema'
import { TransactionProps } from '../types'

export async function save(
  formData: FormData
): Promise<ActionResponse<TransactionProps>> {
  try {
    const data = {
      type: formData.get('type') as string,
      date: formData.get('date') as string,
      period: formData.get('period') as string,
      month: formData.get('month') as string,
      quantity: formData.get('quantity') as string,
      price: formData.get('price') as string,
    }

    const {
      data: transaction,
      success,
      error,
    } = TransactionSchema.safeParse(data)
    if (!success) {
      return {
        success: false,
        message: 'Transaction error',
        errors: error.flatten().fieldErrors,
      }
    }

    await saveTransaction(transaction)

    return {
      success: true,
      message: 'Transaction saved',
    }
  } catch (error) {
    console.error('Sign in error:', error)
    return {
      success: false,
      message: 'An error occurred while signing in',
      error: 'Failed to sign in',
    }
  }
}

export async function get(): Promise<ActionResponse<TransactionProps[]>> {
  try {
    const transactions = await getTransactions()

    const data = transactions.reduce<TransactionProps[]>(
      (accummulator, { type, period, month, date, quantity, price }) => {
        accummulator.push({
          type,
          date: date.toDate().toISOString().split('T')[0],
          period,
          month,
          quantity,
          price,
        })

        return accummulator
      },
      []
    )

    return {
      data,
      success: true,
      message: 'Transaction saved',
    }
  } catch (error) {
    console.error('Sign in error:', error)
    return {
      success: false,
      message: 'An error occurred while signing in',
      error: 'Failed to sign in',
    }
  }
}
