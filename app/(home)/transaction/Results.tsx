'use client'

import { useSearchParams } from 'next/navigation'

import { ActionResponse } from '@/app/types'

import { TransactionProps } from './actions/types'
import { TxCard } from './components'

export default function Results(response: ActionResponse<TransactionProps[]>) {
  const searchParams = useSearchParams()
  const selectedPeriod = searchParams.get('period')
  const { error, data } = response

  if (!data || error) {
    return (
      <p className="text-gray-500 dark:text-gray-300 text-center">
        {response.message}
      </p>
    )
  }

  const filteredTransactions = !selectedPeriod
    ? data
    : data.filter((tx) => String(tx.period) === selectedPeriod)

  return (
    <div className="w-full max-w-2xl space-y-4">
      {!filteredTransactions?.length && (
        <p className="text-gray-500 dark:text-gray-300 text-center">
          No filtered transactions found
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
