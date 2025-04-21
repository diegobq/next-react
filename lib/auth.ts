import { cache } from 'react'
import { cookies } from 'next/headers'

interface IUser {
  id: string
  email: string
}

export async function verifyPassword(receivedPw: string, expectedPw: string) {
  return new Promise((resolve) => resolve(receivedPw === expectedPw))
}

export async function createSession(userId: string) {
  try {
    // Create JWT with user data
    const token = `${userId}-token`

    // Store JWT in a cookie
    const cookieStore = await cookies()
    cookieStore.set({
      name: 'auth_token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
      sameSite: 'lax',
    })

    return true
  } catch (error) {
    console.error('Error creating session:', error)
    return false
  }
}

export const getSession = cache(async () => {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('auth_token')?.value

    if (!token) return null
    //   const payload = await verifyJWT(token)

    const tokenSplitted = decodeURIComponent(token).split('-')
    const userId = tokenSplitted.slice(0, 2).join('-')
    const email = tokenSplitted.slice(0, 1).join('-')
    const payload = {
      userId,
      email,
      password: `${email}-pw`,
    }

    return payload || null
  } catch (error) {
    // Handle the specific prerendering error
    if (
      error instanceof Error &&
      error.message.includes('During prerendering, `cookies()` rejects')
    ) {
      console.log(
        'Cookies not available during prerendering, returning null session'
      )
      return null
    }

    console.error('Error getting session:', error)
    return null
  }
})

export async function createUser(email: string, password: string) {
  console.log(password)
  return new Promise<IUser>((resolve) =>
    resolve({
      id: `${email}-id`,
      email,
    })
  )
}

export async function deleteSession() {
  const cookieStore = await cookies()
  cookieStore.delete('auth_token')
}
