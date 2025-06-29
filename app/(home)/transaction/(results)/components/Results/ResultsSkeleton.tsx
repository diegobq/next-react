const ResultsSkeleton = () => {
  return (
    <div className="w-full max-w-2xl space-y-4 animate-pulse">
      {/* Placeholder for top total */}
      <div className="h-7 w-24 mx-auto bg-gray-300 dark:bg-gray-700 rounded"></div>

      {/* Placeholder for filter buttons */}
      <div className="flex justify-center gap-4">
        <div className="h-10 w-28 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
        <div className="h-10 w-28 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
      </div>

      {/* Placeholder for the list of cards */}
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="flex flex-col justify-between p-4 rounded-lg shadow-md bg-white dark:bg-gray-800 min-h-[120px]"
          >
            {/* Top Row */}
            <div className="flex justify-between items-start w-full">
              <div className="flex-1" />
              <div className="flex-1 flex justify-center">
                <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-1/3"></div>
              </div>
              <div className="flex-1 flex justify-end">
                <div className="h-6 w-20 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
              </div>
            </div>

            {/* Bottom Row */}
            <div className="flex justify-between items-start w-full">
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
              <div className="w-1/3 space-y-2">
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full ml-auto"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 ml-auto"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ResultsSkeleton
