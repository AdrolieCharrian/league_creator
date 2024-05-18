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
  const emailuser = session.user.email;

  const user = await prisma.user.findUnique({
    where: {
      email: emailuser,
    },
  });

  const leagues_player = await prisma.league_players.findMany({
    where: {
      id_player: user.id,
    },
  });

  const leagueIds = leagues_player.map(lp => lp.id_league);

  const leagues = await prisma.leagues.findMany({
    where: {
      id_league: {
        in: leagueIds,
      },
    },
  });

  return leagues.map(league => ({
    id_league: league.id_league,
    name: league.name,
    description: league.description || "No description available",
  }));
};

// Creation new League
export const createNewLeague = async (idAdmin) => {
  
  console.log("dentro create new league");
  const idLeague = await prisma.leagues
    .create({
      data: {
        name: "prueba3",
      },
    });

  await prisma.league_players.create({
    data: {
      id_player: idAdmin, 
      id_league: idLeague.id_league,
      admin: true, 
    },
  });
};

