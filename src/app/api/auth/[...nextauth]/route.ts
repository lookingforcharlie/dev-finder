import { db } from '@/db'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import NextAuth from 'next-auth'
import type { Adapter } from 'next-auth/adapters'
import GoogleProvider from 'next-auth/providers/google'

const handler = NextAuth({
  adapter: DrizzleAdapter(db) as Adapter, // do this to fix the broken TypeScript for adapter
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
})

export { handler as GET, handler as POST }
// This is basically an endpoint that various third party providers are going to use to send you tokens and make sure that you're logged in and register
