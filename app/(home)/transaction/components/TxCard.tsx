import Link from 'next/link'

import { TRANSACTION } from '@/app/(auth)/constants'

import { months } from '../constants'
import { TxCardProps } from './types'

export default function TxCard(params: TxCardProps) {
  const { tx } = params

  return (
    <div
      className={`p-4 rounded-lg shadow-md text-white ${
        tx.type === 'buy' ? 'bg-green-600' : 'bg-red-600'
      }`}
    >
      <Link href={`${TRANSACTION}/${tx.id}?period=${tx.period}`}>
        <div className="flex justify-between">
          <p className="font-bold capitalize">
            {months[tx.month]}/{tx.period}
          </p>
          <p className="text-sm">{tx.date}</p>
        </div>
        <p>Quantity: {tx.quantity}</p>
        <p>Price: ${tx.price.toFixed(2)}</p>
      </Link>
    </div>
  )
}
