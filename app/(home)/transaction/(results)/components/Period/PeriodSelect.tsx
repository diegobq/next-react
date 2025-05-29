import { Select } from '@/app/components/ui'

import { periodOptions } from './periodOptions'
import { PeriodSelectProps } from './types'

export function PeriodSelect(props: PeriodSelectProps) {
  const { period, onChange } = props
  if (!period) {
    return null
  }
  return (
    <>
      <label
        htmlFor="period"
        className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-200"
      >
        Period
      </label>
      <Select
        id="period"
        name="period"
        ariaLabel="period"
        value={period}
        onChange={onChange}
        className="border rounded-md p-2 bg-white dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600"
        options={periodOptions}
      />
    </>
  )
}
