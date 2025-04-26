'use client'

import { PropsWithChildren } from 'react'

const Wrapper = ({ children }: PropsWithChildren) => (
  <div className="mt-8 mx-auto w-full max-w-sm sm:max-w-md">
    <div className="bg-white dark:bg-[#1A1A1A] py-6 px-4 sm:px-6 sm:py-8 shadow-md sm:rounded-2xl border border-gray-200 dark:border-dark-border-subtle">
      {children}
    </div>
  </div>
)

export default Wrapper
