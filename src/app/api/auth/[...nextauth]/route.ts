import { db } from '@/db'
import { authConfig } from '@/lib/auth'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import NextAuth from 'next-auth'
import type { Adapter } from 'next-auth/adapters'
import GoogleProvider from 'next-auth/providers/google'

const handler = NextAuth(authConfig)

export { handler as GET, handler as POST }
// This is basically an endpoint that various third party providers are going to use to send you tokens and make sure that you're logged in and register
