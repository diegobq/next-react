import { OptionProps } from '@/app/components/ui/Select/types'
import { getCurrentDateInfo } from '@/lib/date'

const { currentPeriod } = getCurrentDateInfo()

const START = 2019
const END = currentPeriod + 1
const length = END - START + 1

const createOption = (
  value: string,
  label: string,
  id?: string
): OptionProps<string> => ({
  id: id || `${value}`,
  value,
  label,
})

export const periodOptions: OptionProps<string>[] = [
  createOption('', 'All periods', 'all'),
].concat(
  Array.from({ length }, (_, i) => createOption(`${END - i}`, `${END - i}`))
)
