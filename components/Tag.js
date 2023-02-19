import Link from 'next/link'
import kebabCase from '@/lib/utils/kebabCase'

const Tag = ({ text }) => {
  return (
    <Link href={`/tags/${kebabCase(text)}`}>
      <a className="mr-3 relative overflow-hidden tag p-1 text-xs font-medium transition-all duration-100 hover:scale-95 text-white opacity-90 hover:opacity-100">
        {text.split(' ').join('-')}
      </a>
    </Link>
  )
}

export default Tag
