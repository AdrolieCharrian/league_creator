"use server";
import prisma from "@/app/lib/prisma";
import jwt from "jsonwebtoken";
import { auth } from "auth";

export const getLeaguesFromUser = async () => {
  const session = await auth();
  console.log(session);

  const emailuser = session.user.email;
  console.log("email", emailuser);

  const user = await prisma.user.findUnique({
    where: {
      email: emailuser,
    },
  }).then((res)=>{
    console.log(res);
  });

};
