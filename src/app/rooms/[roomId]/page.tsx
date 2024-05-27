import { Github } from 'lucide-react'
import { unstable_noStore } from 'next/cache'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import TagsList from '../../../components/Tag-list'
import { Badge } from '../../../components/ui/badge'
import { getRoom } from '../../../data-access/rooms'
import { splitTags } from '../../../lib/utils'
import { DevFinderVideo } from './videoPlayer'

export default async function RoomPage(props: {
  params: {
    roomId: string
  }
}) {
  const roomId = props.params.roomId
  unstable_noStore()
  const room = await getRoom(roomId)

  if (!room) {
    return <div>No room of this ID found</div>
  }

  const languages = splitTags(room.tags)

  return (
    <div className='grid grid-cols-4 min-h-screen'>
      <div className='col-span-3 p-4 pr-2'>
        <div className='rounded-xl border bg-card text-card-foreground shadow p-4'>
          <DevFinderVideo room={room} />
        </div>
      </div>
      <div className='col-span-1 p-4 pl-2'>
        <div className='rounded-xl border bg-card text-card-foreground shadow p-4 flex flex-col gap-4'>
          <h1 className='text-lg font-semibold'>{room?.name}</h1>
          {room?.githubRepo && (
            <Link
              href={room?.githubRepo ?? ''}
              className='flex items-center gap-x-2 text-sm'
              target='_blank'
            >
              <Github /> Github Project
            </Link>
          )}
          <p className='text-base text-gray-700'>{room?.description}</p>

          <TagsList languages={languages} />
        </div>
      </div>
    </div>
  )
}
