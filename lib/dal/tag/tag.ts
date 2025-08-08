import { Timestamp } from 'firebase-admin/firestore'
import { unstable_cacheTag as cacheTag } from 'next/cache'

import { TagProps } from '@/app/(home)/tag/actions/types'
import { firestore } from '@/lib/firebaseAdmin'

import { GET_AVAILABLE_TAGS_TAG } from '../tags'
import { GetTag, SaveType, TagDBProps, TransformType } from './types'

const collectionName = 'tag'

export const saveTag: SaveType = async (data, uid) => {
  const { id } = data
  const now = new Date()
  const userRef = firestore.doc(`users/${uid}`)
  const myCollectionRef = firestore.collection(collectionName)

  if (id) {
    const doc = await myCollectionRef.doc(id).get()

    if (!doc.exists) return

    const currentData = doc.data() as TagDBProps

    if (!currentData) return

    await doc.ref.set(
      {
        ...(data || currentData),
        date: data ? Timestamp.fromDate(new Date(data.date)) : currentData.date,
        createdAt: currentData.createdAt || now,
        updatedAt: now,
        uid: userRef,
      },
      { merge: true }
    )
    return transform(currentData, id)
  } else {
    const newDocRef = myCollectionRef.doc()
    await newDocRef.create({
      ...data,
      date: Timestamp.fromDate(new Date(data.date)),
      createdAt: now,
      updatedAt: now,
      uid: userRef,
    })

    return data
  }
}

const transform: TransformType = ({ title, total, date }, id) => ({
  id,
  title,
  total,
  date: date?.toDate().toISOString().split('T')[0],
})

export const getTag: GetTag = async (id) => {
  const doc = await firestore.collection(collectionName).doc(id).get()

  if (!doc.exists) return

  const transaction = doc.data() as TagDBProps

  if (!transaction) return

  return transform(transaction, id)
}

export const getAvailableTags = async (uid: string): Promise<TagProps[]> => {
  'use cache'
  cacheTag(GET_AVAILABLE_TAGS_TAG)
  const query = firestore
    .collection(collectionName)
    .where('uid', '==', firestore.doc(`users/${uid}`))
  // .where('status', '!=', 'deleted')
  // .orderBy('period', 'desc')
  // .orderBy('month', 'desc')
  // .orderBy('date', 'desc')
  const snapshot = await query.get()

  return snapshot.docs.reduce<TagProps[]>((acc, doc) => {
    const data = doc.data() as TagDBProps

    if (data) {
      acc.push(transform(data, doc.id))
    }

    return acc
  }, [])
}
