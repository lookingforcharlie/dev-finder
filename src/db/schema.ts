// define a table we will use in the Postgres
import { PgTable, pgTable, text } from 'drizzle-orm/pg-core'

// make a table called testing
export const testing = pgTable('testing', {
  id: text('id').notNull().primaryKey(),
  name: text('name'),
})
