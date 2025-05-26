'use client'

import NextLink from 'next/link'
import React, { PropsWithChildren } from 'react'

import { cn } from '@/lib/utils'

interface LinkProps {
  href: string
  className?: string
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
}

const baseStyles =
  'inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none'

const variants = {
  primary: 'bg-green-600 text-white hover:bg-green-700 active:bg-green-800',
  secondary:
    'bg-gray-200 text-gray-900 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600',
  outline:
    'border border-gray-300 bg-transparent hover:bg-gray-100 dark:border-dark-border-medium dark:hover:bg-gray-800 dark:hover:text-gray-100 dark:text-gray-100',
  ghost:
    'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-100 dark:text-gray-100',
  danger: 'bg-red-600 text-white hover:bg-red-700',
}

const sizes = {
  sm: 'h-8 px-3 text-xs rounded-md',
  md: 'h-10 px-4 py-2 text-sm rounded-md',
  lg: 'h-12 px-6 py-3 text-base rounded-lg',
}

export function Link({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  className,
  children,
  ...props
}: PropsWithChildren<LinkProps>) {
  return (
    <NextLink
      passHref
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        isLoading && 'opacity-70 cursor-not-allowed',
        className
      )}
      {...props}
    >
      {children}
    </NextLink>
  )
}
