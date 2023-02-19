import '@/css/tailwind.css'
import '@/css/prism.css'
import '@/css/extra.css'

import Analytics from '@/components/analytics'
import { ClientReload } from '@/components/ClientReload'
import { Globals } from '@react-spring/shared'
import Head from 'next/head'
import LayoutWrapper from '@/components/LayoutWrapper'
import RSS from '@/components/Rss'
import { ThemeProvider } from 'next-themes'

const isDevelopment = process.env.NODE_ENV === 'development'
const isSocket = process.env.SOCKET

export default function App({ Component, pageProps, router }) {
  // https://github.com/pmndrs/react-spring/issues/1586
  console.warn = function () {}

  Globals.assign({
    frameLoop: 'always',
  })

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      {isDevelopment && isSocket && <ClientReload />}
      <Analytics />
      <LayoutWrapper>
        <Component {...pageProps} key={router.route} />
      </LayoutWrapper>
      <RSS />
    </ThemeProvider>
  )
}
