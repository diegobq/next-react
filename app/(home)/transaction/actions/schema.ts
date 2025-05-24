import { z } from 'zod'

export const TransactionSchema = z.object({
  type: z.enum(['buy', 'sell']),
  date: z.string(),
  period: z.string().transform((val) => {
    const num = parseInt(val, 10)
    if (!/^\d{4}$/.test(val)) throw new Error('Period must be a 4-digit year')
    return num
  }),
  month: z.string().transform((val) => {
    const num = parseInt(val, 10)
    if (isNaN(num) || num < 0 || num > 11)
      throw new Error('Month must be between 0 (Jan) and 11 (Dec)')
    return num
  }),
  quantity: z.string().transform((val) => parseFloat(val)),
  price: z.string().transform((val) => parseFloat(val)),
})
