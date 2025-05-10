import { get } from './actions'
import { months } from './constants'
import { TransactionProps } from './types'

export default async function TransactionsPage() {
  const { data } = await get()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        Transactions
      </h1>

      <div className="flex gap-4 mb-6">
        <a
          href="/transaction/new?type=buy"
          className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
        >
          New Buy
        </a>
        <a
          href="/transaction/new?type=sell"
          className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
        >
          New Sell
        </a>
      </div>

      <div className="w-full max-w-2xl space-y-4">
        {!data?.length && (
          <p className="text-gray-500 dark:text-gray-300 text-center">
            No transactions found.
          </p>
        )}
        {!!data?.length &&
          (data as TransactionProps[])
            .sort(({ period: t1p, month: t1m }, { period: t2p, month: t2m }) =>
              t1p === t2p ? t2m - t1m : t2p - t1p
            )
            .map((tx, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg shadow-md text-white ${
                  tx.type === 'buy' ? 'bg-green-600' : 'bg-red-600'
                }`}
              >
                <div className="flex justify-between">
                  <p className="font-bold capitalize">
                    {tx.type} - {months[tx.month]}/{tx.period}
                  </p>
                  <p className="text-sm">{tx.date}</p>
                </div>
                <p>Quantity: {tx.quantity}</p>
                <p>Price: ${tx.price.toFixed(2)}</p>
              </div>
            ))}
      </div>
    </div>
  )
}
