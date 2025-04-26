'use client'

import { PropsWithChildren } from 'react'

const Wrapper = ({ children }: PropsWithChildren) => (
  <div className="min-h-screen flex flex-col justify-center px-4 py-8 bg-gray-50 dark:bg-[#121212] sm:px-6 lg:px-8">
    {children}
  </div>
)

export default Wrapper
