export type ActionResponse<Z = void> = {
  data?: Z
  success: boolean
  message: string
  errors?: Record<string, string[]>
  error?: string
}
