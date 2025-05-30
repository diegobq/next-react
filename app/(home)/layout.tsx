import { Header } from './components'

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Header />

      <main className="flex-1">{children}</main>
    </>
  )
}
