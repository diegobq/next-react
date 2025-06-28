'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

import { TypeTransaction } from '@/lib/dal/transaction/types'
import { getCurrentDateInfo } from '@/lib/date'

import { TransactionProps } from '../../actions/types'
import { TxForm } from '../components'
import { typesConfig, validTypes } from '../constants'

const { currentMonth, currentPeriod, today } = getCurrentDateInfo()

export default function FormPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const typeFromUrl = searchParams.get('type') as TypeTransaction
  const periodFromUrl = parseInt(searchParams.get('period') || '')
  const period = isNaN(periodFromUrl) ? currentPeriod : periodFromUrl
  const validTypeFromUrl: TypeTransaction =
    typeFromUrl && typesConfig[typeFromUrl]?.value

  const transaction: TransactionProps = {
    id: undefined,
    type: validTypeFromUrl || validTypes[0],
    status: 'created',
    date: today.toISOString().split('T')[0],
    period: period,
    month: currentMonth,
    quantity: 0,
    price: 0,
  }

  const { type } = transaction

  useEffect(() => {
    if (!validTypeFromUrl) {
      const params = new URLSearchParams(searchParams.toString())
      params.set('type', type)
      router.replace(`?${params.toString()}`)
    }
  }, [type, router, searchParams, validTypeFromUrl])

  return <TxForm tx={transaction} />
}
