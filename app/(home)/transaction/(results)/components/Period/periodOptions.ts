import { getCurrentDateInfo } from '@/lib/date'

import { OptionProps } from '../../../types'

const { currentPeriod } = getCurrentDateInfo()

const START = 2019
const END = currentPeriod + 1
const length = END - START + 1

const createOption = (
  value: string,
  label: string,
  id?: string
): OptionProps => ({
  id: id || `${value}`,
  value,
  label,
})

export const periodOptions: OptionProps[] = [
  createOption('', 'All periods', 'all'),
].concat(
  Array.from({ length }, (_, i) => createOption(`${END - i}`, `${END - i}`))
)
