import { getAll } from '../../../actions'
import { TxTypes } from '../../../constants'
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
    (acc, { type, quantity }) =>
      acc + (type === TxTypes.BUY ? quantity : -quantity),
    0
  )

  return <TxResults data={data} total={total} />
}
