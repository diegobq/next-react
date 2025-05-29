'use client'

import { signOut } from 'firebase/auth'
import { useCallback } from 'react'

import { Button } from '@/app/components/ui'
import { auth } from '@/lib/firebase'

import { removeSession } from '../actions/actions'

export default function SignOutButton() {
  const onClick = useCallback(async () => {
    signOut(auth).finally(removeSession)
  }, [])

  return (
    <Button
      variant="secondary"
      onClick={onClick}
      className="flex items-center w-full px-2 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
    >
      <span>Sign Out</span>
    </Button>
  )
}
