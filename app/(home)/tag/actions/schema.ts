import { z } from 'zod'

export const TagSchema = z.object({
  id: z.string().optional(),
  title: z.string(),
  total: z.string().transform((val) => parseInt(val)),
  date: z.string(),
})
