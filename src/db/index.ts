import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

// This is the connection url you need, that drizzle orm knows where your database is
// You might be renting a Postgres database from Railway or Supabase, that's the url you gonna point in
// For this project, I am using a docker to setup a local Postgres DB
// Add a exclamation mark to make typescript happy
const queryClient = postgres(process.env.DATABASE_URL!)
const db = drizzle(queryClient, { schema })

export { db }
