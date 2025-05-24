import { Timestamp } from 'firebase-admin/firestore'

import { TransactionProps } from '@/app/(home)/transaction/actions/types'
import { firestore } from '@/lib/firebaseAdmin'

import {
  GetTransaction,
  GetTransactions,
  SaveTransaction,
  SaveType,
  TransactionDBProps,
  TransformTxType,
} from './types'

const TRANSACTION = 'transaction'

const save: SaveType = async (id, status, tx) => {
  const now = new Date()
  const myCollectionRef = firestore.collection(TRANSACTION)
  if (id) {
    if (!tx) return
    const doc = await myCollectionRef.doc(id).get()

    if (!doc.exists) return

    const data = doc.data() as TransactionDBProps

    if (!data) return

    await doc.ref.set(
      {
        ...tx,
        date: Timestamp.fromDate(new Date(tx.date)),
        status,
        createdAt: data.createdAt,
        updatedAt: now,
      },
      { merge: true }
    )
  } else {
    const newDocRef = myCollectionRef.doc()
    await newDocRef.create({
      ...tx,
      status,
      createdAt: now,
      updatedAt: now,
    })
  }
}

const transformTx: TransformTxType = ({
  date,
  status: _status,
  createdAt: _createdAt,
  updatedAt: _updatedAt,
  ...rest
}) => ({ ...rest, date: date?.toDate().toISOString().split('T')[0] })

export const getTransaction: GetTransaction = async (id) => {
  const doc = await firestore.collection(TRANSACTION).doc(id).get()

  if (!doc.exists) return

  const transaction = doc.data() as TransactionDBProps

  if (!transaction) return
  const data = transformTx(transaction)

  return {
    id: doc.id,
    ...data,
  }
}

export const saveTransaction: SaveTransaction = async (id, tx) => {
  await save(id, 'created', tx)
}

export const removeTx = async (id: string) => {
  await save(id, 'deleted')
}

export const getAvailableTxs: GetTransactions = async () => {
  const query = firestore
    .collection(TRANSACTION)
    .where('status', '!=', 'deleted')
  const snapshot = await query.get()

  return snapshot.docs.reduce<TransactionProps[]>((acc, doc) => {
    const data = doc.data() as TransactionDBProps

    if (data) {
      acc.push({
        ...transformTx(data),
        id: doc.id,
      })
    }

    return acc
  }, [])
}
