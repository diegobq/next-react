const ResultsSkeleton = () => {
  return (
    <div className="w-full max-w-4xl space-y-6 animate-pulse">
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow"
          >
            <div className="flex justify-between">
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/8 mb-3"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/8 mb-3"></div>
            </div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4 mb-3"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ResultsSkeleton
