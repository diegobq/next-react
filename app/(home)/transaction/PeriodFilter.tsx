'use client'

import { useRouter, useSearchParams } from 'next/navigation'

import { periodOptions } from './periodOptions'

export function PeriodFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const selected = searchParams.get('period') || ''

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set('period', value)
    } else {
      params.delete('period')
    }
    router.replace(`?${params.toString()}`)
  }

  return (
    <div className="w-full max-w-md mb-6">
      <select
        id="period"
        name="period"
        value={selected}
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
