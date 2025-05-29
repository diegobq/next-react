'use client'

import { onAuthStateChanged, User } from 'firebase/auth'
import { usePathname, useRouter } from 'next/navigation'
import { createContext, useContext, useEffect, useState } from 'react'

import { LoadingSpinner } from '@/app/components/ui'
import { auth } from '@/lib/firebase'

import {
  DEFAULT_AUTH_PAGE,
  HOME_PAGE,
  REDIRECT_PAGE,
  SKIP_AUTH_PATHNAME,
} from '../constants'
import { encodeRedirectPage } from '../redirectPage'
import { AuthContextType } from './types'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()
  const skipAuthentication = SKIP_AUTH_PATHNAME[pathname]

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser)
      setLoading(false)

      if (firebaseUser) {
        if (skipAuthentication) {
          router.push(HOME_PAGE)
        }
      } else if (!skipAuthentication) {
        const redirect =
          pathname === HOME_PAGE
            ? ''
            : `?${REDIRECT_PAGE}=${encodeRedirectPage(pathname)}`
        router.push(`${DEFAULT_AUTH_PAGE}${redirect}`)
      }
    })

    return () => unsubscribe()
  }, [pathname, skipAuthentication, router])

  if (loading || (!user && !skipAuthentication)) {
    return <LoadingSpinner />
  }

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used inside an AuthProvider')
  }
  return context
}
