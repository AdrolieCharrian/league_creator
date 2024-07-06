import React, { useState, useEffect } from "react";
import {
  getPlayersFromLeague,
  removePlayerFromLeagueAndTeam,
  isPlayerInAnyTeamInLeague,
  getTeamsFromLeague,
  assignPlayerToTeam,
  removePlayerFromTeamAssigned,
  getUsersNotInLeague,
  createInvitation
} from '@/app/hub/actions';

const LeaguePlayers = ({ leagueId }) => {
  const [leaguePlayers, setLeaguePlayers] = useState([]);
  const [showAssignTeamModal, setShowAssignTeamModal] = useState(false);
  const [playerToAssign, setPlayerToAssign] = useState(null);
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState('');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

useEffect(() => {
  const fetchPlayers = async () => {
    try {
      const playersWithTeamStatus = await getPlayersFromLeague(leagueId);
      setLeaguePlayers(playersWithTeamStatus);
    } catch (error) {
      console.error("Error fetching players:", error);
    }
  };
  fetchPlayers();
}, [leagueId]);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const teams = await getTeamsFromLeague(leagueId);
        setTeams(teams);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };
    fetchTeams();
  }, [leagueId]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersNotInLeague = await getUsersNotInLeague(leagueId);
        setUsers(usersNotInLeague);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, [leagueId]);

  const handleDeletePlayer = async (idPlayer) => {
    try {
      await removePlayerFromLeagueAndTeam(leagueId, idPlayer);
      setLeaguePlayers((prevPlayers) => prevPlayers.filter(player => player.id !== idPlayer));
    } catch (error) {
      console.error("Error deleting player:", error);
    }
  };

  const handleRemovePlayerFromTeam = async (idPlayer) => {
    try {
      await removePlayerFromTeamAssigned(leagueId, idPlayer);
      setLeaguePlayers((prevPlayers) => 
        prevPlayers.map((player) => 
          player.id === idPlayer ? { ...player, teamName: null } : player
        )
      );
    } catch (error) {
      console.error("Error removing player from team:", error);
    }
  };

  const handleAssignTeam = (player) => {
    setPlayerToAssign(player);
    setShowAssignTeamModal(true);
  };

  const handleConfirmAssignTeam = async () => {
    try {
      await assignPlayerToTeam(leagueId, playerToAssign.id, selectedTeam);
      setLeaguePlayers((prevPlayers) =>
        prevPlayers.map((player) =>
          player.id === playerToAssign.id ? { ...player, teamName: selectedTeam } : player
        )
      );
      setShowAssignTeamModal(false);
      setSelectedTeam('');
    } catch (error) {
      console.error("Error assigning team:", error);
    }
  };

  const handleInvite = async () => {
    if (selectedUser) {
      try {
        await createInvitation(selectedUser, leagueId);
        alert("Invitation sent successfully!");
        setShowInviteModal(false);
      } catch (error) {
        console.error("Error creating invitation:", error);
        alert("Failed to send invitation.");
      }
    } else {
      alert("Please select a user to invite.");
    }
  };

  return (
    <div className="w-full md:flex-grow p-4 mt-4 md:mt-0">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl text-gray-700 dark:text-white py-2">
          Players in league
        </h2>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={() => setShowInviteModal(true)}
        >
          Invite Players
        </button>
      </div>
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
                  <>
                    <span className="mr-2">Team: {player.teamName}</span>
                    <button
                      className="bg-yellow-500 text-white px-2 py-1 rounded-md mr-2"
                      onClick={() => handleRemovePlayerFromTeam(player.id)}
                    >
                      Remove from Team
                    </button>
                  </>
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
              <option value="">Select a team</option>
              {teams.map((team) => (
                <option key={team.id_team} value={team.name}>
                  {team.name}
                </option>
              ))}
            </select>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
              onClick={handleConfirmAssignTeam}
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

      {showInviteModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white dark:bg-background-dark p-4 rounded-md">
            <h2 className="text-xl mb-4 text-gray-700 dark:text-white">
              Invite Player
            </h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Select User</label>
              <select
                className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                onChange={(e) => setSelectedUser(e.target.value)}
                value={selectedUser || ''}
              >
                <option value="">Select a user</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                onClick={handleInvite}
              >
                Invite
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md ml-2"
                onClick={() => setShowInviteModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaguePlayers;
