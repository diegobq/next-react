export default async function ResultsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 flex flex-col items-center">
      {children}
    </div>
  )
}
