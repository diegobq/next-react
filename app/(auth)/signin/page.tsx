'use client'

import { useActionState } from 'react'
import { useRouter } from 'next/navigation'
// import toast from 'react-hot-toast'
import { signInWithEmailAndPassword } from 'firebase/auth'

import { ActionResponse } from '@/app/(auth)/actions/auth'
import { auth } from '@/lib/firebase'

import {
  AuthFooter,
  AuthForm,
  AuthFormWrapper,
  AuthHeader,
  AuthPageWrapper,
} from '../components'
import { HOME_PAGE } from '../constants'

const initialState: ActionResponse = {
  success: false,
  message: '',
  errors: undefined,
}

export default function SignUpPage() {
  const router = useRouter()

  // Use useActionState hook for the form submission action
  const [state, formAction, isPending] = useActionState<
    ActionResponse,
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

      // Handle successful submission
      if (userCredential.user) {
        // toast.success('Account created successfully')
        router.push(HOME_PAGE)
      }

      return {
        success: false,
        message: 'Signin failed. Try again.',
        errors: undefined,
      }
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
