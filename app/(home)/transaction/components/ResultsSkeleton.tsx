const ResultsSkeleton = () => {
  return (
    <div className="w-full max-w-4xl space-y-6 animate-pulse">
      <div className="bg-gray-200 dark:bg-gray-700 p-6 rounded-lg shadow">
        <div className="h-10 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mx-auto"></div>
      </div>

      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow"
          >
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-3"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mb-3"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ResultsSkeleton
