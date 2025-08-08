import { getAll } from '../../../actions'
import TagResults from './TagResults'

export default async function Results() {
  const { success, data, error } = await getAll()

  if (!success) {
    return (
      <p className="text-gray-500 dark:text-gray-300 text-center">
        {error || 'Failed to load tags.'}
      </p>
    )
  }

  if (!data) {
    return (
      <p className="text-gray-500 dark:text-gray-300 text-center">
        No tags found.
      </p>
    )
  }

  return <TagResults data={data} />
}
