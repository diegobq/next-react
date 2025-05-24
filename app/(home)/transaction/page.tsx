import { Suspense } from 'react'

import { getAll } from './actions'
import { NewTxCta, ResultsSkeleton } from './components'
import { TxTypes } from './constants'
import { PeriodFilter } from './PeriodFilter'
import Results from './Results'

export const dynamic = 'force-dynamic'

async function TransactionContent() {
  const response = await getAll()
  return (
    <>
      <Results {...response} />
    </>
  )
}
export default function TransactionsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        Transactions
      </h1>

      <div className="flex gap-4 mb-6">
        <NewTxCta type={TxTypes.BUY} />
        <NewTxCta type={TxTypes.SELL} />
      </div>
      <PeriodFilter />

      <Suspense fallback={<ResultsSkeleton />}>
        <TransactionContent />
      </Suspense>
    </div>
  )
}
