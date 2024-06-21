"use client";
import React, { useState, useEffect } from "react";
import { getPlayersFromLeague, removePlayerFromLeagueAndTeam, isPlayerInAnyTeamInLeague } from '@/app/hub/actions';

const LeaguePlayers = ({ leagueId }) => {
  const [leaguePlayers, setLeaguePlayers] = useState([]);
  const [showAssignTeamModal, setShowAssignTeamModal] = useState(false);
  const [playerToAssign, setPlayerToAssign] = useState(null);

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
    fetchPlayers();
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
            <input
              type="text"
              placeholder="Team Name"
              className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
              onClick={() => setShowAssignTeamModal(false)}
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
