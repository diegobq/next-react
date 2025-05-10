export type ActionResponse<Z> = {
  data?: Z
  success: boolean
  message: string
  errors?: Record<string, string[]>
  error?: string
}
