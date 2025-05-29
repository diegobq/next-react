import { cn } from '@/lib/utils'

import { SelectProps } from './types'

const variants = {
  primary:
    'bg-white dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600',
  secondary:
    'bg-gray-200 text-gray-900 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600',
  outline:
    'border border-gray-300 bg-transparent hover:bg-gray-100 dark:border-dark-border-medium dark:hover:bg-gray-800 dark:hover:text-gray-100 dark:text-gray-100',
  ghost:
    'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-100 dark:text-gray-100',
  danger: 'bg-red-600 text-white hover:bg-red-700',
}

export default function Select(props: SelectProps) {
  const {
    id,
    name,
    ariaLabel,
    value,
    options,
    onChange,
    className,
    variant = 'primary',
    required = false,
  } = props
  return (
    <select
      id={id}
      aria-label={ariaLabel}
      name={name}
      value={value}
      onChange={onChange}
      className={cn(variants[variant], className)}
      required={required}
    >
      {options.map(({ id, label, value }) => (
        <option key={id} value={value}>
          {label}
        </option>
      ))}
    </select>
  )
}
