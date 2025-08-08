const TagFormSkeleton = () => {
  return (
    <div className="w-full max-w-md space-y-4 animate-pulse">
      {/* BackCta Skeleton */}
      <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mb-6"></div>

      <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-8 space-y-6 w-full">
        {/* Title Skeleton */}
        <div className="h-7 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-6"></div>

        {/* Month and Period Selects Skeleton */}
        <div className="flex gap-4">
          <div className="flex flex-col flex-1 space-y-1">
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
            <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
          </div>
          <div className="flex flex-col flex-1 space-y-1">
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
            <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
          </div>
        </div>

        {/* Dynamic Fields Skeleton (e.g., 3 fields) */}
        {[...Array(3)].map((_, i) => (
          <div className="flex flex-col space-y-1" key={i}>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/3"></div>
            <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
          </div>
        ))}

        {/* Submit Button Skeleton */}
        <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded-md mt-6 py-1"></div>

        {/* Optional Remove Button Skeleton (if it's common for editing) */}
        <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded-md py-1"></div>
      </div>
    </div>
  )
}

export default TagFormSkeleton
