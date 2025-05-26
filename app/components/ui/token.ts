type VariantType = {
  [key in 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger']: string
}

export const variants: VariantType = {
  primary: 'bg-green-600 text-white hover:bg-green-700 active:bg-green-800',
  secondary:
    'bg-gray-200 text-gray-900 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600',
  outline:
    'border border-gray-300 bg-transparent hover:bg-gray-100 dark:border-dark-border-medium dark:hover:bg-gray-800 dark:hover:text-gray-100 dark:text-gray-100',
  ghost:
    'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-100 dark:text-gray-100',
  danger: 'bg-red-600 text-white hover:bg-red-700',
}
