"use server";
import prisma from "@/app/lib/prisma";
import { auth } from "auth";

export const justIdentifyIdUser = async () => {
  const session = await auth();
  const userId = session.user.id;
  return userId;
};

export const identifyUser = async (league) => {
  const session = await auth();
  const userId = session.user.id;
  await createNewLeague(userId, league);
};

// ---- Leagues

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
    admin: league.adminId === user.id,
  }));
};

export const createNewLeague = async (idAdmin, newLeague) => {
  const createdLeague = await prisma.leagues.create({
    data: {
      name: newLeague.name,
      description: newLeague.description,
      adminId: idAdmin,
    },
  });

  await prisma.league_players.create({
    data: {
      id_player: idAdmin,
      id_league: createdLeague.id_league,
    },
  });
};

export const deleteLeague = async (idLeague) => {
  await prisma.league_players.deleteMany({
    where: {
      id_league: idLeague,
    },
  });

  await prisma.leagues.delete({
    where: {
      id_league: idLeague,
    },
  });
};

// ---- General Teams

export const getTeamsFromUser = async () => {
  const session = await auth();
  const emailuser = session.user.email;

  const user = await prisma.user.findUnique({
    where: {
      email: emailuser,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const leaguesPlayer = await prisma.league_players.findMany({
    where: {
      id_player: user.id,
    },
  });

  const participationIds = leaguesPlayer.map(
    (lp) => lp.id_participation_league
  );

  const playersTeam = await prisma.players_team.findMany({
    where: {
      id_player: {
        in: participationIds,
      },
    },
  });

  const teamIds = playersTeam.map((pt) => pt.id_team);

  const teams = await prisma.teams.findMany({
    where: {
      id_team: {
        in: teamIds,
      },
    },
  });

  return teams.map((team) => ({
    id_team: team.id_team,
    name: team.name,
    description: team.description || "No description available",
  }));
};

// ---- Teams inside league

export const getTeamsFromLeague = async (idLeague) => {

  console.log(idLeague);

  const teams = await prisma.teams.findMany({
    where: {
      id_team: idLeague
    },
  }).then((res)=>{console.log(res)});

  return teams.map((team) => ({
    id_team: team.id_team,
    name: team.name,
    description: team.description || "No description available",
  }));
};
