'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import React from 'react'
import { ModeToggle } from './mode-toggle'

export default function Header() {
  // We can use session to check someone is logged in or not
  const session = useSession()
  return (
    <header>
      <div>
        {session.data ? (
          <button onClick={() => signOut()}>Sign Out</button>
        ) : (
          <button onClick={() => signIn('google')}>Sign In</button>
        )}
        {session.data?.user?.name}
        <ModeToggle />
      </div>
    </header>
  )
}
