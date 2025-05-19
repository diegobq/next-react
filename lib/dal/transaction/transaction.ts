import { firestore } from '@/lib/firebaseAdmin'

import {
  GetTransaction,
  GetTransactions,
  SaveTransaction,
  TransactionDBProps,
  TransactionProps,
} from './types'

const TRANSACTION = 'transaction'

export const saveTransaction: SaveTransaction = async (id, transaction) => {
  const now = new Date()
  const myCollectionRef = firestore.collection(TRANSACTION)
  if (id) {
    const doc = await myCollectionRef.doc(id).get()

    if (!doc.exists) return

    const data = doc.data() as TransactionDBProps

    if (!data) return

    await doc.ref.set(
      {
        ...transaction,
        createdAt: data.createdAt,
        updatedAt: now,
      },
      { merge: true }
    )
  } else {
    const newDocRef = myCollectionRef.doc()
    await newDocRef.create({
      ...transaction,
      createdAt: now,
      updatedAt: now,
    })
  }
}

const removeFields = (tx: TransactionDBProps): TransactionProps => {
  delete tx.createdAt
  delete tx.updatedAt

  return tx
}

export const getTransaction: GetTransaction = async (id) => {
  const doc = await firestore.collection(TRANSACTION).doc(id).get()

  if (!doc.exists) return

  const transaction = doc.data() as TransactionDBProps

  if (!transaction) return
  const data = removeFields(transaction)

  return {
    id: doc.id,
    ...data,
  }
}

export const getTransactions: GetTransactions = async () => {
  const snapshot = await firestore.collection(TRANSACTION).get()

  return snapshot.docs.reduce<TransactionProps[]>((acc, doc) => {
    const data = doc.data() as TransactionDBProps

    if (!data) return acc

    acc.push({
      ...removeFields(data),
      id: doc.id,
    })
    return acc
  }, [])
}
