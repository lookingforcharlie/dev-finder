import { eq } from 'drizzle-orm'
import { unstable_noStore } from 'next/cache'
import { db } from '../db'
import { room } from '../db/schema'

// make '/' a dynamic page instead of static
export async function getRooms() {
  // don't cache
  unstable_noStore()
  const rooms = await db.query.room.findMany()
  return rooms
}

export async function getRoom(roomId: string) {
  // don't cache
  unstable_noStore()
  return await db.query.room.findFirst({
    where: eq(room.id, roomId),
  })
}
