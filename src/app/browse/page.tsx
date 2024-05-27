import { unstable_noStore } from 'next/cache'
import Link from 'next/link'
import { Button } from '../../components/ui/button'
import { getRooms } from '../../data-access/rooms'
import RoomCard from './RoomCard'
import SearchBar from './SearchBar'

export default async function Home({
  searchParams,
}: {
  searchParams: { search: string }
}) {
  unstable_noStore()
  // abstract way getRooms function, can make the page dynamic to solve the caching issue
  const rooms = await getRooms(searchParams.search)

  return (
    <main className=' min-h-screen p-16 flex flex-col gap-y-8'>
      <div className='flex justify-between items-center'>
        <h1 className='text-4xl'>Find Dev Rooms</h1>
        <Button asChild>
          <Link href='/create-room'>Create Room</Link>
        </Button>
      </div>

      <SearchBar />

      {/* best way to render cards is using grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {rooms.map((room) => {
          return <RoomCard key={room.id} room={room} />
        })}
      </div>
    </main>
  )
}
