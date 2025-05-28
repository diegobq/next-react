'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense, useMemo } from 'react'

import { getAll } from './actions'
import { ResultsSkeleton, TxResults } from './components'

export default function Results() {
  const searchParams = useSearchParams()
  const selectedPeriod = searchParams.get('period') || undefined

  const response = useMemo(async () => {
    return await getAll()
  }, [])

  return (
    <Suspense fallback={<ResultsSkeleton />}>
      <TxResults response={response} selectedPeriod={selectedPeriod} />
    </Suspense>
  )
}
