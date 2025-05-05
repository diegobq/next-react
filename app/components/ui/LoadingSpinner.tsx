export function LoadingSpinner({
  size = 'h-12 w-12',
  color = 'text-blue-500',
}: {
  size?: string
  color?: string
}) {
  return (
    <div className="flex justify-center items-center h-screen">
      <svg
        className={`animate-spin ${size} ${color}`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 50 50"
        fill="none"
      >
        <circle
          className="opacity-25"
          cx="25"
          cy="25"
          r="20"
          stroke="currentColor"
          strokeWidth="5"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M25 5c-.5 0-.9.4-.9.9v8.4h-8.4c-.5 0-.9.4-.9.9s.4.9.9.9h8.4v8.4c0 .5.4.9.9.9s.9-.4.9-.9v-8.4h8.4c.5 0 .9-.4.9-.9s-.4-.9-.9-.9h-8.4V5c0-.5-.4-.9-.9-.9z"
        ></path>
      </svg>
    </div>
  )
}
