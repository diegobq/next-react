import { Suspense } from 'react'

import { PageProps } from '@/.next/types/app/layout'

import { get } from '../../actions'
import { TagForm, TagFormSkeleton } from '../components'

export default async function FormPage(props: PageProps) {
  const { params } = props
  const { id } = await params
  const { data } = await get(id)

  if (!data) {
    return <p className="text-center mt-10 text-gray-500">Tag not found.</p>
  }

  return (
    <Suspense fallback={<TagFormSkeleton />}>
      <TagForm tx={data} />
    </Suspense>
  )
}
