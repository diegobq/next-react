import { FlatCompat } from '@eslint/eslintrc'
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'
import nextTypescript from 'eslint-config-next/typescript'
import prettierPlugin from 'eslint-plugin-prettier'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import unusedImports from 'eslint-plugin-unused-imports'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  ...compat.extends('prettier'),
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': [
        'error',
        {
          semi: false,
          singleQuote: true,
          trailingComma: 'es5',
        },
      ],
    },
  },
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'no-console': ['error', { allow: ['error'] }],
      'sort-imports': 'off', // Disable ESLint's built-in rule
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
  },
  {
    plugins: {
      'unused-imports': unusedImports,
    },
    rules: {
      'no-unused-vars': 'off', // Disable base ESLint rule
      '@typescript-eslint/no-unused-vars': 'off', // Disable TS ESLint rule
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'error', // or 'error' if you prefer it to be an error
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
    },
  },
  {
    // Global ignores.
    // node_modules/ and .next/ are typically ignored by default by ESLint v9+
    // and/or eslint-config-next, but we are being explicit here for clarity.
    ignores: [
      'node_modules/',
      '.next/',
      'out/', // For Next.js static export output
      'build/', // For Next.js production build output (if not using 'out')
      // Ignore config files
      'next.config.ts',
    ],
  },
]

export default eslintConfig
