import { SelectProps } from './types'

export default function Select(props: SelectProps) {
  const {
    id,
    name,
    ariaLabel,
    value,
    options,
    onChange,
    className,
    required = false,
  } = props
  return (
    <select
      id={id}
      aria-label={ariaLabel}
      name={name}
      value={value}
      onChange={onChange}
      className={className}
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
