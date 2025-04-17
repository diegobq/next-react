import { cache } from 'react'
import { getSession } from './auth'
import { IUser } from './types'

export async function getUserByEmail(email?: string) {
  const user = email
    ? {
        id: `${email}-id`,
        email,
        password: `${email}-pw`,
      }
    : null

  return new Promise<IUser | null>((resolve) => resolve(user))
}

export const getUser = cache(async () => {
  const session = await getSession()
  if (!session) return null

  // Skip database query during prerendering if we don't have a session
  // hack until we have PPR https://nextjs.org/docs/app/building-your-application/rendering/partial-prerendering
  if (
    typeof window === 'undefined' &&
    process.env.NEXT_PHASE === 'phase-production-build'
  ) {
    return null
  }

  //   const result = await db
  //     .select()
  //     .from(users)
  //     .where(eq(users.id, session.userId))

  return session
})
