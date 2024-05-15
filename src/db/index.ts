import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

// This is the connection url you need, that drizzle orm knows where your database is
// You might be renting a Postgres database from Railway or Supabase, that's the url you gonna point in
// For this project, I am using a docker to setup a local Postgres DB
const queryClient = postgres('postgres://postgres:adminadmin@0.0.0.0:5432/db')
const db = drizzle(queryClient)

export { db }
