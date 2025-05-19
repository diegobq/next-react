'use client'

// import toast from 'react-hot-toast'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { useActionState } from 'react'

import { ActionResponse } from '@/app/(auth)/actions/auth'
import { auth } from '@/lib/firebase'

import {
  AuthFooter,
  AuthForm,
  AuthFormWrapper,
  AuthHeader,
  AuthPageWrapper,
} from '../components'
import { HOME_PAGE, REDIRECT_PAGE } from '../constants'
import { decodeRedirectPage } from '../redirectPage'

const initialState: ActionResponse = {
  success: false,
  message: '',
  errors: undefined,
}

export default function SignUpPage() {
  const router = useRouter()

  const [state, formAction, isPending] = useActionState<
    ActionResponse | undefined,
    FormData
  >(async (_, formData: FormData) => {
    try {
      const email = formData.get('email') as string
      const password = formData.get('password') as string
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )

      if (!userCredential.user) {
        return {
          success: false,
          message: 'Signin failed. Try again.',
          errors: undefined,
        }
      }

      // toast.success('Account created successfully')
      const urlParams = new URLSearchParams(window.location.search)
      const redirectPage = urlParams.get(REDIRECT_PAGE)

      const page = redirectPage ? decodeRedirectPage(redirectPage) : HOME_PAGE
      router.push(page)
    } catch {
      return {
        success: false,
        message: 'Signin call failed. Try again.',
        errors: undefined,
      }
    }
  }, initialState)

  return (
    <AuthPageWrapper>
      <AuthHeader>Sign in to your account</AuthHeader>

      <AuthFormWrapper>
        <AuthForm
          action={formAction}
          state={state}
          isPending={isPending}
          ctaLabel="Sign in"
        />

        <AuthFooter
          label="Don't have an account? "
          href="/signup"
          linkLabel="Sign up"
        />
      </AuthFormWrapper>
    </AuthPageWrapper>
  )
}
