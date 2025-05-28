import { cookies } from 'next/headers'

import { adminAuth } from '@/lib/firebaseAdmin'

import {
  COOKIE_SESSION_NAME,
  EXPIRES_IN_MS,
  EXPIRES_IN_SECONDS,
} from './contants'
import { GetSessionCookieOptionsType, IAuthenticatedUser } from './types'

const getSessionCookieOptions: GetSessionCookieOptionsType = (maxAge) => ({
  maxAge,
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  path: '/',
})

async function saveSessionCookie(value = ''): Promise<boolean> {
  try {
    const cookiesManager = await cookies()
    const expiresIn = value ? EXPIRES_IN_SECONDS : 0
    cookiesManager.set(
      COOKIE_SESSION_NAME,
      value,
      getSessionCookieOptions(expiresIn)
    )
    return true
  } catch {
    throw new Error("Can't set it")
  }
}

export async function createSessionCookie(idToken: string): Promise<boolean> {
  return adminAuth.verifyIdToken(idToken).then(async () => {
    return adminAuth
      .createSessionCookie(idToken, {
        expiresIn: EXPIRES_IN_MS,
      })
      .then((sessionCookie) => {
        return saveSessionCookie(sessionCookie)
      })
      .catch((error) => {
        console.error('Create Session Cookie:', error)
        return false
      })
  })
}

export async function deleteSessionCookie(): Promise<boolean> {
  return saveSessionCookie().catch((error) => {
    console.error('Delete Session Cookie:', error)
    return false
  })
}

export async function getAuthenticatedUserServer(): Promise<
  IAuthenticatedUser | undefined
> {
  const cookiesManager = await cookies()
  const sessionCookie = cookiesManager.get(COOKIE_SESSION_NAME)

  if (!sessionCookie) {
    return
  }

  const { email, uid } = await adminAuth.verifySessionCookie(
    sessionCookie?.value
  )
  if (!uid) {
    return
  }

  return { uid, email }
}
