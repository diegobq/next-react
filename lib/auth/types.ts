export interface IAuthenticatedUser {
  uid: string
  email?: string
}

interface ISessionCookieOptions {
  maxAge: number
  httpOnly: boolean
  secure: boolean
  path: string
}

export type GetSessionCookieOptionsType = (
  maxAge: number
) => ISessionCookieOptions
