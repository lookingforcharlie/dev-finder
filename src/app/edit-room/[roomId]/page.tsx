// Every folder under app is a router
// localhost:3000/create-room, you will see this page

import { unstable_noStore } from 'next/cache'
import React from 'react'
import { getRoom } from '../../../data-access/rooms'
import EditRoomForm from './edit-room-form'

export default async function EditRoomPage({
  params,
}: {
  params: { roomId: string }
}) {
  // tell next.js don't cache this page
  unstable_noStore()
  const room = await getRoom(params.roomId)

  if (!room) {
    return <div>Room not found</div>
  }
  return (
    <div className='container mx-auto flex flex-col gap-6 pt-10 pb-24'>
      <h1 className='text-4xl font-bold'>Edit room</h1>
      {/* shadcn using react-hook-form */}
      <EditRoomForm room={room} />
    </div>
  )
}
