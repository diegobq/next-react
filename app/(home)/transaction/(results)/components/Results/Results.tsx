import { getAll } from '../../../actions'
import { statuses, TxTypes } from '../../../constants'
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

  const total = data.reduce(
    (acc, { status, type, quantity }) =>
      acc +
      (type === TxTypes.BUY ? quantity : -quantity) *
        (status === statuses.PENDING.value ? 0 : 1),
    0
  )

  return (
    <>
      <div className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4 text-center">
        {total}
      </div>
      <TxResults data={data} />
    </>
  )
}
