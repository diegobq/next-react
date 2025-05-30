import { PropsWithChildren } from 'react'

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen flex flex-col justify-center px-4 py-8 bg-gray-50 dark:bg-[#121212] sm:px-6 lg:px-8">
      {children}
    </div>
  )
}
