import { getAll } from './actions'
import { TxResults } from './components'

export default async function Results() {
  const { data, error, success } = await getAll()

  if (!success || !data || error) {
    return (
      <p className="text-gray-500 dark:text-gray-300 text-center">{error}</p>
    )
  }

  return <TxResults data={data} />
}
