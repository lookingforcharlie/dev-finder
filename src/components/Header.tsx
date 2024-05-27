'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { LogInIcon, LogOutIcon } from 'lucide-react'
import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import appIcon from '../../public/dev_finder_icon.png'
import { ModeToggle } from './mode-toggle'
import { Button } from './ui/button'

function AccountDropdown() {
  const session = useSession()

  // !!: explicitly cast a value to either true or false based on its truthiness or falsiness
  const isLoggedIn = !!session.data
  return (
    <DropdownMenu>
      {isLoggedIn ? (
        <DropdownMenuTrigger asChild>
          <Button variant={'link'} className='space-x-2'>
            <Avatar>
              <AvatarImage src={session.data?.user?.image ?? ''} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className='text-xl'>{session.data?.user?.name}</div>
          </Button>
        </DropdownMenuTrigger>
      ) : (
        <Button
          variant={'destructive'}
          onClick={() => signIn('google')}
          className='mr-4'
        >
          <LogInIcon className='mr-2' /> Sign In
        </Button>
      )}

      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {isLoggedIn ? (
          <DropdownMenuItem
            onClick={() =>
              signOut({
                callbackUrl: '/',
              })
            }
          >
            <LogOutIcon className='mr-2' /> Sign Out
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem onClick={() => signIn('google')}>
            <LogInIcon className='mr-2' /> Sign In
          </DropdownMenuItem>
        )}
        <DropdownMenuItem>Profile</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default function Header() {
  // We can use session to check someone is logged in or not
  const session = useSession()
  const isLoggedIn = !!session.data
  return (
    <header className='mx-auto bg-zinc-200 dark:bg-gray-800 py-2 lg:px-12 z-10 relative'>
      <div className='flex justify-between items-center'>
        <Link
          href='/'
          className='flex items-center gap-2 text-2xl font-bold text-pink-600 transform motion-safe:hover:scale-105 transition-all'
        >
          <Image src={appIcon} alt='app icon' width={'70'} height={'70'} />
          <span>Dev Finder</span>
        </Link>

        <div className='flex items-center'>
          <nav>
            {isLoggedIn && (
              <div className='flex gap-x-4'>
                <Link href='/browse'>Browse</Link>
                <Link href='/your-rooms'>Your Rooms</Link>
              </div>
            )}
          </nav>

          <div className='flex items-center gap-x-2'>
            <AccountDropdown />
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}
