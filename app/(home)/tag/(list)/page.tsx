import { Suspense } from 'react'

import { NewTagCta, Results, ResultsSkeleton } from './components'

export const dynamic = 'force-dynamic'

export default function ListPage() {
  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <NewTagCta />
      </div>

      <Suspense fallback={<ResultsSkeleton />}>
        <Results />
      </Suspense>
    </>
  )
}
