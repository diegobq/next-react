import { redirect } from 'next/navigation'

import { AuthProvider } from '@/app/(auth)'
import { getAuthenticatedUserServer } from '@/app/(auth)/actions/authAction'

import { DEFAULT_AUTH_PAGE } from '../(auth)/constants'
import { Header } from './components'

export default async function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  try {
    await getAuthenticatedUserServer()
  } catch {
    redirect(DEFAULT_AUTH_PAGE)
  }

  return (
    <>
      <Header />

      <main className="flex-1">
        <AuthProvider>{children}</AuthProvider>
      </main>
    </>
  )
}
