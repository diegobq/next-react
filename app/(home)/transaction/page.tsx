import { NewTxCta } from './components'
import { TxTypes } from './constants'
import { PeriodFilter } from './PeriodFilter'
import Results from './Results'

// export const dynamic = 'force-dynamic'

export default function TransactionsPage() {
  return (
    <>
      <div className="flex gap-4 mb-6">
        <NewTxCta type={TxTypes.BUY} />
        <NewTxCta type={TxTypes.SELL} />
      </div>
      <PeriodFilter />

      <Results />
    </>
  )
}
