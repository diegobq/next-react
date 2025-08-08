'use client'

import { TAG_PAGE } from '@/app/(auth)/constants'
import { Link } from '@/app/components/ui'

export default function NewTagCta() {
  return (
    <Link href={`${TAG_PAGE}/new`} variant="primary">
      New Tag
    </Link>
  )
}
