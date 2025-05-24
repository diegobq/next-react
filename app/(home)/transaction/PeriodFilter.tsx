'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { periodOptions } from './periodOptions'

export function PeriodFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const selected = searchParams.get('period') || ''
  const [period, setPeriod] = useState(selected)

  useEffect(() => {
    if (period === selected) return

    const params = new URLSearchParams(searchParams.toString())
    if (period) {
      params.set('period', period)
    } else {
      params.delete('period')
    }
    router.replace(`?${params.toString()}`)
  }, [period, router, searchParams, selected])

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPeriod(e.target.value)
  }

  return (
    <div className="w-full max-w-md mb-6">
      <select
        id="period"
        name="period"
        value={period}
        onChange={handleChange}
        className="w-full border rounded-md p-2 bg-white dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600"
      >
        <option value="">All Periods</option>
        {periodOptions.map(({ id, label, value }) => (
          <option key={id} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  )
}
