import { Timestamp } from 'firebase-admin/firestore'

export interface DBProps {
  createdAt?: Timestamp
  updatedAt?: Timestamp
}
