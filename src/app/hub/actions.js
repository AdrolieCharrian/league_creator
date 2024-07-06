"use server";
import prisma from "@/app/lib/prisma";
import { auth } from "auth";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export const isAdmin = async (idLeague, idUser) => {
  const adminFromLeague = await prisma.leagues.findUnique({
    where: {
      id_league: parseInt(idLeague),
    },
  });
  const leagueAdmin = adminFromLeague.adminId;
  if (leagueAdmin === idUser) {
    return true;
  } else {
    return false;
  }
};

export const getUserInfo = async () => {
  const session = await auth();
  const token = cookies().get("access-token");
  const localUser = token && jwt.decode(token.value);

  const userId = !session ? localUser?.id : session.user.id;
  return userId;
};

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
  return adminFromLeague?.adminId;
  
};

export const findLeagueAdminFromTeam = async (teamId) => {
  const foundTeam = await prisma.teams.findUnique({
    where: {
      id_team: parseInt(teamId),
    },
    select: {
      id_league: true,
    },
  });

  if (!foundTeam) {
    throw new Error('Team not found');
  }

  const foundLeague = await prisma.leagues.findUnique({
    where: {
      id_league: foundTeam.id_league,
    },
    select: {
      adminId: true,
    },
  });

  if (!foundLeague) {
    throw new Error('League not found');
  }

  return foundLeague.adminId;
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

export const updateLeagueImage = async (idLeague, updatedImage) => {
  const updated = await prisma.leagues.update({
    where: {
      id_league: parseInt(idLeague),
    },
    data: {
      image: updatedImage,
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
  // Consulta todos los jugadores y sus equipos en una sola consulta
  const players = await prisma.user.findMany({
    where: {
      league_players: {
        some: {
          id_league: parseInt(idLeague),
        },
      },
    },
    select: {
      id: true,
      name: true,
      league_players: {
        where: {
          id_league: parseInt(idLeague),
        },
        include: {
          players_team: {
            include: {
              teams: true,
            },
          },
        },
      },
    },
  });

  // Mapea los jugadores para incluir el nombre del equipo
  const playersWithTeamStatus = players.map((player) => {
    const teamName =
      player.league_players[0]?.players_team[0]?.teams?.name || null;
    return {
      id: player.id,
      name: player.name,
      teamName: teamName,
    };
  });

  return playersWithTeamStatus;
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
    console.error("Error removing player from team:", error);
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

  return participation?.players_team.length > 0
    ? participation.players_team[0].teams.name
    : null;
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
      leagues: true,
      players_team: {
        include: {
          league_players: true,
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
  const localUser = token && jwt.decode(token.value);

  const userId = !session ? localUser?.id : session.user.id;

  const createdTeam = await prisma.teams.create({
    data: {
      name: name,
      description: description,
      // adminId: userId,
      image: image,
      acronym: acronym,
      id_league: parseInt(leagueId),
    },
  });

  if (!createdTeam || !createdTeam.id_team) {
    throw new Error("Failed to create team or fetch team ID.");
  }

  const leaguePlayer = await prisma.league_players.create({
    data: {
      id_player: userId,
      id_league: parseInt(leagueId),
    },
  });

  if (!leaguePlayer || !leaguePlayer.id_participation_league) {
    throw new Error(
      "Failed to create league player or fetch participation league ID."
    );
  }

  await prisma.players_team.create({
    data: {
      id_player: leaguePlayer.id_participation_league,
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
    image: team.image,
    acronym: team.acronym,
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
    console.error("Error assigning player to team:", error);
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

  return imagesId;
};

// ---- Matches
export const generateMatchesForLeague = async (idLeague) => {
  // Obtén todos los equipos de la liga
  const teams = await prisma.teams.findMany({
    where: {
      id_league: parseInt(idLeague),
    },
  });

  // Obtén todos los deportes de la liga
  const sports = await prisma.sports_league.findMany({
    where: {
      id_league: parseInt(idLeague),
    },
    include: {
      sports: true,
      sports_custom: true,
    },
  });

  // Generar enfrentamientos
  let matches = [];
  for (const sportLeague of sports) {
    const sportName =
      sportLeague.sports?.name || sportLeague.sports_custom?.name;

    for (let i = 0; i < teams.length; i++) {
      for (let j = i + 1; j < teams.length; j++) {
        matches.push({
          id_team_one: teams[i].id_team,
          id_team_two: teams[j].id_team,
          match_date: new Date(), // Puedes ajustar la fecha del partido según sea necesario
          sport: sportName,
        });
      }
    }
  }

  // Inserta los partidos en la base de datos
  for (const match of matches) {
    await prisma.matches.create({
      data: match,
    });
  }

  // Inicializar la tabla de puntuaciones manualmente
  const initialScoreData = {
    matches: 0,
    wins: 0,
    loses: 0,
    points: 0,
    draws: 0,
  };

  for (const team of teams) {
    await prisma.score.create({
      data: {
        id_league: parseInt(idLeague),
        id_team: team.id_team,
        ...initialScoreData,
      },
    });
  }
};

export const getMatchesFromLeague = async (idLeague) => {
  const matches = await prisma.matches.findMany({
    where: {
      teamOne: {
        id_league: parseInt(idLeague),
      },
    },
    include: {
      teamOne: true,
      teamTwo: true,
    },
  });

  return matches.map((match) => ({
    id_match: match.id_match,
    sport: match.sport,
    teamOne: {
      name: match.teamOne.name,
    },
    teamTwo: {
      name: match.teamTwo.name,
    },
    match_date: match.match_date,
  }));
};

export const declareWinner = async (matchId, winnerId, loserId) => {
  try {
    // Actualizar la tabla de matches
    await prisma.matches.update({
      where: { id_match: matchId },
      data: {
        winner: winnerId,
        loser: loserId,
        draw: false,
      },
    });

    // Obtener el registro de score para el ganador
    const winnerScore = await prisma.score.findFirst({
      where: { id_team: winnerId },
    });

    // Actualizar la tabla de score para el ganador
    await prisma.score.update({
      where: { id_score: winnerScore.id_score },
      data: {
        wins: { increment: 1 },
        points: { increment: 3 },
        matches: { increment: 1 },
      },
    });

    // Obtener el registro de score para el perdedor
    const loserScore = await prisma.score.findFirst({
      where: { id_team: loserId },
    });

    // Actualizar la tabla de score para el perdedor
    await prisma.score.update({
      where: { id_score: loserScore.id_score },
      data: {
        loses: { increment: 1 },
        matches: { increment: 1 },
      },
    });

    return { message: "Winner declared successfully" };
  } catch (error) {
    console.error("Error declaring winner", error);
  }
};

export const identifyWinner = async (idMatch) => {
  const match = await prisma.matches.findUnique({
    where: { id_match: idMatch },
    include: {
      teamOne: true,
      teamTwo: true
    }
  });

  if (match.winner !== null) {
    const winnerTeam = match.winner === match.id_team_one ? match.teamOne : match.teamTwo;
    return { status: false, winner: winnerTeam.name };
  } else {
    return { status: true, winner: null };
  }
};