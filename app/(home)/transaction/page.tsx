import { getAll } from './actions'
import { NewTxCta } from './components'
import { PeriodFilter } from './PeriodFilter'
import Results from './Results'

export const dynamic = 'force-dynamic'

export default async function TransactionsPage() {
  const { data } = await getAll()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        Transactions
      </h1>

      <div className="flex gap-4 mb-6">
        <NewTxCta type="buy" />
        <NewTxCta type="sell" />
      </div>
      <PeriodFilter />

      <Results data={data} />
    </div>
  )
}
