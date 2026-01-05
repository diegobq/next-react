import { Timestamp } from 'firebase-admin/firestore'
import { cacheTag } from 'next/cache'

import { TransactionProps } from '@/app/(home)/transaction/actions/types'
import { firestore } from '@/lib/firebaseAdmin'

import { GET_AVAILABLE_TXS_TAG } from '../tags'
import {
  GetAvailableTxs,
  GetTransaction,
  SaveTxType,
  TransactionDBProps,
  TransformTxType,
} from './types'

const collectionName = 'transaction'

export const saveTx: SaveTxType = async (tx, uid, status) => {
  const { id } = tx
  const now = new Date()
  const userRef = firestore.doc(`users/${uid}`)
  const myCollectionRef = firestore.collection(collectionName)

  if (id) {
    const doc = await myCollectionRef.doc(id).get()

    if (!doc.exists) return

    const data = doc.data() as TransactionDBProps

    if (!data) return

    await doc.ref.set(
      {
        ...(tx || data),
        status: status || tx.status,
        date: tx ? Timestamp.fromDate(new Date(tx.date)) : data.date,
        createdAt: data.createdAt,
        updatedAt: now,
        uid: userRef,
      },
      { merge: true }
    )
    return transformTx(data, id)
  } else {
    if (!tx) return

    const newDocRef = myCollectionRef.doc()
    await newDocRef.create({
      ...tx,
      status: tx.status,
      date: Timestamp.fromDate(new Date(tx.date)),
      createdAt: now,
      updatedAt: now,
      uid: userRef,
    })

    return tx
  }
}

const transformTx: TransformTxType = (tx, id) => ({
  id,
  type: tx.type,
  status: tx.status,
  period: tx.period,
  month: tx.month,
  quantity: tx.quantity,
  price: tx.price,
  date: tx.date?.toDate().toISOString().split('T')[0],
})

export const getTransaction: GetTransaction = async (id) => {
  const doc = await firestore.collection(collectionName).doc(id).get()

  if (!doc.exists) return

  const transaction = doc.data() as TransactionDBProps

  if (!transaction) return

  return transformTx(transaction, id)
}

export const getAvailableTxs: GetAvailableTxs = async ({ uid }) => {
  'use cache'
  cacheTag(GET_AVAILABLE_TXS_TAG)
  const query = firestore
    .collection(collectionName)
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
