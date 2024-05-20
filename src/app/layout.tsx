import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import NextTopLoader from 'nextjs-toploader'
import Header from '../components/Header'
import './globals.css'
import { Providers } from './provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Dev Finder',
  description: 'Find a Dev to pair-programming by sharing the repo and screen',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    // suppressHydrationWarning: what's this for?
    <html lang='en' suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          {/* implement loading effect in the navbar */}
          <NextTopLoader height={3} showSpinner={false} />
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  )
}
