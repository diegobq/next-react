'use client'

// import toast from 'react-hot-toast'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { useActionState } from 'react'

import { ActionResponse } from '@/app/types'
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
      const userCredential = await createUserWithEmailAndPassword(
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
        message: 'Signup failed. Try again.',
        errors: undefined,
      }
    } catch {
      return {
        success: false,
        message: 'Signup call failed. Try again.',
        errors: undefined,
      }
    }
  }, initialState)

  return (
    <AuthPageWrapper>
      <AuthHeader>Create a new account</AuthHeader>

      <AuthFormWrapper>
        <AuthForm
          action={formAction}
          state={state}
          isPending={isPending}
          ctaLabel="Sign up"
        />

        <AuthFooter
          label="Already have an account? "
          href="/signin"
          linkLabel="Sign in"
        />
      </AuthFormWrapper>
    </AuthPageWrapper>
  )
}
