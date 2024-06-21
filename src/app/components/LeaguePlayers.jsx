"use client";
import React, { useState, useEffect } from "react";
import { getPlayersFromLeague, removePlayerFromLeagueAndTeam, isPlayerInAnyTeamInLeague, getTeamsFromLeague, assignPlayerToTeam } from '@/app/hub/actions';

const LeaguePlayers = ({ leagueId }) => {
  const [leaguePlayers, setLeaguePlayers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [showAssignTeamModal, setShowAssignTeamModal] = useState(false);
  const [playerToAssign, setPlayerToAssign] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState("");

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const players = await getPlayersFromLeague(leagueId);
        const playersWithTeamStatus = await Promise.all(players.map(async (player) => {
          const teamName = await isPlayerInAnyTeamInLeague(leagueId, player.id);
          return {
            ...player,
            teamName,
          };
        }));
        setLeaguePlayers(playersWithTeamStatus);
      } catch (error) {
        console.error("Error fetching players:", error);
      }
    };

    const fetchTeams = async () => {
      try {
        const teams = await getTeamsFromLeague(leagueId);
        setTeams(teams);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };

    fetchPlayers();
    fetchTeams();
  }, [leagueId]);

  const handleDeletePlayer = async (idPlayer) => {
    try {
      await removePlayerFromLeagueAndTeam(leagueId, idPlayer);
      setLeaguePlayers((prevPlayers) => prevPlayers.filter(player => player.id !== idPlayer));
    } catch (error) {
      console.error("Error deleting player:", error);
    }
  };

  const handleAssignTeam = (player) => {
    setPlayerToAssign(player);
    setShowAssignTeamModal(true);
  };

  const handleAssignTeamToPlayer = async () => {
    try {
      await assignPlayerToTeam(leagueId, playerToAssign.id, selectedTeam);
      setLeaguePlayers((prevPlayers) =>
        prevPlayers.map(player =>
          player.id === playerToAssign.id ? { ...player, teamName: selectedTeam } : player
        )
      );
      setShowAssignTeamModal(false);
      setPlayerToAssign(null);
      setSelectedTeam("");
    } catch (error) {
      console.error("Error assigning team to player:", error);
    }
  };

  return (
    <div className="w-full md:flex-grow p-4 mt-4 md:mt-0">
      <h2 className="text-xl mb-4 text-gray-700 dark:text-white py-2">
        Players in league
      </h2>
      <div className="overflow-y-auto">
        <ul className="space-y-2">
          {leaguePlayers.map((player) => (
            <li
              key={player.id}
              className="p-2 rounded flex justify-between items-center bg-sidebar-light dark:bg-sidebar-dark text-white dark:text-gray-100"
            >
              <span>{player.name}</span>
              <div className="flex items-center">
                {player.teamName ? (
                  <span className="mr-2">Team: {player.teamName}</span>
                ) : (
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2"
                    onClick={() => handleAssignTeam(player)}
                  >
                    Assign Team
                  </button>
                )}
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded-md"
                  onClick={() => handleDeletePlayer(player.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {showAssignTeamModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white dark:bg-background-dark p-4 rounded-md">
            <h2 className="text-xl mb-4 text-gray-700 dark:text-white">
              Assign Team to {playerToAssign.name}
            </h2>
            <select
              value={selectedTeam}
              onChange={(e) => setSelectedTeam(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              <option value="" disabled>Select a team</option>
              {teams.map((team) => (
                <option key={team.id_team} value={team.name}>
                  {team.name}
                </option>
              ))}
            </select>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
              onClick={handleAssignTeamToPlayer}
            >
              Assign Team
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-md mt-4 ml-2"
              onClick={() => setShowAssignTeamModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaguePlayers;
