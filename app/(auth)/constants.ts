import { SkipAuthPathnames } from './types'

const SIGNUP = '/signup'
const SIGNIN = '/signin'
export const TRANSACTION_PAGE = '/transaction'
export const DEFAULT_AUTH_PAGE = SIGNIN
export const HOME_PAGE = '/'
export const REDIRECT_PAGE = 'redirect'

export const SKIP_AUTH_PATHNAME: SkipAuthPathnames = {}
SKIP_AUTH_PATHNAME[SIGNIN] = true
SKIP_AUTH_PATHNAME[SIGNUP] = true
