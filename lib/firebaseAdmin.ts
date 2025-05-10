import admin from 'firebase-admin'

const getFirebaseAdminConfig = () => ({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  }),
})

if (!admin.apps.length) {
  admin.initializeApp(getFirebaseAdminConfig())
}

export const firestore = admin.firestore()
