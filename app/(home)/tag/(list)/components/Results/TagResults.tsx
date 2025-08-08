'use client'

import { TagProps } from '../../../actions/types'
import TagCard from './TagCard'

export default function TagResults({ data }: { data: TagProps[] }) {
  return (
    <div className="w-full max-w-2xl space-y-4">
      {data.map((tag) => (
        <TagCard key={tag.id} tag={tag} />
      ))}
    </div>
  )
}
