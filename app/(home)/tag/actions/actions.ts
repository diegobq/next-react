'use server'

import { revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'

import { getAuthenticatedUserServer } from '@/app/(auth)/actions/authAction'
import { TAG_PAGE } from '@/app/(auth)/constants'
import { ActionResponse } from '@/app/types'
import { getAvailableTags, getTag, saveTag } from '@/lib/dal/tag'
import { GET_AVAILABLE_TAGS_TAG } from '@/lib/dal/tags'

import { TagSchema } from './schema'
import { TagProps } from './types'

async function update(
  tx: TagProps,
  uid: string
): Promise<ActionResponse<TagProps>> {
  try {
    const data = await saveTag(tx, uid)
    if (!data) {
      return {
        success: false,
        message: 'An error occurred while saving the transaction',
        error: 'Failed to save transaction',
      }
    }
  } catch (error) {
    console.error('Transaction save error:', error)
    return {
      success: false,
      message: 'Unexpected error occurred while saving the transaction',
      error: 'Failed to save transaction',
    }
  }

  revalidateTag(GET_AVAILABLE_TAGS_TAG)
  redirect(TAG_PAGE)
}

export async function save(
  formData: FormData
): Promise<ActionResponse<TagProps>> {
  const { uid } = await getAuthenticatedUserServer()

  const data = {
    id: formData.get('id') as string,
    title: formData.get('title') as string,
    date: formData.get('date') as string,
    total: formData.get('total') as string,
  }

  const { data: tx, success, error } = TagSchema.safeParse(data)

  if (!success) {
    return {
      success: false,
      message: 'Tag error',
      errors: error.flatten().fieldErrors,
    }
  }

  return update(tx, uid)
}

export async function remove(tx: TagProps): Promise<ActionResponse<TagProps>> {
  const { uid } = await getAuthenticatedUserServer()

  return update(tx, uid)
}

export async function get(id: string): Promise<ActionResponse<TagProps>> {
  await getAuthenticatedUserServer()
  try {
    if (!id) {
      return {
        success: true,
        message: 'new tag',
      }
    }

    const transaction = await getTag(id)

    if (!transaction) {
      return {
        data: undefined,
        success: false,
        message: 'not found tag',
      }
    }

    return {
      data: transaction,
      success: true,
      message: 'get tag',
    }
  } catch (error) {
    console.error('get tag error:', error)
    return {
      success: false,
      message: 'An error occurred while getting the tag',
      error: 'Failed to get tag',
    }
  }
}

export async function getAll(): Promise<ActionResponse<TagProps[]>> {
  const { uid } = await getAuthenticatedUserServer()

  return getAvailableTags(uid)
    .then((data) => ({
      data,
      success: true,
      message: 'Transactions saved',
    }))
    .catch((error) => {
      console.error('get transactions error:', error)
      return {
        success: false,
        message: 'An error occurred while getting the transactions',
        error: 'Failed to get transactions',
      }
    })
}
