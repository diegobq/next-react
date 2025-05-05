'use client'

import { useEffect, useState } from 'react'
import { SelectProps } from './types'
import { useRouter, useSearchParams } from 'next/navigation'
import { DEFAULT_TRANSACTION_TYPE } from './constants'

const today = new Date()
const currentPeriod = today.getFullYear()

const periodConfig = (value: number): SelectProps => ({
  id: `${value}`,
  value,
  label: `${value}`,
})

const periodsConfig: SelectProps[] = Array.from({ length: 15 }, (_, i) =>
  periodConfig(2019 + i)
)

const typesConfig = [
  {
    id: 'buy',
    label: 'buy',
    value: 'buy',
  },
  {
    id: 'sell',
    label: 'sell',
    value: 'sell',
  },
]
const fieldsConfig = [
  {
    id: 'date',
    name: 'date',
    type: 'date',
    required: true,
  },
  {
    id: 'quantity',
    name: 'quantity',
    type: 'number',
    min: 1,
    step: '1',
    required: true,
  },
  {
    id: 'price',
    name: 'price',
    type: 'number',
    min: 1,
    step: '0.50',
    required: true,
  },
]

export default function FormPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const urlType = searchParams.get('type')

  const [form, setForm] = useState({
    type: urlType || DEFAULT_TRANSACTION_TYPE,
    date: today.toISOString().split('T')[0],
    period: currentPeriod,
    quantity: '',
    price: '',
  })

  useEffect(() => {
    if (!urlType) {
      const params = new URLSearchParams(searchParams.toString())
      if (form.type) {
        params.set('type', form.type)
        router.replace(`?${params.toString()}`)
      }
    }
  }, [])

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form data:', form)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-8 space-y-6 w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
          {form.type === 'buy' && 'Buying transaction'}
          {form.type === 'sell' && 'Selling transaction'}
          {!form.type && 'Save Data'}
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
            value={form.type}
            onChange={handleType}
            className="border rounded-md p-2 bg-white dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600"
            required
          >
            {typesConfig.map(({ id, label, value }) => (
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
            {periodsConfig.map(({ id, label, value }) => (
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
          disabled={form.type !== 'buy' && form.type !== 'sell'}
          className={`w-full py-2 rounded-md transition text-white
    ${
      form.type === 'buy'
        ? 'bg-green-600 hover:bg-green-700'
        : form.type === 'sell'
          ? 'bg-red-600 hover:bg-red-700'
          : 'bg-blue-600 hover:bg-blue-700'
    }`}
        >
          {form.type === 'buy' && 'Confirm Purchase'}
          {form.type === 'sell' && 'Confirm Sale'}
          {!form.type && 'Save'}
        </button>
      </form>
    </div>
  )
}
