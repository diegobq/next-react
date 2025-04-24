'use client'

import { PropsWithChildren } from 'react'

const AuthHeader = ({ children }: PropsWithChildren) => (
  <div className="mx-auto w-full max-w-sm sm:max-w-md">
    <h2 className="mt-2 text-center text-2xl font-bold text-gray-900 dark:text-white">
      {children}
    </h2>
  </div>
)

export default AuthHeader
