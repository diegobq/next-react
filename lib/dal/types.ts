import { Timestamp } from 'firebase-admin/firestore'

export interface DBProps {
  id: string
  createdAt: Timestamp
  updatedAt: Timestamp
}
