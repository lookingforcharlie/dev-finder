'use client'

import { ThemeProvider } from '@/components/Theme-provider'
import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'

export function Providers({
  children,
}: // session,
{
  children: React.ReactNode
  // session: Session
}) {
  return (
    <SessionProvider>
      <ThemeProvider
        attribute='class'
        defaultTheme='system'
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </SessionProvider>
  )
}
