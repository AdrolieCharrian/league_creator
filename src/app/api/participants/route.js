import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

//const prisma = new PrismaClient();

export async function POST(request) {
  // Obtener datos del cuerpo del request
  const { userId, leagueId } = await request.json();

  if (!userId || !leagueId) {
    return NextResponse.json({ error: "Datos faltantes. Se requiere userId y leagueId." }, { status: 400 });
  }

  // Verificar que el usuario y la liga existen
  const user = await prisma.usuarios.findUnique({
    where: { ID_User: Number(userId) },
  });

  const league = await prisma.ligas.findUnique({
    where: { ID_Liga: Number(leagueId) },
  });

  if (!user) {
    return NextResponse.json({ error: "Usuario no encontrado." }, { status: 404 });
  }

  if (!league) {
    return NextResponse.json({ error: "Liga no encontrada." }, { status: 404 });
  }

  try {
    // Crear el nuevo participante de liga
    const newParticipant = await prisma.participantes_liga.create({
      data: {
        ID_Participante: Number(userId),
        ID_Liga: Number(leagueId),
      },
    });

    // Devolver el nuevo participante creado
    return NextResponse.json(newParticipant, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.error({ error: "Error al crear el participante de liga." }, { status: 500 });
  }
}
