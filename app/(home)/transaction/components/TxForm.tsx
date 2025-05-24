'use client'

import { useActionState, useState } from 'react'
import toast from 'react-hot-toast'

import { Form } from '@/app/components/ui/Form'
import { ActionResponse } from '@/app/types'

import { save } from '../actions'
import { fieldsConfig, months, TxTypes } from '../constants'
import { periodOptions } from '../periodOptions'
import { OptionProps, TransactionProps } from '../types'
import BackCta from './BackCta'
import { TxFormProps } from './types'

const initialState: ActionResponse<TransactionProps> = {
  success: false,
  message: '',
  errors: undefined,
}

const selectConfig = (value: number, label: string): OptionProps => ({
  id: `${value}`,
  value,
  label,
})

const monthsConfig: OptionProps[] = Array.from({ length: 12 }, (_, i) =>
  selectConfig(i, months[i])
)

export default function TxForm(params: TxFormProps) {
  const { tx } = params
  const [form, setForm] = useState(tx)
  const { type } = form
  const txActionLabel = form.id ? 'Edit' : 'Confirm'
  const txTypeLabel = type === TxTypes.BUY ? 'Purchase' : 'Sale'
  const ctaLabel = `${txActionLabel} ${txTypeLabel}`

  const [, formAction, isPending] = useActionState<
    ActionResponse<TransactionProps>,
    FormData
  >(async (prevState: ActionResponse<TransactionProps>, formData: FormData) => {
    try {
      const result = await save(formData)

      if (result.success) {
        toast.success(result.message)
      } else {
        toast.error(result.message)
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  return (
    <>
      <BackCta period={form.period} />
      <Form
        action={formAction}
        className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-8 space-y-6 w-full max-w-md"
      >
        <input type="hidden" name="id" value={form.id} />
        <input type="hidden" name="type" value={form.type} />
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
          {type === 'buy' && 'Buying transaction'}
          {type === 'sell' && 'Selling transaction'}
          {!type && 'Save Data'}
        </h2>

        <div className="flex gap-4">
          <div className="flex flex-col flex-1">
            <label
              htmlFor="month"
              className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Month
            </label>
            <select
              id="month"
              name="month"
              value={form.month}
              onChange={handleChange}
              className="border rounded-md p-2 bg-white dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600"
              required
            >
              {monthsConfig.map(({ id, label, value }) => (
                <option key={id} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col flex-1">
            <label
              htmlFor="period"
              className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Period
            </label>
            <select
              id="period"
              name="period"
              value={form.period}
              onChange={handleChange}
              className="border rounded-md p-2 bg-white dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600"
              required
            >
              {periodOptions.map(({ id, label, value }) => (
                <option key={id} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>

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
              className="border rounded-md p-2 bg-white dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600"
              min={min}
              step={step}
              required={!!required}
            />
          </div>
        ))}

        <button
          type="submit"
          disabled={isPending}
          className={`w-full py-2 rounded-md transition text-white
    ${
      type === 'buy'
        ? 'bg-green-600 hover:bg-green-700'
        : type === 'sell'
          ? 'bg-red-600 hover:bg-red-700'
          : 'bg-blue-600 hover:bg-blue-700'
    }`}
        >
          {ctaLabel}
        </button>
      </Form>
    </>
  )
}
