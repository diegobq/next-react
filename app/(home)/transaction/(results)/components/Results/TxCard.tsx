import Link from 'next/link'

import { TRANSACTION_PAGE } from '@/app/(auth)/constants'
import { cn } from '@/lib/utils'

import { months } from '../../../constants'
import { TxCardProps } from './types'

const variants = {
  primary: 'bg-green-800 text-white hover:bg-green-900 active:bg-green-950',
  danger: 'bg-red-700 text-white hover:bg-red-800 active:bg-red-900',
}

const statusVariants: Record<string, string> = {
  pending:
    'bg-yellow-200 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-100',
}

export default function TxCard(params: TxCardProps) {
  const { tx, showPeriod } = params
  const baseStyles =
    'flex flex-col justify-between p-4 rounded-lg shadow-md text-white min-h-[120px]'
  const variant = tx.type === 'buy' ? 'primary' : 'danger'
  const period = showPeriod ? `/${tx.period}` : ''
  const title = months[tx.month] + period
  const { date, status, quantity, price, type } = tx

  const ariaLabel = `View transaction: ${type} of ${quantity} units at $${price.toFixed(
    2
  )} on ${date}. Status: ${status}.`

  return (
    <Link
      href={`${TRANSACTION_PAGE}/${tx.id}?period=${tx.period}`}
      className={cn(baseStyles, variants[variant])}
      aria-label={ariaLabel}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1" />
        <p className="font-bold capitalize text-center flex-1">{title}</p>
        <div className="flex-1 text-right">
          {statusVariants[status] && (
            <span
              className={cn(
                'text-xs font-semibold inline-block py-1 px-2 rounded-full capitalize',
                statusVariants[status]
              )}
            >
              {status}
            </span>
          )}
        </div>
      </div>
      <div className="flex justify-between items-start">
        <div className="text-sm">{date}</div>
        <div className="text-right">
          <p>{quantity}</p>
          <p>${price.toFixed(2)}</p>
        </div>
      </div>
    </Link>
  )
}
