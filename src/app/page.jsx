import { PrismaClient } from "@prisma/client";
import Link from 'next/link'

const prisma = new PrismaClient();

async function getUsuariosLiga() {
  const userList = await prisma.ligas.findMany({
    include: {
      Participantes_liga: true,
      Equipos: true,
      Puntuaciones: true,
      Deportes_Inventados: true,
      Deportes_liga: true
    }
  })
  return userList;
}

export default async function Home() {
  const userList = await getUsuariosLiga();
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

