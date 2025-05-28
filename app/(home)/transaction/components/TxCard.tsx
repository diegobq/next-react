import Link from 'next/link'

import { TRANSACTION_PAGE } from '@/app/(auth)/constants'
import { cn } from '@/lib/utils'

import { months } from '../constants'
import { TxCardProps } from './types'

const variants = {
  primary: 'bg-green-600 text-white hover:bg-green-700 active:bg-green-800',
  danger: 'bg-red-600 text-white hover:bg-red-700',
}

export default function TxCard(params: TxCardProps) {
  const { tx, showPeriod } = params
  const baseStyles = 'p-4 rounded-lg shadow-md text-white'
  const variant = tx.type == 'buy' ? 'primary' : 'danger'
  const period = showPeriod ? `/${tx.period}` : ''

  return (
    <div className={cn(baseStyles, variants[variant])}>
      <Link href={`${TRANSACTION_PAGE}/${tx.id}?period=${tx.period}`}>
        <div className="flex justify-between">
          <p className="text-sm">{tx.date}</p>
          <p className="font-bold capitalize">
            {months[tx.month]}
            {period}
          </p>
        </div>
        <p>Quantity: {tx.quantity}</p>
        <p>Price: ${tx.price.toFixed(2)}</p>
      </Link>
    </div>
  )
}
