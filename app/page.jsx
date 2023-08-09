import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'

import { db } from "@/lib/db"
import { authOptions } from "@/lib/auth"

export default async function Home() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/auth/login')
  }

  const stations = await db.station.findMany({
    select: {
      id: true,
      name: true,
    }
  })

  return (
    <>
      <h2>Stations</h2>
      <ul>
        {stations.map(({ id, name }) => <li key={id}>{name}</li>)}
      </ul>
    </>

  )
}
