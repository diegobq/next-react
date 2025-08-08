import { TAG_PAGE } from '@/app/(auth)/constants'
import { Link } from '@/app/components/ui'

const BackCta = () => (
  <Link
    variant="ghost"
    href={TAG_PAGE}
    className="inline-flex items-center text-sm text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
  >
    ← Back to Tags
  </Link>
)

export default BackCta
