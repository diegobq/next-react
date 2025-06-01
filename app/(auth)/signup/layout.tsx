import { PropsWithChildren } from 'react'

import { AuthFooter, AuthFormLayout, AuthHeader } from '../components'

export default function SignInLayout({ children }: PropsWithChildren) {
  return (
    <>
      <AuthHeader>Create a new account</AuthHeader>

      <AuthFormLayout>
        {children}
        <AuthFooter
          label="Already have an account? "
          href="/signin"
          linkLabel="Sign in"
        />
      </AuthFormLayout>
    </>
  )
}
