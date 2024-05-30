import { eq } from 'drizzle-orm'
import { db } from '../db'
import { room, users } from '../db/schema'

export async function deleteUser(userId: string) {
  await db.delete(users).where(eq(users.id, userId))
  // await db.delete(room).where(eq(room.userId, userId))
}
