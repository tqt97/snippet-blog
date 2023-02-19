import Card from '@/components/Card'
import Link from '@/components/Link'
import NewsletterForm from '@/components/NewsletterForm'
import { PageSEO } from '@/components/SEO'
import Tag from '@/components/Tag'
import Typewriter from 'typewriter-effect'
import dynamic from 'next/dynamic'
import formatDate from '@/lib/utils/formatDate'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import siteMetadata from '@/data/siteMetadata'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'

const HeroEffect = dynamic(() => import('@/components/HeroEffect'), { ssr: false })
const UnchartedRing = dynamic(() => import('@/components/UnchartedRing'), { ssr: false })

const MAX_DISPLAY = 3

export async function getStaticProps({ locale, defaultLocale, locales }) {
  const otherLocale = locale !== defaultLocale ? locale : ''
  const posts = await getAllFilesFrontMatter('blog', otherLocale)

  return { props: { posts, locale, availableLocales: locales } }
}

export default function Home({ posts, locale, availableLocales }) {
  const { t } = useTranslation()
  const router = useRouter()


  return (
    <>
      <PageSEO
        title={siteMetadata.title[locale]}
        description={siteMetadata.description[locale]}
        availableLocales={availableLocales}
      />
      <div className="relative pb-12 pt-2 text-center sm:pb-14 sm:pt-3">
        {/* <div className="absolute inset-x-0 top-0 -z-20 m-auto h-full">
          <HeroEffect />
        </div>
        <div className="h-52">
          <UnchartedRing />
        </div> */}
        <h1 className="py-3 text-xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-3xl xl:text-6xl md:leading-14">
          {/* {t('common:hi')} <span className="animate-fade-text">a</span>
          <span> Web</span> <span className="animate-fade-text"> developer</span>
          {`~${router.asPath}`}{' '} */}
          <Typewriter
            options={{
              strings: [`${t('common:hi')} Tuấn`],
              autoStart: true,
              loop: true,
            }}
          />
        </h1>

        <p className="px-2 text-xl font-light leading-6 text-gray-500 dark:text-gray-400 sm:px-6 xl:px-0">
          {t('common:mini-bio')}
        </p>
      </div>
      <div>
        <div>
          {/* <div className="pb-2 w-full flex flex-wrap">
            <Card
              title={t('common:learning')}
              description={t('learning:description')}
              href={'/learning'}
              className="py-4 md:px-4"
            />
            <Card
              title={t('common:about')}
              description={t('common:about-description')}
              href={'/about'}
              className="py-4 md:px-4"
            />
          </div> */}
          <ul className="divide-y divide-transparent md:px-4">
            {!posts.length && t('common:No-posts-found')}
            {posts.slice(0, MAX_DISPLAY).map((frontMatter) => {
              const { slug, date, title, summary, tags } = frontMatter
              return (
                <li key={slug} className="">
                  <article>
                    <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                      <dl>
                        <dt className="sr-only">{t('common:pub')}</dt>
                        <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                          <time dateTime={date}>{formatDate(date, locale)}</time>
                        </dd>
                      </dl>
                      <div className="relative space-y-3 xl:col-span-3 sm:border-l sm:border-gray-200 dark:border-gray-700 p-5">
                        <div className="space-y-6">
                          <div className='ml-4'>
                            <div>
                              <div className="hidden sm:block absolute w-3 h-3 bg-gray-300 rounded-full mt-2 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-300"></div>
                              <h2 className="text-2xl font-bold leading-8 tracking-tight">
                                <Link
                                  href={`/blog/${slug}`}
                                  className="text-gray-900 dark:text-gray-100"
                                >
                                  {title}
                                </Link>
                              </h2>
                              <div className="flex flex-wrap">
                                {tags.map((tag) => (
                                  <Tag key={tag} text={tag} />
                                ))}
                              </div>
                            </div>
                            <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                              {summary}
                            </div>
                        <div className="mt-2 text-base font-medium leading-6">
                          <Link
                            href={`/blog/${slug}`}
                            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                            aria-label={`Read "${title}"`}
                          >
                            {t('common:more')} &rarr;
                          </Link>
                        </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                </li>
              )
            })}
          </ul>
        </div>
        {posts.length > MAX_DISPLAY && (
          <div className="flex justify-end text-base font-medium leading-6">
            <Link
              href="/blog"
              className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
              aria-label="all posts"
            >
              {t('common:all')} &rarr;
            </Link>
          </div>
        )}
        {siteMetadata.newsletter.provider !== '' && (
          <div className="flex items-center justify-center pt-4">
            <NewsletterForm title={t('newsletter:title')} />
          </div>
        )}
      </div>
    </>
  )
}
