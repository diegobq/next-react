import { getApp, getApps, initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyDTqFxH0JlhBZaFk3aCOMPQ-IHAAD3eqN0',
  authDomain: 'shareger-fa6fc.firebaseapp.com',
  projectId: 'shareger-fa6fc',
  storageBucket: 'shareger-fa6fc.firebasestorage.app',
  messagingSenderId: '568891201542',
  appId: '1:568891201542:web:eff592322e361972480b87',
  measurementId: 'G-HK6T7WWSTD',
}

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const auth = getAuth(app)

export { auth }
