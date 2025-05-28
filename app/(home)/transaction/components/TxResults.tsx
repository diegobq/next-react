'use client'

import { use, useMemo } from 'react'

import { ActionResponse } from '@/app/types'

import { TransactionProps } from '../actions/types'
import TxCard from './TxCard'

export default function TxResults({
  response,
  selectedPeriod,
}: {
  response: Promise<ActionResponse<TransactionProps[]>>
  selectedPeriod?: string
}) {
  const { data, error, success } = use(response)

  const filteredTransactions = useMemo(() => {
    if (!selectedPeriod) {
      return data
    }

    return data?.filter((tx) => String(tx.period) === selectedPeriod)
  }, [data, selectedPeriod])

  if (!success || !data || error) {
    return (
      <p className="text-gray-500 dark:text-gray-300 text-center">{error}</p>
    )
  }

  return (
    <div className="w-full max-w-2xl space-y-4">
      {!filteredTransactions?.length && (
        <p className="text-gray-500 dark:text-gray-300 text-center">
          No filtered transactions found
        </p>
      )}
      {!!filteredTransactions?.length &&
        filteredTransactions.map((tx) => (
          <TxCard key={tx.id} tx={tx} showPeriod={!selectedPeriod} />
        ))}
    </div>
  )
}
