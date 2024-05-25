'use client'

import {
  Call,
  CallControls,
  CallParticipantsList,
  SpeakerLayout,
  StreamCall,
  StreamTheme,
  StreamVideo,
  StreamVideoClient,
} from '@stream-io/video-react-sdk'
import '@stream-io/video-react-sdk/dist/css/styles.css'
import { generateKey } from 'crypto'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Room } from '../../../db/schema'
import { generateTokenAction } from './actions'

const apiKey = process.env.NEXT_PUBLIC_GET_STREAM_API_KEY!

export function DevFinderVideo({ room }: { room: Room }) {
  const session = useSession()
  const [client, setClient] = useState<StreamVideoClient | null>(null)
  const [call, setCall] = useState<Call | null>(null)
  const router = useRouter()

  // we using set hook and useEffect because it's Next.js
  useEffect(() => {
    if (!room) return
    if (!session.data) {
      return
    }
    const userId = session.data.user.id
    const client = new StreamVideoClient({
      apiKey,
      user: {
        id: userId,
        name: session.data.user.name ?? 'unknown',
        image: session.data.user.image ?? '',
      },
      tokenProvider: () => generateTokenAction(), // Call a server action
    })
    const call = client.call('default', room.id)
    call.join({ create: true })
    setClient(client)
    setCall(call)

    return () => {
      // call.leave()
      client.disconnectUser()
    }
  }, [session, room])
  return (
    client &&
    call && (
      <StreamVideo client={client}>
        <StreamTheme>
          <StreamCall call={call}>
            <SpeakerLayout />
            <CallControls
              onLeave={() => {
                router.push('/') // After click disconnect, back to homepage
              }}
            />
            <CallParticipantsList onClose={() => undefined} />
          </StreamCall>
        </StreamTheme>
      </StreamVideo>
    )
  )
}
