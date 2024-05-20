import { unstable_noStore } from 'next/cache'
import { db } from '../db'

// make '/' a dynamic page instead of static
export async function getRooms() {
  unstable_noStore()
  const rooms = await db.query.room.findMany()
  return rooms
}
