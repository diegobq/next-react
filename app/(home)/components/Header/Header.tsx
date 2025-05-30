'use client'

import { useState } from 'react'

import { Signout } from '@/app/(auth)/components'
import { APP_NAME, HOME_PAGE } from '@/app/(auth)/constants'
import { Link } from '@/app/components/ui'

import CloseIcon from './CloseIcon'
import HamburgerIcon from './HamburgerIcon'
import NavLinks from './NavLinks'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 dark:border-dark-border-subtle bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link
          href={HOME_PAGE}
          className="text-xl font-bold"
          variant="ghost"
          onClick={closeMobileMenu}
        >
          {APP_NAME}
        </Link>

        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
            aria-controls="mobile-menu"
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle main menu"
          >
            <span className="sr-only">Open main menu</span>
            {isMobileMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
          </button>
        </div>

        <nav className="hidden md:flex items-center space-x-4">
          <NavLinks className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400" />
          <Signout />
        </nav>
      </div>

      {isMobileMenuOpen && (
        <div
          className="md:hidden absolute w-full bg-gray-50 dark:bg-gray-900 shadow-lg border-t border-gray-200 dark:border-dark-border-subtle"
          id="mobile-menu"
        >
          <nav className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
            <NavLinks
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-green-600 dark:hover:text-green-400"
              onClick={closeMobileMenu}
            />
          </nav>
          <div className="border-t border-gray-200 dark:border-dark-border-subtle px-4 pt-3 pb-3 sm:px-3">
            <Signout />
          </div>
        </div>
      )}
    </header>
  )
}
