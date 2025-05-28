'use client'

import { signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { useActionState } from 'react'
import toast from 'react-hot-toast'

import { ActionResponse } from '@/app/types'
import { auth } from '@/lib/firebase'

import { createSession } from '../actions'
import { AuthForm } from '../components'
import {
  FIREBASE_AUTH_USER_DISABLED,
  HOME_PAGE,
  REDIRECT_PAGE,
} from '../constants'
import { decodeRedirectPage } from '../redirectPage'

const initialState: ActionResponse = {
  success: false,
  message: '',
  errors: undefined,
}

export default function SigninForm() {
  const router = useRouter()

  const [state, formAction, isPending] = useActionState<
    ActionResponse,
    FormData
  >(async (_, formData: FormData) => {
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    return signInWithEmailAndPassword(auth, email, password)
      .then(async ({ user }) => {
        return createSession(await user.getIdToken())
      })
      .then(({ success }) => {
        if (!success) {
          throw new Error('Signin failed')
        }

        toast.success('Signed in successfully!')
        const urlParams = new URLSearchParams(window.location.search)
        const redirectPage = urlParams.get(REDIRECT_PAGE)

        const page = redirectPage ? decodeRedirectPage(redirectPage) : HOME_PAGE
        router.push(page)
        return {
          success: true,
          message: 'Signed in successfully!',
        }
      })
      .catch((error) => {
        const message =
          error.code === FIREBASE_AUTH_USER_DISABLED
            ? 'Your account is disabled.'
            : 'Signin failed'

        toast.error(message)
        return {
          success: false,
          message,
        }
      })
  }, initialState)

  return (
    <AuthForm
      action={formAction}
      state={state}
      isPending={isPending}
      ctaLabel="Sign in"
    />
  )
}
