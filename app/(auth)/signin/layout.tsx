import { PropsWithChildren } from 'react'

import { AuthFooter, AuthFormLayout, AuthHeader } from '../components'

export default function SignInLayout({ children }: PropsWithChildren) {
  return (
    <>
      <AuthHeader>Sign in to your account</AuthHeader>

      <AuthFormLayout>
        {children}
        <AuthFooter
          label="Don't have an account? "
          href="/signup"
          linkLabel="Sign up"
        />
      </AuthFormLayout>
    </>
  )
}
