'use client'

import { useSearchParams } from 'next/navigation'

import { TxCard } from './components'
import { TransactionProps } from './types'

export default function Results({ data }: { data?: TransactionProps[] }) {
  const searchParams = useSearchParams()
  const selectedPeriod = searchParams.get('period')

  if (!data) return null

  const filteredTransactions = !selectedPeriod
    ? data
    : data.filter((tx) => String(tx.period) === selectedPeriod)

  return (
    <div className="w-full max-w-2xl space-y-4">
      {!filteredTransactions?.length && (
        <p className="text-gray-500 dark:text-gray-300 text-center">
          No transactions found
        </p>
      )}
      {!!filteredTransactions?.length &&
        (filteredTransactions as TransactionProps[])
          .sort(({ period: t1p, month: t1m }, { period: t2p, month: t2m }) =>
            t1p === t2p ? t2m - t1m : t2p - t1p
          )
          .map((tx, index) => <TxCard key={index} tx={tx} />)}
    </div>
  )
}
