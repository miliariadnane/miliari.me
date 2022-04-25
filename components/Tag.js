import Link from 'next/link'
import kebabCase from '@/lib/utils/kebabCase'

const Tag = ({ text }) => {
  return (
    <Link href={`/tags/${kebabCase(text)}`}>
      <a className="mr-3 text-sm font-medium uppercase text-sky-500 hover:text-sky-600 dark:hover:text-sky-400">
        {text.split(' ').join('-')}
      </a>
    </Link>
  )
}

export default Tag
