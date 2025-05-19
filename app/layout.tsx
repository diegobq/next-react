import './globals.css'

import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'

import { AuthProvider } from '@/app/(auth)'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Authentication',
  description: 'Next - React',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster position="top-center" reverseOrder={false} />

        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
