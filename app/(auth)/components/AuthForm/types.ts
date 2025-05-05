import { ActionResponse } from '@/app/(auth)/actions/auth'

export interface AuthFormProps {
  state?: ActionResponse
  action: (payload: FormData) => void
  isPending: boolean
  ctaLabel: string
}
