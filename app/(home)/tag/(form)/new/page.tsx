'use client'

import { getCurrentDateInfo } from '@/lib/date'

import { TagProps } from '../../actions/types'
import { TagForm } from '../components'

const { today } = getCurrentDateInfo()

export default function FormPage() {
  const transaction: TagProps = {
    id: undefined,
    title: '',
    date: today.toISOString().split('T')[0],
    total: 0,
  }

  return <TagForm tx={transaction} />
}
