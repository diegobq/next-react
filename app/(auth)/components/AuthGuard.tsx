'use client'

import { PropsWithChildren, useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'
import { onAuthStateChanged } from 'firebase/auth'

import { auth } from '@/lib/firebase'
import { DEFAULT_AUTH_PAGE } from '../constants'

export default function AuthGuard({ children }: PropsWithChildren) {
  const router = useRouter()
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push(DEFAULT_AUTH_PAGE)
      } else {
        setChecking(false)
      }
    })

    return () => unsubscribe()
  }, [router])

  if (checking) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">Checking authentication...</p>
      </div>
    )
  }

  return <>{children}</>
}
