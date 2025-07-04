'use client'

import { useActionState, useState } from 'react'
import toast from 'react-hot-toast'

import { Button, Form, Select } from '@/app/components/ui'
import { OptionProps } from '@/app/components/ui/Select/types'
import { ActionResponse } from '@/app/types'

import { remove, save } from '../../actions'
import { TransactionProps } from '../../actions/types'
import { months, statuses, TxTypes } from '../../constants'
import { fieldsConfig } from '../constants'
import BackCta from './BackCta'
import { PeriodSelect } from './PeriodSelect'
import { TxFormProps } from './types'

const initialState: ActionResponse<TransactionProps> = {
  success: false,
  message: '',
  errors: undefined,
}

const selectConfig = (value: string, label: string): OptionProps<string> => ({
  id: `${value}`,
  value,
  label,
})

const monthsConfig: OptionProps<string>[] = Array.from({ length: 12 }, (_, i) =>
  selectConfig(`${i}`, months[i])
)

const statusConfig: OptionProps<string>[] = Object.values(statuses).map(
  ({ value, label }) => selectConfig(value, label)
)

export default function TxForm(params: TxFormProps) {
  const [isRemoving, setIsRemoving] = useState(false)
  const { tx } = params
  const [form, setForm] = useState(tx)
  const { type } = form

  const isBuying = type === TxTypes.BUY
  const isEditing = !!form.id
  const txActionLabel = isEditing ? 'Edit' : 'Confirm'
  const txTypeLabel = type === TxTypes.BUY ? 'Purchase' : 'Sale'
  const ctaLabel = `${txActionLabel} ${txTypeLabel}`
  const removeLabel = `Remove ${txTypeLabel}`

  const onRemove = async () => {
    if (!form.id) return
    if (
      !window.confirm(
        `Are you sure you want to remove this ${txTypeLabel.toLowerCase()}? This action cannot be undone.`
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
    ActionResponse<TransactionProps>,
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
            <Select
              id="month"
              name="month"
              ariaLabel="month"
              value={`${form.month}`}
              options={monthsConfig}
              onChange={handleChange}
              className="border rounded-md p-2"
              required
            />
          </div>

          <div className="flex flex-col flex-1">
            <PeriodSelect period={`${form.period}`} onChange={handleChange} />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <label
            htmlFor="status"
            className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            Status
          </label>
          <Select
            id="status"
            name="status"
            ariaLabel="status"
            value={`${form.status}`}
            options={statusConfig}
            onChange={handleChange}
            className="border rounded-md p-2"
            required
          />
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
              className="border rounded-md p-2"
              min={min}
              step={step}
              required={!!required}
            />
          </div>
        ))}

        <Button
          type="submit"
          variant={isBuying ? 'primary' : 'danger'}
          disabled={disabled}
          isLoading={isPending}
          className="w-full py-1"
        >
          {ctaLabel}
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
            {removeLabel}
          </Button>
        )}
      </Form>
    </>
  )
}
