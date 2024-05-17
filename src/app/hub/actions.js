"use server";
import prisma from "@/app/lib/prisma";
import jwt from "jsonwebtoken";
import { auth } from "auth";

export const identifyUser = async () => {
  const session = await auth();
  const userId = session.user.id;
  createNewLeague(userId);
};

export const getLeaguesFromUser = async () => {
  const session = await auth();
  console.log(session);

  const emailuser = session.user.email;
  console.log("email", emailuser);

  const user = await prisma.user
    .findUnique({
      where: {
        email: emailuser,
      },
    })
    .then((res) => {
      console.log(res);
    });
};

// Creation new League
export const createNewLeague = async (idAdmin) => {
  let idLeague;
  console.log("dentro create new league");
  await prisma.leagues
    .create({
      data: {
        name: "prueba3",
      },
    })
    .then((res) => (idLeague = res.id_league));

  await prisma.league_players.create({
    data: {
      id_player: idAdmin, 
      id_league: idLeague,
      admin: true, 
    },
  });
};
