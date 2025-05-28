import { SkipAuthPathnames } from './types'

const SIGNUP = '/signup'
const SIGNIN_PAGE = '/signin'
export const TRANSACTION_PAGE = '/transaction'
export const DEFAULT_AUTH_PAGE = SIGNIN_PAGE
export const HOME_PAGE = '/'
export const REDIRECT_PAGE = 'redirect'

export const SKIP_AUTH_PATHNAME: SkipAuthPathnames = {}
SKIP_AUTH_PATHNAME[SIGNIN_PAGE] = true
SKIP_AUTH_PATHNAME[SIGNUP] = true

export const FIREBASE_AUTH_USER_DISABLED = 'auth/user-disabled'
