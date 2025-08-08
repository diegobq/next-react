import Link from 'next/link'

import { TAG_PAGE } from '@/app/(auth)/constants'
import { cn } from '@/lib/utils'

import { TagCardProps } from './types'

const variants = {
  primary: 'bg-green-800 text-white hover:bg-green-900 active:bg-green-950',
  danger: 'bg-red-700 text-white hover:bg-red-800 active:bg-red-900',
}

export default function TagCard(params: TagCardProps) {
  const { tag } = params
  const { title, total, date } = tag
  const baseStyles =
    'flex flex-col justify-between p-4 rounded-lg shadow-md text-white min-h-[120px]'

  const ariaLabel = `View tags: ${title} of ${total}`

  return (
    <Link
      href={`${TAG_PAGE}/${tag.id}`}
      className={cn(baseStyles, variants.primary)}
      aria-label={ariaLabel}
    >
      <div className="flex justify-between items-start">
        <p className="font-bold capitalize text-center flex-1">{title}</p>
      </div>
      <div className="flex justify-between items-start">
        <div className="text-sm">{date}</div>
        <div className="text-right">
          <p>{total}</p>
        </div>
      </div>
    </Link>
  )
}
