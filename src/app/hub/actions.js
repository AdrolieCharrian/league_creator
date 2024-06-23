"use server";
import prisma from "@/app/lib/prisma";
import { auth } from "auth";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export const identifyUser = async (league) => {
  const session = await auth();
  const token = cookies().get("access-token");
  const localUser = token && jwt.decode(token.value);

  const userId = !session ? localUser?.id : session.user.id;

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
    image: league.image,
  }));
};

export const createNewLeague = async (idAdmin, newLeague) => {
  const createdLeague = await prisma.leagues.create({
    data: {
      name: newLeague.name,
      description: newLeague.description,
      adminId: idAdmin,
      image: newLeague.image,
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
  return adminFromLeague.adminId;
};

export const updateLeague = async (idLeague, updatedLeague) => {
  const updated = await prisma.leagues.update({
    where: {
      id_league: parseInt(idLeague),
    },
    data: {
      name: updatedLeague.name,
      description: updatedLeague.description,
    },
  });
  return updated;
};

export const getLeagueById = async (idLeague) => {
  const league = await prisma.leagues.findUnique({
    where: {
      id_league: parseInt(idLeague),
    },
  });
  return league;
};
// ---- Jugadores en liga

export const getPlayersFromLeague = async (idLeague) => {
  const players = await prisma.league_players.findMany({
    where: {
      id_league: parseInt(idLeague),
    },
  });

  const playerIds = players.map((player) => player.id_player);

  const infoPlayers = await prisma.user.findMany({
    where: {
      id: { in: playerIds },
    },
    select: {
      id: true,
      name: true,
    },
  });

  return infoPlayers;
};

export const removePlayerFromTeam = async (idParticipationLeague) => {
  await prisma.players_team.deleteMany({
    where: {
      id_player: idParticipationLeague,
    },
  });
};

export const removePlayerFromTeamAssigned = async (leagueId, playerId) => {
  try {
    await prisma.players_team.deleteMany({
      where: {
        league_players: {
          id_league: parseInt(leagueId, 10),
          id_player: playerId,
        },
      },
    });
  } catch (error) {
    console.error('Error removing player from team:', error);
    throw error;
  }
};

export const removePlayerFromLeague = async (idLeague, idPlayer) => {
  await prisma.league_players.deleteMany({
    where: {
      id_league: parseInt(idLeague),
      id_player: idPlayer,
    },
  });
};

export const removePlayerFromLeagueAndTeam = async (idLeague, idPlayer) => {
  const participation = await prisma.league_players.findFirst({
    where: {
      id_league: parseInt(idLeague),
      id_player: idPlayer,
    },
  });

  if (participation) {
    await removePlayerFromTeam(participation.id_participation_league);

    await removePlayerFromLeague(idLeague, idPlayer);
  }
};

export const isPlayerInAnyTeamInLeague = async (idLeague, idPlayer) => {
  const participation = await prisma.league_players.findFirst({
    where: {
      id_league: parseInt(idLeague),
      id_player: idPlayer,
    },
    include: {
      players_team: {
        include: {
          teams: true,
        },
      },
    },
  });

  return participation?.players_team.length > 0 ? participation.players_team[0].teams.name : null;
};


// --- Tema sports in league

export const getSportsFromLeague = async (idLeague) => {
  const sportsLeague = await prisma.sports_league.findMany({
    where: {
      id_league: parseInt(idLeague),
    },
    include: {
      sports: true,
      sports_custom: true,
    },
  });

  const sportsInfo = sportsLeague.map((sportLeague) => {
    if (sportLeague.id_sport) {
      return {
        ...sportLeague.sports,
        id_sport_league: sportLeague.id_sport_league,
        type: "standard",
      };
    } else if (sportLeague.id_sport_custom) {
      return {
        ...sportLeague.sports_custom,
        id_sport_league: sportLeague.id_sport_league,
        type: "custom",
      };
    }
    return null;
  });

  return sportsInfo.filter((sport) => sport !== null);
};

export const deleteSportFromLeague = async (idSportLeague) => {
  await prisma.sports_league.delete({
    where: {
      id_sport_league: idSportLeague,
    },
  });
};

export const addPredefinedSportToLeague = async (idLeague, idSport) => {
  await prisma.sports_league.create({
    data: {
      id_league: parseInt(idLeague),
      id_sport: parseInt(idSport),
    },
  });
};

export const addCustomSportToLeague = async (idLeague, customSport) => {
  const newSport = await prisma.sports_custom.create({
    data: {
      name: customSport.name,
      description: customSport.description,
      rules: customSport.rules,
      num_players: customSport.num_players,
      id_league: parseInt(idLeague),
    },
  });

  await prisma.sports_league.create({
    data: {
      id_league: parseInt(idLeague),
      id_sport_custom: newSport.id_sport_custom,
    },
  });
};

export const getPredefinedSports = async () => {
  return await prisma.sports.findMany();
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

export const createNewTeam = async (formData, leagueId, image) => {
  const name = formData.get("name");
  const description = formData.get("description");
  const acronym = formData.get("acronym");
  const session = await auth();
  const token = cookies().get("access-token");
  const localUser = token && jwt.decode(token.value)

  const userId = !session ? localUser?.id : session.user.id;

  const createdTeam = await prisma.teams.create({
    data: {
      name: name,
      description: description,
      // adminId: userId,
      image: image,
      acronym: acronym,
      id_league: parseInt(leagueId)
    },
  });
  
  if (!createdTeam || !createdTeam.id_team) {
    throw new Error('Failed to create team or fetch team ID.');
  }
  
  const leaguePlayer = await prisma.league_players.create({
    data: {
      id_player: userId,
      id_league: parseInt(leagueId),
    },
  });

  if (!leaguePlayer || !leaguePlayer.id_participation_league) {
    throw new Error('Failed to create league player or fetch participation league ID.');
  }
  
  await prisma.players_team.create({
    data: {
      id_player: leaguePlayer.id_participation_league,
      id_team: createdTeam.id_team
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
    image: team.image,
    acronym: team.acronym
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

export const acceptInvitation = async (idInvi, idLea, idUser) => {
  await prisma.league_players.create({
    data: {
      id_player: idUser,
      id_league: idLea,
    },
  });

  await prisma.invitations.delete({
    where: {
      id_invitation: idInvi,
    },
  });
};

export const getUsersNotInLeague = async (idLeague) => {
  const usersInLeague = await prisma.league_players.findMany({
    where: {
      id_league: parseInt(idLeague),
    },
    select: {
      id_player: true,
    },
  });
  const userIdsInLeague = usersInLeague.map((player) => player.id_player);
  const usersNotInLeague = await prisma.user.findMany({
    where: {
      id: {
        notIn: userIdsInLeague,
      },
    },
  });
  return usersNotInLeague;
};

export const createInvitation = async (idUser, idLeague) => {
  const invitation = await prisma.invitations.create({
    data: {
      id_user: idUser,
      id_league: parseInt(idLeague),
    },
  });
  return invitation;
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

export const assignPlayerToTeam = async (leagueId, playerId, teamName) => {
  try {
    const team = await prisma.teams.findFirst({
      where: {
        name: teamName,
        id_league: parseInt(leagueId),
      },
    });

    if (!team) {
      throw new Error(`Team ${teamName} not found in league ${leagueId}`);
    }

    const leaguePlayer = await prisma.league_players.findFirst({
      where: {
        id_player: playerId,
        id_league: parseInt(leagueId),
      },
    });

    if (!leaguePlayer) {
      throw new Error(`Player ${playerId} not found in league ${leagueId}`);
    }

    await prisma.players_team.create({
      data: {
        id_team: team.id_team,
        id_player: leaguePlayer.id_participation_league,
      },
    });
  } catch (error) {
    console.error('Error assigning player to team:', error);
    throw error;
  }
};


// ---- Leaderboard

export const getLeaderboardData = async (leagueId) => {
  const scores = await prisma.score.findMany({
    where: {
      id_league: parseInt(leagueId),
    },
    include: {
      teams: true,
    },
    orderBy: {
      points: "desc",
    },
  });

  return scores.map((score, index) => ({
    rank: index + 1,
    teamName: score.teams.name,
    matchesPlayed: score.matches,
    wins: score.wins,
    draws: score.draws,
    loses: score.loses,
    points: score.points,
  }));
};
// ---- Matches

// ---- Configuration

//PUT method change image league (to Implement)
export const saveImageLeague = async (img) => {
  const session = await auth();
  const token = cookies().get("access-token");
  const localUser = token && jwt.decode(token.value);
  const email = !session ? localUser?.email : session.user.email;

  try {
    const updatedUserImage = await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        image: img,
      },
    });
    const newToken = jwt.sign(
      {
        id: localUser.id,
        name: localUser.name,
        email: localUser.email,
        surname: localUser.surname,
        username: localUser.username,
        image: updatedUserImage.image,
        description: localUser.description,
      },
      "1234"
    );
    console.log(newToken);

    // Set token in cookie
    cookies().set("access-token", newToken);
    console.log(NextResponse.json({ updatedUserImage }));
    console.log("Updated User");
  } catch (error) {
    console.error(error);
    return NextResponse.error("Error updating user");
  }
};

export const getDefaultImages = async () => {
  const imagesArr = await prisma.default_images.findMany();
  const imagesId = imagesArr.map((image) => image.image);

  console.log(imagesId);
  return imagesId;
};
