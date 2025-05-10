import { firestore } from '@/lib/firebaseAdmin'
import { GetTransactions, SaveTransaction, TransactionDBProps } from './types'

const TRANSACTION = 'transaction'

export const saveTransaction: SaveTransaction = async (transaction) => {
  const myCollectionRef = firestore.collection(TRANSACTION)
  const newDocRef = myCollectionRef.doc()

  const newDocumentData = {
    ...transaction,
    createdAt: new Date(),
  }
  await newDocRef.create(newDocumentData)
}

export const getTransactions: GetTransactions = async () => {
  const snapshot = await firestore.collection(TRANSACTION).get()

  return snapshot.docs.map((doc) => {
    const data = doc.data() as TransactionDBProps
    return {
      ...data,
    }
  })
}
