import Link from 'next/link'

import { TRANSACTION_PAGE } from '@/app/(auth)/constants'

import { BackCtaProps } from './types'

export default function BackCta(data: BackCtaProps) {
  const { period } = data

  return (
    <Link
      href={`${TRANSACTION_PAGE}?period=${period}`}
      className="inline-flex items-center text-sm text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
    >
      ← Back to Transactions
    </Link>
  )
}
