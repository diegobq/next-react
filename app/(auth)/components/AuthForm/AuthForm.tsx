'use client'

import clsx from 'clsx'
import { FC } from 'react'

import {
  Button,
  Form,
  FormError,
  FormGroup,
  FormInput,
  FormLabel,
} from '@/app/components/ui'

import { AuthFormProps } from './types'

const AuthForm: FC<AuthFormProps> = ({
  state,
  action,
  isPending,
  ctaLabel,
}) => (
  <Form action={action} className="space-y-5 sm:space-y-6">
    {state?.message && !state.success && <FormError>{state.message}</FormError>}

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

    <div>
      <Button
        variant="secondary"
        type="submit"
        className="w-full"
        isLoading={isPending}
      >
        {ctaLabel}
      </Button>
    </div>
  </Form>
)

export default AuthForm
