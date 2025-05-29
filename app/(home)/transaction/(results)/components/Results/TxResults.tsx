'use client'

import { useSearchParams } from 'next/navigation'
import { useMemo } from 'react'

import { TransactionProps } from '../../../actions/types'
import TxCard from './TxCard'

export default function TxResults({ data }: { data: TransactionProps[] }) {
  const searchParams = useSearchParams()
  const selectedPeriod = searchParams.get('period')

  const filteredTransactions = useMemo(() => {
    if (!selectedPeriod) {
      return data
    }

    return data?.filter((tx) => String(tx.period) === selectedPeriod)
  }, [data, selectedPeriod])

  return (
    <div className="w-full max-w-2xl space-y-4">
      {!filteredTransactions?.length && (
        <p className="text-gray-500 dark:text-gray-300 text-center">
          No transactions match the current filter.
        </p>
      )}
      {!!filteredTransactions?.length &&
        filteredTransactions.map((tx) => (
          <TxCard key={tx.id} tx={tx} showPeriod={!selectedPeriod} />
        ))}
    </div>
  )
}
