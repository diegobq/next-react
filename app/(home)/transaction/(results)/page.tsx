import { TxTypes } from '../constants'
import { NewTxCta, PeriodFilter, Results } from './components'

export const dynamic = 'force-dynamic'

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
