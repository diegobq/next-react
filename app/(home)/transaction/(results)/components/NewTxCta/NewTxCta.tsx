'use client'

import { useSearchParams } from 'next/navigation'

import { TRANSACTION_PAGE } from '@/app/(auth)/constants'
import { Link } from '@/app/components/ui'
import { getCurrentDateInfo } from '@/lib/date'

import { TxTypes } from '../../../constants'
import { NewCtaProps } from './types'

const CtaConfig = {
  buy: {
    label: 'New Buy',
    href: `${TRANSACTION_PAGE}/new?type=${TxTypes.BUY}`,
  },

  sell: {
    label: 'New Sell',
    href: `${TRANSACTION_PAGE}/new?type=${TxTypes.SELL}`,
  },
}

const { currentPeriod } = getCurrentDateInfo()

export default function NewTxCta(params: NewCtaProps) {
  const { type } = params
  const searchParams = useSearchParams()
  const selectedPeriod = searchParams.get('period') || currentPeriod
  const { href, label } = CtaConfig[type]

  return (
    <Link
      href={`${href}&period=${selectedPeriod}`}
      variant={type === 'buy' ? 'primary' : 'danger'}
    >
      {label}
    </Link>
  )
}
