import { DBProps } from '../types'

export type GetCollectionByIdType = <T>(
  collectionName: string,
  id: string
) => Promise<T | undefined>

export type SaveCollectionType = (
  collectionName: string,
  data: DBProps,
  uid: string
) => Promise<DBProps | undefined>
