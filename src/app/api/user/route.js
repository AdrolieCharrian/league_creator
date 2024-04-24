import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
  const res = await request.json();
  const { name, surname, email, descrip, password } = res;
  console.log({ res });

  try {
    const result = await prisma.usuarios.create({
      data: {
        Nombre: name,
        Email: email,
        Apellidos: surname,
        Descripcion: descrip,
        Password: password,
      },
    });

    return NextResponse.json({ result });
  } catch (error) {
    console.error(error);
    return NextResponse.error('Error al crear el usuario');
  }
}

export async function PUT(request) {
  const res = await request.json();
  const { id, name, surname, email, descrip, password } = res;

  try {
    const updatedUser = await prisma.usuarios.update({
      where: { id },
      data: {
        Nombre: name,
        Email: email,
        Apellidos: surname,
        Descripción: descrip,
        Password: password,
      },
    });
    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.error('Error al actualizar el usuario');
  }
}

export async function DELETE(request) {
  const { id } = await request.json();

  try {
    const deletedUser = await prisma.usuarios.delete({
      where: { id },
    });
    return NextResponse.json(deletedUser);
  } catch (error) {
    return NextResponse.error('Error al eliminar el usuario');
  }
}
