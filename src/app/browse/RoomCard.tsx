import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Github } from 'lucide-react'
import Link from 'next/link'
import TagsList from '../../components/Tag-list'
import { Button } from '../../components/ui/button'
import { Room } from '../../db/schema'
import { splitTags } from '../../lib/utils'

export default function RoomCard({ room }: { room: Room }) {
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
