'use server'

import { getSession } from '@/lib/auth'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { editRoom, getRoom } from '../../../data-access/rooms'
import { Room, room } from '../../../db/schema'

// Added action suffix make it more clear
// This action takes in room information
export async function editRoomAction(roomData: Omit<Room, 'userId'>) {
  console.log('getting session')
  // there's no userId by default from session, need some further NextAuth config
  const session = await getSession()
  console.log(session)
  if (!session) {
    throw new Error('You must be logged in to create the room.')
  }

  // did the user create this room
  const room = await getRoom(roomData.id)

  if (room?.userId !== session.user.id) {
    throw new Error('User not authenticated')
  }

  await editRoom({ ...roomData, userId: room.userId })

  // Tell next.js clear the cache next time someone hit this page, and get a fresh copy of everything
  revalidatePath('/your-room')
  revalidatePath(`/edit-room/${roomData.id}`)
  redirect('/your-rooms')
}
