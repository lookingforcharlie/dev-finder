'use server'

import { revalidatePath } from 'next/cache'
import { deleteRoom, getRoom } from '../../data-access/rooms'
import { getSession } from '../../lib/auth'

export async function deleteRoomAction(roomId: string) {
  // Authentication
  const session = await getSession()
  if (!session) {
    throw new Error('User not authenticated')
  }

  // did the user create this room
  const room = await getRoom(roomId)

  if (room?.userId !== session.user.id) {
    throw new Error('User not authenticated')
  }
  await deleteRoom(roomId)

  // Make sure the page refresh
  revalidatePath('/your-rooms')
}
