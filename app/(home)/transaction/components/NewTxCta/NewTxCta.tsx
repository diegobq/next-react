'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

import { TRANSACTION } from '@/app/(auth)/constants'
import { getCurrentDateInfo } from '@/lib/date'

import { NewCtaProps } from '../types'
import { CtaConfigProps } from './types'

const CtaConfig: CtaConfigProps = {
  buy: {
    label: 'New Buy',
    href: `${TRANSACTION}/new?type=buy`,
    bg: 'bg-green-600',
    bgHover: 'bg-green-700',
  },

  sell: {
    label: 'New Sell',
    href: '/transaction/new?type=sell',
    bg: 'bg-red-600',
    bgHover: 'bg-red-700',
  },
}

const { currentPeriod } = getCurrentDateInfo()

export default function NewTxCta(params: NewCtaProps) {
  const { type } = params
  const searchParams = useSearchParams()
  const selectedPeriod = searchParams.get('period') || currentPeriod
  const { href, label, bg, bgHover } = CtaConfig[type]

  return (
    <Link
      href={`${href}&period=${selectedPeriod}`}
      className={`px-4 py-2 rounded ${bg} text-white hover:${bgHover}`}
    >
      {label}
    </Link>
  )
}
