import { getCurrentDateInfo } from '@/lib/date'

import { OptionProps } from './types'

const { currentPeriod } = getCurrentDateInfo()

const START = 2019
const END = currentPeriod + 1
const length = END - START + 1

const createOption = (value: number, label: string): OptionProps => ({
  id: `${value}`,
  value,
  label,
})

export const periodOptions: OptionProps[] = Array.from({ length }, (_, i) =>
  createOption(END - i, `${END - i}`)
)
