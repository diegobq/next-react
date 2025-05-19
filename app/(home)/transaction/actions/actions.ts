'use server'

import { Timestamp } from 'firebase-admin/firestore'

import { ActionResponse } from '@/app/types'
import { getTransactions, saveTransaction } from '@/lib/dal/transaction'
import { getTransaction } from '@/lib/dal/transaction/transaction'

import { TransactionProps } from '../types'
import { TransactionSchema } from './schema'
import { GetTxDataFromTxDBType } from './types'

const getTxDataFromTxDB: GetTxDataFromTxDBType = ({ date, ...rest }) => ({
  ...rest,
  date: date?.toDate().toISOString().split('T')[0],
})

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

    await saveTransaction(formData.get('id') as string, {
      ...transaction,
      date: Timestamp.fromDate(transaction.date),
    })

    return {
      success: true,
      message: 'Transaction saved',
    }
  } catch (error) {
    console.error('Transaction save error:', error)
    return {
      success: false,
      message: 'An error occurred while saving the transaction',
      error: 'Failed to save transaction',
    }
  }
}

export async function get(
  id: string
): Promise<ActionResponse<TransactionProps>> {
  try {
    if (!id) {
      return {
        success: true,
        message: 'new transaction',
      }
    }

    const transaction = await getTransaction(id as string)

    if (!transaction) {
      return {
        data: undefined,
        success: false,
        message: 'not found transaction',
      }
    }

    return {
      data: getTxDataFromTxDB(transaction),
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
  try {
    const transactions = await getTransactions()

    const data = transactions.reduce<TransactionProps[]>((accummulator, tx) => {
      accummulator.push(getTxDataFromTxDB(tx))

      return accummulator
    }, [])

    return {
      data,
      success: true,
      message: 'Transactions saved',
    }
  } catch (error) {
    console.error('get transactions error:', error)
    return {
      success: false,
      message: 'An error occurred while getting the transactions',
      error: 'Failed to get transactions',
    }
  }
}
