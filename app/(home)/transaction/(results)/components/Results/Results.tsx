import { Suspense } from 'react'

import { getAll } from '../../../actions'
import ResultsSkeleton from './ResultsSkeleton'
import TxResults from './TxResults'

export default async function Results() {
  const { success, data, error } = await getAll()

  if (!success) {
    return (
      <p className="text-gray-500 dark:text-gray-300 text-center">
        {error || 'Failed to load transactions.'}
      </p>
    )
  }

  if (!data) {
    return (
      <p className="text-gray-500 dark:text-gray-300 text-center">
        No transactions found.
      </p>
    )
  }

  return (
    <>
      <Suspense fallback={<ResultsSkeleton />}>
        <TxResults data={data} />
      </Suspense>
    </>
  )
}
