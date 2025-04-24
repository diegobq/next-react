'use client'

import { useActionState } from 'react'
import { useRouter } from 'next/navigation'
// import toast from 'react-hot-toast'
import { createUserWithEmailAndPassword } from 'firebase/auth'

import { ActionResponse } from '@/app/(auth)/actions/auth'
import { auth } from '@/lib/firebase'

import AuthHeader from '../components/AuthHeader'
import AuthFooter from '../components/AuthFooter'
import AuthForm from '../components/AuthForm'

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
        router.push('/signin')
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
    <div className="min-h-screen flex flex-col justify-center px-4 py-8 bg-gray-50 dark:bg-[#121212] sm:px-6 lg:px-8">
      <AuthHeader>Create a new account</AuthHeader>

      <div className="mt-8 mx-auto w-full max-w-sm sm:max-w-md">
        <div className="bg-white dark:bg-[#1A1A1A] py-6 px-4 sm:px-6 sm:py-8 shadow-md sm:rounded-2xl border border-gray-200 dark:border-dark-border-subtle">
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
        </div>
      </div>
    </div>
  )
}
