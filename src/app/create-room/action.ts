'use server'

import { getSession } from '@/lib/auth'
import { revalidatePath } from 'next/cache'
import React from 'react'
import { db } from '../../db'
import { Room, room } from '../../db/schema'

// Added action suffix make it more clear
// This action takes in room information
export async function createRoomAction(roomData: Omit<Room, 'userId' | 'id'>) {
  console.log('getting session')
  // there's no userId by default from session, need some further NextAuth config
  const session = await getSession()
  console.log(session)
  if (!session) {
    throw new Error('You must be logged in to create the room.')
  }
  // room is the table created in postgres
  await db.insert(room).values({ ...roomData, userId: session?.user.id })

  // Tell next.js clear the cache next time someone hit this page, and get a fresh copy of everything
  revalidatePath('/')
}
