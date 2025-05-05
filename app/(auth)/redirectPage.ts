export const encodeRedirectPage = (redirectPage: string) =>
  encodeURIComponent(redirectPage)

export const decodeRedirectPage = (encodedRedirectPage: string) =>
  decodeURIComponent(encodedRedirectPage)
