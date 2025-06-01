'use server'

import { ActionResponse } from '@/app/types'

import { createSessionCookie, deleteSessionCookie } from './authAction'

export async function createSession(idToken: string): Promise<ActionResponse> {
  const success = await createSessionCookie(idToken)
  const status = success ? 'succeeded' : 'failed'

  return {
    success,
    message: `Session creation ${status}`,
  }
}

export async function removeSession(): Promise<void> {
  await deleteSessionCookie()

  return
}
