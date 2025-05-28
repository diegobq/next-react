'use server'

import { ActionResponse } from '@/app/types'
import { createSessionCookie } from '@/lib/auth'

export async function createSession(idToken: string): Promise<ActionResponse> {
  const success = await createSessionCookie(idToken)
  const status = success ? 'succeeded' : 'failed'

  return {
    success,
    message: `Session creation ${status}`,
  }
}
