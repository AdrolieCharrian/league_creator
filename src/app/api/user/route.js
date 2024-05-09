import prisma from "@/app/lib/prisma";
import {NextResponse} from "next/server";
import bcrypt from "bcrypt";

export async function POST(request) {
  const res = await request.json();
  const {name, surname, email, description, password} = res;
  console.log({res});

  try {
    //create deafault salt
    const salt = bcrypt.genSaltSync(10);
    //create new hash with the password feom request (pass+salt)
    const hash = bcrypt.hashSync(password, salt);
    //convert to string
    const passwordString = JSON.stringify({hash, salt});

    const result = await prisma.users.create({
      data: {
        name: name,
        email: email,
        surname: surname,
        description: description,
        password: passwordString,
      },
    });

    return NextResponse.json({result});
  } catch (error) {
    console.error(error);
    return NextResponse.error("Error al crear el usuario");
  }
}

export async function PUT(request) {
  const res = await request.json();
  const {id, name, surname, email, descrip, password} = res;

  try {
    const updatedUser = await prisma.users.update({
      where: {id},
      data: {
        Name: name,
        Email: email,
        Surname: surname,
        Description: descrip,
        Password: password,
      },
    });
    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.error("Error al actualizar el usuario");
  }
}

export async function DELETE(request) {
  const {id} = await request.json();

  try {
    const deletedUser = await prisma.usuarios.delete({
      where: {id},
    });
    return NextResponse.json(deletedUser);
  } catch (error) {
    return NextResponse.error("Error al eliminar el usuario");
  }
}
