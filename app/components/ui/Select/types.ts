interface OptionProps<V> {
  id: string
  value: V
  label: string
}

export interface SelectProps<V = string> {
  id: string
  name: string
  ariaLabel: string
  value: V
  required?: boolean
  className?: string
  options: OptionProps<V>[]
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}
