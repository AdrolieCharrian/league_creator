"use server";
import prisma from "@/app/lib/prisma";
import { auth } from "auth";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export const identifyUser = async (league) => {
  const session = await auth();
  const userId = !session ? user?.id : session.user.id;

  await createNewLeague(userId, league);
};

// ---- Leagues

export const getLeaguesFromUser = async () => {
  const session = await auth();
  const token = cookies().get("access-token");
  const localUser = token && jwt.decode(token.value);

  const emailuser = !session ? localUser?.email : session.user.email;

  const user = await prisma.user.findUnique({
    where: {
      email: emailuser,
    },
  });

  // console.log(user);

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

export const getAdminFromLeague = async (idLeague) => {
  const adminFromLeague = await prisma.leagues.findUnique({
    where: {
      id_league: parseInt(idLeague),
    },
  });
  // console.log("admin ID: ",adminFromLeague.adminId);
  return adminFromLeague.adminId;
};

// ---- General Teams

export const getTeamsFromUser = async (userId) => {
  const teams = await prisma.teams.findMany({
    where: {
      players_team: {
        some: {
          league_players: {
            id_player: userId,
          },
        },
      },
    },
    include: {
      leagues: true, // This will include the league details for each team
      players_team: {
        include: {
          league_players: true, // This will include the details of league_players
        },
      },
    },
  });

  return teams;
};

export const createNewTeam = async (formData) => {
  const name = formData.get("name");
  const description = formData.get("description");
  const session = await auth();
  const userId = session.user.id;

  const createdTeam = await prisma.leagues.create({
    data: {
      name: name,
      description: description,
      adminId: userId,
    },
  });

  await prisma.players_team.create({
    data: {
      id_player: userId,
      id_team: createdTeam.id_team,
    },
  });
};

// ---- Teams inside league

export const getTeamsFromLeague = async (idLeague) => {
  const teams = await prisma.teams.findMany({
    where: {
      id_league: parseInt(idLeague),
    },
  });

  return teams.map((team) => ({
    id_team: team.id_team,
    name: team.name,
    description: team.description || "No description available",
  }));
};

// ---- Invitations

export const getInvitationsFromUser = async () => {
  const session = await auth();
  const token = cookies().get("access-token");
  const localUser = token && jwt.decode(token.value);

  const emailuser = !session ? localUser?.email : session.user.email;

  const user = await prisma.user.findUnique({
    where: {
      email: emailuser,
    },
  });

  const invitations = await prisma.invitations.findMany({
    where: {
      id_user: user.id,
    },
  });

  return invitations.map((invi) => ({
    idInvitation: invi.id_invitation,
    idUser: invi.id_user,
    idLeague: invi.id_league,
  }));
};

export const getInfoLeague = async (id) => {
  const league = await prisma.leagues.findUnique({
    where: {
      id_league: id,
    },
  });
  return league;
};

export const declineInvitation = async (id) => {
  await prisma.invitations.delete({
    where: {
      id_invitation: id,
    },
  });
};

export const acceptInvitation = async (idInvi,idLea,idUser) => {
  await prisma.league_players.create({
    data:{
      id_player:idUser,
      id_league:idLea
    }
  });

  await prisma.invitations.delete({
    where: {
      id_invitation: idInvi,
    },
  });
};

// ---- Player inside team
export const getPlayersFromTeam = async (idTeam) => {
  const players = await prisma.players_team.findMany({
    where: {
      id_team: parseInt(idTeam),
    },
  });
  return players.map((player) => ({
    id_player_team: player.id_player_team,
    id_player: player.id_player,
  }));
};

// ---- Player info
export const getPlayerInfo = async (id) => {
  const playerInfoLeague = await prisma.league_players.findUnique({
    where: {
      id_participation_league: id,
    },
  });

  const playerInfo = await prisma.user.findUnique({
    where: {
      id: playerInfoLeague.id_player,
    },
  });

  return playerInfo;
};
