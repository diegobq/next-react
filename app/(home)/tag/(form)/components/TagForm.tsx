'use client'

import { useActionState, useState } from 'react'
import toast from 'react-hot-toast'

import { Button, Form } from '@/app/components/ui'
import { ActionResponse } from '@/app/types'

import { remove, save } from '../../actions'
import { TagProps } from '../../actions/types'
import BackCta from './BackCta'
import { fieldsConfig } from './constants'
import { TxFormProps } from './types'

const initialState: ActionResponse<TagProps> = {
  success: false,
  message: '',
  errors: undefined,
}

export default function TxForm(params: TxFormProps) {
  const [isRemoving, setIsRemoving] = useState(false)
  const { tx } = params
  const [form, setForm] = useState(tx)

  const isEditing = !!form.id

  const onRemove = async () => {
    if (!form.id) return
    if (
      !window.confirm(
        `Are you sure you want to remove this tag? This action cannot be undone.`
      )
    ) {
      return
    }

    setIsRemoving(true)
    const { success } = await remove(form)
    if (success === false) {
      toast.error('Failed to remove transaction.')
    }
    setIsRemoving(false)
  }

  const [, formAction, isPending] = useActionState<
    ActionResponse<TagProps>,
    FormData
  >(async (_, formData) => {
    const result = await save(formData)

    if (result.success === false) {
      toast.error(result.message)
    }

    return result
  }, initialState)
  const disabled = isPending || isRemoving

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  return (
    <>
      <BackCta />
      <Form
        action={formAction}
        className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-8 space-y-6 w-full max-w-md"
      >
        <input type="hidden" name="id" value={form.id} />
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
          Tag
        </h2>

        {fieldsConfig.map(({ id, name, type, min, step, required }) => (
          <div className="flex flex-col" key={id}>
            <label
              htmlFor={name}
              className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-200 capitalize"
            >
              {name}
            </label>
            <input
              type={type}
              id={id}
              name={name}
              value={form[name as keyof typeof form]}
              onChange={handleChange}
              className="border rounded-md p-2"
              min={min}
              step={step}
              required={!!required}
            />
          </div>
        ))}

        <Button
          type="submit"
          variant="primary"
          disabled={disabled}
          isLoading={isPending}
          className="w-full py-1"
        >
          Save
        </Button>
        {isEditing && (
          <Button
            type="button"
            variant="secondary"
            disabled={disabled}
            isLoading={isRemoving}
            onClick={onRemove}
            className="w-full py-1"
          >
            Delete
          </Button>
        )}
      </Form>
    </>
  )
}
