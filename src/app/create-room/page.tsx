// Every folder under app is a router
// localhost:3000/create-room, you will see this page

import React from 'react'
import CreateRoomForm from './create-room-form'

export default function CreateRoomPage() {
  return (
    <div className='container mx-auto flex flex-col gap-6 pt-10 pb-24'>
      <h1 className='text-4xl font-bold'>Creating a room</h1>
      {/* shadcn using react-hook-form */}
      <CreateRoomForm />
    </div>
  )
}
