import "../globals.css";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/dal";
import Link from "next/link";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser() // returns null if not logged in

  if (user) {
    redirect('/')
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-gray-200 dark:border-dark-border-subtle bg-gray dark:bg-dark-base">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-8">
          <nav className="hidden md:flex gap-6">
              <Link
                href="/signup"
                className="text-sm font-medium hover:text-purple-600"
              >
                Create account
              </Link>
              <Link
                href="/signin"
                className="text-sm font-medium hover:text-purple-600"
              >
                Login
              </Link>
            </nav>
          </div>
          
        </div>
      </header>

      <main className="flex-1">{children}</main>
    </div>
  )
}
