import { db } from '@/db/index'

export default async function Home() {
  // testing is the name of the table we just created
  const items = await db.query.testing.findMany()

  return (
    <main className='flex min-h-screen flex-col items-center justify-center p-24'>
      <h1>hello world</h1>
      {items.map((item) => {
        return <div key={item.id}>{item.name}</div>
      })}
    </main>
  )
}
