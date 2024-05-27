import { unstable_noStore } from 'next/cache'
import Link from 'next/link'
import { Button } from '../../components/ui/button'
import { getUserRooms } from '../../data-access/rooms'
import UserRoomCard from './UserRoomCard'

export default async function YourRoomsPage() {
  unstable_noStore()
  // Get back all the room I own and I created
  const rooms = await getUserRooms()

  return (
    <main className=' min-h-screen p-16 flex flex-col gap-y-8'>
      <div className='flex justify-between items-center'>
        <h1 className='text-4xl'>Your Rooms</h1>
        <Button asChild>
          <Link href='/create-room'>Create Room</Link>
        </Button>
      </div>

      {/* best way to render cards is using grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {rooms.map((room) => {
          return <UserRoomCard key={room.id} room={room} />
        })}
      </div>
    </main>
  )
}

// The rooms that only you created
