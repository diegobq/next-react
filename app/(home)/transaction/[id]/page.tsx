import { PageProps } from '@/.next/types/app/layout'

import { get } from '../actions'
import { TxForm } from '../components'

export default async function FormPage(props: PageProps) {
  const { params } = props
  const { id } = await params
  const response = await get(id)

  if (!response.data) {
    return (
      <p className="text-center mt-10 text-gray-500">Transaction not found.</p>
    )
  }

  return <TxForm tx={response.data} />
}
