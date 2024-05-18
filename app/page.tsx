import './globals.css'
import type {ReactNode} from 'react'
import Layout from '@/feature/layout/component/Layout'
import {Metadata} from 'next'
import clsx from 'clsx'
import {Providers} from './Providers'

export const viewport = {
  themeColor: [
    {media: '(prefers-color-scheme: light)', color: 'white'},
    {media: '(prefers-color-scheme: dark)', color: 'black'},
  ],
}

export const metadata: Metadata = {
  title: {
    default: 'Asdf',
  },
  description: 'asdf',
}

const RootLayout = async ({children}: {children: ReactNode}) => (
  <html lang="en" suppressHydrationWarning>
    <body className={clsx('min-h-screen bg-background font-sans antialiased')}>
      <Providers themeProps={{attribute: 'class', defaultTheme: 'dark'}}>
        <Layout>{children}</Layout>
      </Providers>
    </body>
  </html>
)
export default RootLayout
