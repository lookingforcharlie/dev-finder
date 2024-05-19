import { db } from '@/db/index'

export default async function Home() {
  // testing is the name of the table we just created
  const rooms = await db.query.room.findMany()

  return (
    <main className='flex min-h-screen flex-col items-center justify-center p-24'>
      <h1>hello world</h1>
      {rooms.map((room) => {
        return <div key={room.id}>{room.name}</div>
      })}
    </main>
  )
}
