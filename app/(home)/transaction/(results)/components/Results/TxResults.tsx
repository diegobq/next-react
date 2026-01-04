'use client'

import { useSearchParams } from 'next/navigation'

import { Link } from '@/app/components/ui'

import { TransactionProps } from '../../../actions/types'
import { TxTypes } from '../../../constants'
import TxCard from './TxCard'

export default function TxResults({ data }: { data: TransactionProps[] }) {
  const searchParams = useSearchParams()
  const selectedPeriod = searchParams.get('period')
  const selectedType = searchParams.get('type')

  const paramsBuy = new URLSearchParams(searchParams.toString())
  const paramsSell = new URLSearchParams(searchParams.toString())
  if (selectedPeriod) {
    paramsBuy.set('period', selectedPeriod)
    paramsSell.set('period', selectedPeriod)
  } else {
    paramsBuy.delete('period')
    paramsSell.delete('period')
  }

  if (selectedType === TxTypes.BUY) {
    paramsBuy.delete('type')
    paramsSell.set('type', TxTypes.SELL)
  } else if (selectedType === TxTypes.SELL) {
    paramsSell.delete('type')
    paramsBuy.set('type', TxTypes.BUY)
  } else {
    paramsBuy.set('type', TxTypes.BUY)
    paramsSell.set('type', TxTypes.SELL)
  }

  const filteredTransactions = data?.filter(
    ({ type, period }) =>
      (!selectedPeriod || String(period) === selectedPeriod) &&
      (!selectedType || type === selectedType)
  )

  const [buyTotal, sellTotal] = filteredTransactions.reduce(
    (acc, { type, quantity }) => {
      if (type === TxTypes.BUY) {
        acc[0] += quantity
      } else {
        acc[1] += quantity
      }

      return acc
    },
    [0, 0]
  )

  return (
    <div className="w-full max-w-2xl space-y-4">
      {!filteredTransactions?.length && (
        <p className="text-gray-500 dark:text-gray-300 text-center">
          No transactions match the current filter.
        </p>
      )}

      <div className="flex justify-center gap-4 text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4 text-center">
        <Link
          href={`?${paramsBuy.toString()}`}
          variant={!!buyTotal ? 'primary' : 'secondary'}
          className="w-28"
        >
          {buyTotal}
        </Link>
        <Link
          href={`?${paramsSell.toString()}`}
          variant={!!sellTotal ? 'danger' : 'secondary'}
          className="w-28"
        >
          {sellTotal}
        </Link>
      </div>

      {!!selectedPeriod && !selectedType && (
        <div className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4 text-center">
          {buyTotal - sellTotal}
        </div>
      )}

      {!!filteredTransactions?.length &&
        filteredTransactions.map((tx) => (
          <TxCard key={tx.id} tx={tx} showPeriod={!selectedPeriod} />
        ))}
    </div>
  )
}
