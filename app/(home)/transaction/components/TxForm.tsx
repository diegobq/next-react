'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useActionState, useState } from 'react'

import { Form } from '@/app/components/ui/Form'
import { ActionResponse } from '@/app/types'

import { save } from '../actions'
import { fieldsConfig, months, typesConfig } from '../constants'
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
  const router = useRouter()
  const searchParams = useSearchParams()

  const { tx } = params
  const [form, setForm] = useState(tx)
  const [formError, setFormError] = useState('')

  const [, formAction, isPending] = useActionState<
    ActionResponse<TransactionProps>,
    FormData
  >(async (prevState: ActionResponse<TransactionProps>, formData: FormData) => {
    try {
      const result = await save(formData)

      // Handle successful submission
      if (result.success) {
        // router.push('/transaction')
        console.error('guardado')
      } else {
        setFormError(result.error || 'An error occurred')
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

  const { type } = form

  const handleType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set('type', value)
    } else {
      params.delete('type')
    }
    router.replace(`?${params.toString()}`)
    handleChange(e)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md space-y-4">
        <BackCta period={form.period} />
        {formError && (
          <div className="text-red-600 dark:text-red-400 text-sm font-medium mb-2">
            {formError}
          </div>
        )}
        <Form
          action={formAction}
          className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-8 space-y-6 w-full max-w-md"
        >
          <input type="hidden" name="id" value={form.id} />
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
            {type === 'buy' && 'Buying transaction'}
            {type === 'sell' && 'Selling transaction'}
            {!type && 'Save Data'}
          </h2>

          <div className="flex flex-col">
            <label
              htmlFor="type"
              className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Type
            </label>
            <select
              id="type"
              name="type"
              value={type}
              onChange={handleType}
              className="border rounded-md p-2 bg-white dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600"
              required
            >
              {Object.values(typesConfig).map(({ id, label, value }) => (
                <option key={id} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
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

          <div className="flex flex-col">
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
            {type === 'buy' && 'Confirm Purchase'}
            {type === 'sell' && 'Confirm Sale'}
            {!type && 'Save'}
          </button>
        </Form>
      </div>
    </div>
  )
}
