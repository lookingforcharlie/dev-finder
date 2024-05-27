import { eq, like } from 'drizzle-orm'
import { unstable_noStore } from 'next/cache'
import { db } from '../db'
import { room } from '../db/schema'
import { getSession } from '../lib/auth'

// make '/' a dynamic page instead of static
export async function getRooms(search: string | undefined) {
  const where = search ? like(room.tags, `%${search}%`) : undefined
  const rooms = await db.query.room.findMany({
    where,
  })
  return rooms
}

export async function getRoom(roomId: string) {
  return await db.query.room.findFirst({
    where: eq(room.id, roomId),
  })
}

//
export async function getUserRooms() {
  const session = await getSession()
  if (!session) {
    throw new Error('User not authenticated')
  }
  const rooms = await db.query.room.findMany({
    where: eq(room.userId, session.user.id),
  })
  return rooms
}

// use drizzle delete a room
export async function deleteRoom(roomId: string) {
  await db.delete(room).where(eq(room.id, roomId))
}

// data access layer has the knowledge of Next.js is a bad practice
// so it would be a better practice to abstract unstable_noStore() away from these room functions
// add unstable_noStore() too all the components that called the room functions here
