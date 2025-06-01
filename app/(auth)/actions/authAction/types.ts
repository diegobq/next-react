export interface IAuthenticatedUser {
  uid: string
  email?: string
}

export interface ISessionCookieOptions {
  httpOnly: boolean
  secure: boolean
  path: string
}
