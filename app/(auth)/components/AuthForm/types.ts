import { ActionResponse } from '@/app/types'

export interface AuthFormProps {
  state?: ActionResponse
  action: (payload: FormData) => void
  isPending: boolean
  ctaLabel: string
}
