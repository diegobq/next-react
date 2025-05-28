import {
  AuthFooter,
  AuthFormWrapper,
  AuthHeader,
  AuthPageWrapper,
} from '../components'
import SigninForm from './SigninForm'

export default function SignInPage() {
  return (
    <AuthPageWrapper>
      <AuthHeader>Sign in to your account</AuthHeader>

      <AuthFormWrapper>
        <SigninForm />

        <AuthFooter
          label="Don't have an account? "
          href="/signup"
          linkLabel="Sign up"
        />
      </AuthFormWrapper>
    </AuthPageWrapper>
  )
}
