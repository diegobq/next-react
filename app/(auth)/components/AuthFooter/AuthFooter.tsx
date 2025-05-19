'use client'

import Link from 'next/link'
import { FC } from 'react'

import { AuthFooterProps } from './types'

const AuthFooter: FC<AuthFooterProps> = ({ label, href, linkLabel }) => (
  <div className="mt-6 text-center">
    <p className="text-sm text-gray-600 dark:text-gray-400">
      {label}
      <Link
        href={href}
        className="font-medium text-gray-900 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
      >
        {linkLabel}
      </Link>
    </p>
  </div>
)

export default AuthFooter
