import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { db } from '@/db/index'
import { Github } from 'lucide-react'
import Link from 'next/link'
import SearchBar from '../components/SearchBar'
import TagsList, { splitTags } from '../components/Tag-list'
import { Button } from '../components/ui/button'
import { getRooms } from '../data-access/rooms'
import { Room } from '../db/schema'

async function RoomCard({ room }: { room: Room }) {
  const languages = splitTags(room.tags)

  return (
    <Card>
      <CardHeader>
        <CardTitle>{room.name}</CardTitle>
        <CardDescription>{room.description}</CardDescription>
      </CardHeader>
      <CardContent className='flex flex-col gap-4'>
        <TagsList languages={languages} />
        {room.githubRepo && (
          <Link
            href={room.githubRepo}
            className='flex items-center gap-x-2'
            target='_blank'
          >
            <Github /> Github Project
          </Link>
        )}
      </CardContent>
      <CardFooter>
        <Button asChild>
          <Link href={`/rooms/${room.id}`}>Join Room</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

export default async function Home({
  searchParams,
}: {
  searchParams: { search: string }
}) {
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
