'use client'

import { useSearchParams } from 'next/navigation'
import { useMemo } from 'react'

import { TransactionProps } from '../../../actions/types'
import { TxTypes } from '../../../constants'
import TxCard from './TxCard'

export default function TxResults({
  data,
  total,
}: {
  data: TransactionProps[]
  total: number
}) {
  const searchParams = useSearchParams()
  const selectedPeriod = searchParams.get('period')

  const filteredTransactions = useMemo(() => {
    if (!selectedPeriod) {
      return data
    }

    return data?.filter((tx) => String(tx.period) === selectedPeriod)
  }, [data, selectedPeriod])

  const [buyTotal, sellTotal] = useMemo(
    () =>
      filteredTransactions.reduce(
        (acc, { type, quantity }) => {
          if (type === TxTypes.BUY) {
            acc[0] += quantity
          } else {
            acc[1] += quantity
          }

          return acc
        },
        [0, 0]
      ),
    [filteredTransactions]
  )

  return (
    <div className="w-full max-w-2xl space-y-4">
      {!filteredTransactions?.length && (
        <p className="text-gray-500 dark:text-gray-300 text-center">
          No transactions match the current filter.
        </p>
      )}

      <div className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4 text-center">
        Total: {total}
      </div>
      <div className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4 text-center">
        Buy: {buyTotal} - Sell: {sellTotal}
      </div>
      {!!selectedPeriod && (
        <div className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4 text-center">
          Diff: {buyTotal - sellTotal}
        </div>
      )}

      {!!filteredTransactions?.length &&
        filteredTransactions.map((tx) => (
          <TxCard key={tx.id} tx={tx} showPeriod={!selectedPeriod} />
        ))}
    </div>
  )
}
