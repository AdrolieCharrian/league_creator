import { PrismaClient } from "@prisma/client";
import Link from 'next/link'

const prisma = new PrismaClient();

async function getLeagueUsers() {
  const userList = await prisma.leagues.findMany({
    include: {
      league_players: true,
      score: true,
      sports_custom: true,
      sports_league: true,
      teams: true
    }
  })
  return userList;
}

export default async function Home() {
  const userList = await getLeagueUsers();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-3">
      <div className="flex flex-col justify-center space-y-3">  {/* Cambiamos a flex-col y usamos espacio */}
        <Link href={'/login'}>Login</Link>
        <Link href={'/league'}>League</Link>
        <Link href={'/league_parti'}>League parto</Link>
      </div>
    </main>
  );
}

