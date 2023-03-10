import useTranslation from 'next-translate/useTranslation'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayout'
import SnippetsLayout from '@/layouts/SnippetsLayout'
import { PageSEO } from '@/components/SEO'


export const POSTS_PER_PAGE = 5

export async function getStaticProps({ locale, defaultLocale, locales }) {
  const otherLocale = locale !== defaultLocale ? locale : ''
  const posts = await getAllFilesFrontMatter('snippets', otherLocale)
  const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE)
  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }

  return {
    props: { initialDisplayPosts, posts, pagination, locale, availableLocales: locales },
  }
}

export default function Blog({ posts, initialDisplayPosts, pagination, locale, availableLocales }) {
  const { t } = useTranslation()
  return (
    <>
      <PageSEO
        title={`Snippets - ${siteMetadata.author}`}
        description={siteMetadata.description[locale]}
        availableLocales={availableLocales}
      />
      {/* <ListLayout
        posts={posts}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        title={t('common:all')}
      /> */}
      <SnippetsLayout
        posts={posts}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        title="Tất cả bài viết"
      />
    </>
  )
}

// export default function Snippets({ posts, initialDisplayPosts, pagination }) {
//   return (
//     <>
//       <PageSEO
//         title={`Snippets - ${siteMetadata.author}`}
//         description="Reuseable code snippets collected by Parth"
//       />
//       <SnippetsLayout
//         posts={posts}
//         initialDisplayPosts={initialDisplayPosts}
//         pagination={pagination}
//         title="All Snippets"
//       />
//     </>
//   )
// }
