import { TAG_PAGE, TRANSACTION_PAGE } from '@/app/(auth)/constants'
import { Link } from '@/app/components/ui'

import { NavLinksProps } from './types'

const navLinks = [
  { href: TAG_PAGE, label: 'Tags' },
  { href: TRANSACTION_PAGE, label: 'Transactions' },
]

export default function NavLinks(props: NavLinksProps) {
  const { onClick } = props

  return navLinks.map((link) => (
    <Link
      key={link.href}
      href={link.href}
      variant="ghost"
      className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-green-600 dark:hover:text-green-400"
      onClick={onClick}
    >
      {link.label}
    </Link>
  ))
}
