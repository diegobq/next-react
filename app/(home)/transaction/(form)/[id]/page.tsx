import { Suspense } from 'react'

type PageProps = {
  params: Promise<{ id: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

import { get } from '../../actions'
import { TxForm, TxFormSkeleton } from '../components'

export default async function FormPage(props: PageProps) {
  const { params } = props
  const { id } = await params
  const { data } = await get(id)

  if (!data) {
    return (
      <p className="text-center mt-10 text-gray-500">Transaction not found.</p>
    )
  }

  return (
    <Suspense fallback={<TxFormSkeleton />}>
      <TxForm tx={data} />
    </Suspense>
  )
}
