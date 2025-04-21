'use client'

import { useActionState } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/app/components/ui/Button'
import {
  Form,
  FormGroup,
  FormLabel,
  FormInput,
  FormError,
} from '@/app/components/ui/Form'
import Link from 'next/link'
// import toast from 'react-hot-toast'
import { signUp, ActionResponse } from '@/app/(auth)/actions/auth'
import clsx from 'clsx'

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
  >(async (prevState: ActionResponse, formData: FormData) => {
    try {
      const result = await signUp(formData)

      // Handle successful submission
      if (result.success) {
        // toast.success('Account created successfully')
        router.push('/')
      }

      return result
    } catch (err) {
      return {
        success: false,
        message: (err as Error).message || 'An error occurred',
        errors: undefined,
      }
    }
  }, initialState)

  return (
    <div className="min-h-screen flex flex-col justify-center px-4 py-8 bg-gray-50 dark:bg-[#121212] sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-sm sm:max-w-md">
        <h2 className="mt-2 text-center text-2xl font-bold text-gray-900 dark:text-white">
          Create a new account
        </h2>
      </div>

      <div className="mt-8 mx-auto w-full max-w-sm sm:max-w-md">
        <div className="bg-white dark:bg-[#1A1A1A] py-6 px-4 sm:px-6 sm:py-8 shadow-md sm:rounded-2xl border border-gray-200 dark:border-dark-border-subtle">
          <Form action={formAction} className="space-y-5 sm:space-y-6">
            {state?.message && !state.success && (
              <FormError>{state.message}</FormError>
            )}

            <FormGroup>
              <FormLabel htmlFor="email">Email</FormLabel>
              <FormInput
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                disabled={isPending}
                aria-describedby="email-error"
                className={clsx(
                  'w-full transition focus:ring-2 focus:ring-primary focus:border-primary',
                  state?.errors?.email && 'border-red-500'
                )}
              />
              {state?.errors?.email && (
                <p id="email-error" className="text-sm text-red-500 mt-1">
                  {state.errors.email[0]}
                </p>
              )}
            </FormGroup>

            <FormGroup>
              <FormLabel htmlFor="password">Password</FormLabel>
              <FormInput
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                disabled={isPending}
                aria-describedby="password-error"
                className={clsx(
                  'w-full transition focus:ring-2 focus:ring-primary focus:border-primary',
                  state?.errors?.password && 'border-red-500'
                )}
              />
              {state?.errors?.password && (
                <p id="password-error" className="text-sm text-red-500 mt-1">
                  {state.errors.password[0]}
                </p>
              )}
            </FormGroup>

            <FormGroup>
              <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
              <FormInput
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                disabled={isPending}
                aria-describedby="confirmPassword-error"
                className={clsx(
                  'w-full transition focus:ring-2 focus:ring-primary focus:border-primary',
                  state?.errors?.confirmPassword && 'border-red-500'
                )}
              />
              {state?.errors?.confirmPassword && (
                <p
                  id="confirmPassword-error"
                  className="text-sm text-red-500 mt-1"
                >
                  {state.errors.confirmPassword[0]}
                </p>
              )}
            </FormGroup>

            <div>
              <Button type="submit" className="w-full" isLoading={isPending}>
                Sign up
              </Button>
            </div>
          </Form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
              <Link
                href="/signin"
                className="font-medium text-primary hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
