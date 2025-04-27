'use client'

// import { LogOutIcon } from 'lucide-react'
import { useAuth } from '../AuthContext/AuthContext'

export default function SignOutButton() {
  const { logout } = useAuth()

  return (
    <button
      onClick={logout}
      className="flex items-center w-full px-2 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
    >
      {/* <LogOutIcon size={20} className="mr-2" /> */}
      <span>Sign Out</span>
    </button>
  )
}
