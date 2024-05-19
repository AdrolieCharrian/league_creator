"use server";
import prisma from "@/app/lib/prisma";
import { auth } from "auth";


export const justIdentifyIdUser = async () => {
  const session = await auth();
  const userId = session.user.id;
  return userId
};

export const identifyUser = async (league) => {
  const session = await auth();
  const userId = session.user.id;
  await createNewLeague(userId, league);
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

  const leagueIds = leagues_player.map((lp) => lp.id_league);

  const leagues = await prisma.leagues.findMany({
    where: {
      id_league: {
        in: leagueIds,
      },
    },
  });

  return leagues.map((league) => ({
    id_league: league.id_league,
    name: league.name,
    description: league.description || "No description available",
  }));
};

export const createNewLeague = async (idAdmin, newLeague) => {
  const createdLeague = await prisma.leagues.create({
    data: {
      name: newLeague.name,
      description: newLeague.description,
    },
  });

  await prisma.league_players.create({
    data: {
      id_player: idAdmin,
      id_league: createdLeague.id_league,
      admin: true,
    },
  });
};