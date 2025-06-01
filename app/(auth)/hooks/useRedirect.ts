'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useCallback } from 'react'

import { DEFAULT_AUTH_PAGE, HOME_PAGE, REDIRECT_PAGE } from '../constants'
import { encodeRedirectPage } from '../redirectPage'

export function useRedirect() {
  const router = useRouter()
  const pathname = usePathname()

  return useCallback(() => {
    const redirect =
      pathname === HOME_PAGE
        ? ''
        : `?${REDIRECT_PAGE}=${encodeRedirectPage(pathname)}`
    router.push(`${DEFAULT_AUTH_PAGE}${redirect}`)
  }, [router, pathname])
}
