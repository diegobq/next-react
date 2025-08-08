import { Timestamp } from 'firebase-admin/firestore'

import { TagProps } from '@/app/(home)/tag/actions/types'

import { DBProps } from '../types'

export interface TagDBProps extends Omit<TagProps, 'id' | 'date'>, DBProps {
  date: Timestamp
  uid: string
}

export type SaveType = (
  data: TagProps,
  uid: string
) => Promise<TagProps | undefined>

export type GetTag = (id: string) => Promise<TagProps | undefined>

export type TransformType = (props: TagDBProps, id: string) => TagProps
