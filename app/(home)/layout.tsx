import Link from 'next/link'
import SignoutButton from '@/app/components/SignoutButton'

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-gray-200 dark:border-dark-border-subtle bg-gray dark:bg-dark-base">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-xl font-bold">
              Authentication
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <SignoutButton />
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>
    </div>
  )
}
