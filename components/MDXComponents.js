import { BlogNewsletterForm } from './NewsletterForm'
import CustomLink from './Link'
import Image from './Image'
import Pre from './Pre'
// import { Spotify } from 'mdx-embed'
import TOCInline from './TOCInline'
import { getMDXComponent } from 'mdx-bundler/client'
/* eslint-disable react/display-name */
import { useMemo } from 'react'

export const MDXComponents = {
  Image,
  // Spotify,
  TOCInline,
  a: CustomLink,
  pre: Pre,
  BlogNewsletterForm: BlogNewsletterForm,
  wrapper: ({ components, layout, ...rest }) => {
    const Layout = require(`../layouts/${layout}`).default
    return <Layout {...rest} />
  },
}

export const MDXLayoutRenderer = ({ layout, mdxSource, ...rest }) => {
  const MDXLayout = useMemo(() => getMDXComponent(mdxSource), [mdxSource])

  return <MDXLayout layout={layout} components={MDXComponents} {...rest} />
}
