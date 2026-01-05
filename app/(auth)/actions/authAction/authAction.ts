'use server'

import { cookies } from 'next/headers'

import { adminAuth } from '@/lib/firebaseAdmin'

import {
  COOKIE_SESSION_NAME,
  EXPIRES_IN_MS,
  EXPIRES_IN_SECONDS,
} from './contants'
import { IAuthenticatedUser, ISessionCookieOptions } from './types'

const getSessionCookieOptions = (): ISessionCookieOptions => ({
  httpOnly: true,
  secure: true,
  path: '/',
})

async function saveSessionCookie(value: string): Promise<boolean> {
  const cookiesManager = await cookies()
  cookiesManager.set(COOKIE_SESSION_NAME, value, {
    maxAge: EXPIRES_IN_SECONDS,
    ...getSessionCookieOptions(),
  })

  return true
}

export async function createSessionCookie(idToken: string): Promise<boolean> {
  return adminAuth.verifyIdToken(idToken).then(async () => {
    return adminAuth
      .createSessionCookie(idToken, {
        expiresIn: EXPIRES_IN_MS,
      })
      .then(saveSessionCookie)
      .catch((error) => {
        console.error('Create Session Cookie:', error)
        return false
      })
  })
}

export async function deleteSessionCookie(): Promise<boolean> {
  // return saveSessionCookie().catch((error) => {
  //   console.error('Delete Session Cookie:', error)
  //   return false
  // })
  const cookiesManager = await cookies()
  cookiesManager.delete({
    name: COOKIE_SESSION_NAME,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
  })

  return true
}

export async function getAuthenticatedUserServer(): Promise<IAuthenticatedUser> {
  return cookies()
    .then((cookiesManager) => cookiesManager.get(COOKIE_SESSION_NAME))
    .then((sessionCookie) => {
      if (!sessionCookie?.value) {
        throw new Error('session cookie unavailable')
      }

      return sessionCookie.value
    })
    .then(async (sessionCookie) => adminAuth.verifySessionCookie(sessionCookie))
    .then(({ email, uid }) => {
      if (!uid) {
        throw new Error('session cookie unavailable')
      }

      return { uid, email }
    })
}
