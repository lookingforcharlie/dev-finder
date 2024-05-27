'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Github, TrashIcon } from 'lucide-react'
import Link from 'next/link'
import TagsList from '../../components/Tag-list'
import { Button } from '../../components/ui/button'
import { deleteRoom } from '../../data-access/rooms'
import { Room } from '../../db/schema'
import { splitTags } from '../../lib/utils'
import { deleteRoomAction } from './actions'

export default function UserRoomCard({ room }: { room: Room }) {
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
      <CardFooter className='flex gap-x-2'>
        <Button asChild>
          <Link href={`/rooms/${room.id}`}>Join Room</Link>
        </Button>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant={'destructive'} className='flex gap-x-2'>
              <TrashIcon className='w-4 h-4' />
              Delete Room
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently remove the
                room and any data associated with it.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => deleteRoomAction(room.id)}>
                Yes, delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  )
}
