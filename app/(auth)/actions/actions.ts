'use server'

import { redirect } from 'next/navigation'

import { ActionResponse } from '@/app/types'
import { createSessionCookie, deleteSessionCookie } from '@/lib/auth'

import { DEFAULT_AUTH_PAGE } from '../constants'

export async function createSession(idToken: string): Promise<ActionResponse> {
  const success = await createSessionCookie(idToken)
  const status = success ? 'succeeded' : 'failed'

  return {
    success,
    message: `Session creation ${status}`,
  }
}

export async function removeSession(): Promise<void> {
  await deleteSessionCookie().finally(() => {
    redirect(DEFAULT_AUTH_PAGE)
  })
}
