import { DrizzleAdapter } from '@auth/drizzle-adapter'
import { AuthOptions, DefaultSession, getServerSession } from 'next-auth'
import { Adapter } from 'next-auth/adapters'
import GoogleProvider from 'next-auth/providers/google'
import { db } from '../db'

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string
    } & DefaultSession['user']
  }
}

export const authConfig = {
  adapter: DrizzleAdapter(db) as Adapter, // do this to fix the broken TypeScript for adapter
  // two ways you can use authentication, session and jwt
  // jwt is necessary if you want to use middleware
  // We need NEXTAUTH_SECRET in .env file to use jwt
  session: {
    strategy: 'jwt',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      const dbUser = await db.query.users.findFirst({
        where: (users, { eq }) => eq(users.email, token.email!),
      })

      if (!dbUser) {
        throw new Error('no user with email found')
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
      }
    },
    async session({ token, session }) {
      if (token) {
        session.user = {
          id: token.id as string,
          name: token.name,
          email: token.email,
          image: token.picture,
        }
      }
      return session
    },
  },
} satisfies AuthOptions

// Get the server session
export function getSession() {
  // pass the auth config: when call getSession from action.ts, it knows how to connect to postgres using drizzle
  return getServerSession(authConfig)
}
