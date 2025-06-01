'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { Select } from '@/app/components/ui'

import { periodOptions } from '../../periodOptions'

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
    <div className="mb-6">
      <Select
        id="period"
        ariaLabel="Filter by period"
        name="period"
        value={period}
        onChange={handleChange}
        options={periodOptions}
        className="w-full border rounded-md p-2 text-center"
      />
    </div>
  )
}
