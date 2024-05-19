'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import React from 'react'
import { ModeToggle } from './mode-toggle'
import { Button } from './ui/button'

export default function Header() {
  // We can use session to check someone is logged in or not
  const session = useSession()
  return (
    <header>
      <div>
        {session.data ? (
          <Button onClick={() => signOut()}>Sign Out</Button>
        ) : (
          <Button onClick={() => signIn('google')}>Sign In</Button>
        )}
        {session.data?.user?.name}
        <ModeToggle />
      </div>
    </header>
  )
}
