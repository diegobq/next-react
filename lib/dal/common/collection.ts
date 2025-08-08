import { firestore } from '@/lib/firebaseAdmin'

import { SaveCollectionType } from './types'

export const saveCollection: SaveCollectionType = async (
  collectionName,
  data,
  uid?
) => {
  const { id } = data
  const now = new Date()
  let userRef

  if (uid) {
    userRef = firestore.doc(`users/${uid}`)
  }
  const myCollectionRef = firestore.collection(collectionName)

  if (id) {
    const doc = await myCollectionRef.doc(id).get()

    if (!doc.exists) return

    const currentData = doc.data()

    if (!currentData) return

    await doc.ref.set(
      {
        ...(data || currentData),
        createdAt: currentData.createdAt || now,
        updatedAt: now,
        ...(userRef && { uid: userRef }),
      },
      { merge: true }
    )
  } else {
    const newDocRef = myCollectionRef.doc()
    await newDocRef.create({
      ...data,
      createdAt: now,
      updatedAt: now,
      ...(userRef && { uid: userRef }),
    })
  }

  return data
}

export const getCollection = async (collectionName: string, id: string) => {
  const doc = await firestore.collection(collectionName).doc(id).get()

  if (!doc.exists) return

  return doc.data()
}
