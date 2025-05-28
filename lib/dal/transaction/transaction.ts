import { Timestamp } from 'firebase-admin/firestore'

import { TransactionProps } from '@/app/(home)/transaction/actions/types'
import { getAuthenticatedUserServer } from '@/lib/auth'
import { firestore } from '@/lib/firebaseAdmin'

import {
  GetTransaction,
  SaveTransaction,
  SaveType,
  TransactionDBProps,
  TransformTxType,
} from './types'

const TRANSACTION = 'transaction'

const save: SaveType = async (id, status, tx) => {
  const authenticatedUser = await getAuthenticatedUserServer()
  if (!authenticatedUser) return

  const { uid: userStringId } = authenticatedUser
  const uid = firestore.doc(`users/${userStringId}`)

  const now = new Date()
  const myCollectionRef = firestore.collection(TRANSACTION)
  if (id) {
    const doc = await myCollectionRef.doc(id).get()

    if (!doc.exists) return

    const data = doc.data() as TransactionDBProps

    if (!data) return

    await doc.ref.set(
      {
        ...(tx || data),
        status,
        date: tx ? Timestamp.fromDate(new Date(tx.date)) : data.date,
        createdAt: data.createdAt,
        updatedAt: now,
        uid,
      },
      { merge: true }
    )
    return transformTx(data, id)
  } else {
    if (!tx) return

    const newDocRef = myCollectionRef.doc()
    await newDocRef.create({
      ...tx,
      status,
      date: Timestamp.fromDate(new Date(tx.date)),
      createdAt: now,
      updatedAt: now,
      uid,
    })

    return tx
  }
}

const transformTx: TransformTxType = (tx, id) => ({
  id,
  type: tx.type,
  period: tx.period,
  month: tx.month,
  quantity: tx.quantity,
  price: tx.price,
  date: tx.date?.toDate().toISOString().split('T')[0],
})

export const getTransaction: GetTransaction = async (id) => {
  const doc = await firestore.collection(TRANSACTION).doc(id).get()

  if (!doc.exists) return

  const transaction = doc.data() as TransactionDBProps

  if (!transaction) return

  return transformTx(transaction, id)
}

export const saveTransaction: SaveTransaction = async (id, tx) =>
  await save(id, 'created', tx)

export const removeTx = async (id: string) => await save(id, 'deleted')

export const getAvailableTxs = async (
  uid: string
): Promise<TransactionProps[]> => {
  const query = firestore
    .collection(TRANSACTION)
    .where('uid', '==', firestore.doc(`users/${uid}`))
    .where('status', '!=', 'deleted')
    .orderBy('period', 'desc')
    .orderBy('month', 'desc')
    .orderBy('date', 'desc')
  const snapshot = await query.get()

  return snapshot.docs.reduce<TransactionProps[]>((acc, doc) => {
    const data = doc.data() as TransactionDBProps

    if (data) {
      acc.push(transformTx(data, doc.id))
    }

    return acc
  }, [])
}
