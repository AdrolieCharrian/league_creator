"use client";
import React, { useState, useEffect } from "react";
import { getTeamsFromLeague, deleteTeamWithPlayers } from '@/app/hub/actions';

const LeagueTeams = ({ leagueId }) => {
  const [teams, setTeams] = useState([]);

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

  const handleDeleteTeam = async (teamId) => {
    try {
      await deleteTeamWithPlayers(teamId);
      setTeams((prevTeams) => prevTeams.filter(team => team.id_team !== teamId));
    } catch (error) {
      console.error("Error deleting team:", error);
    }
  };

  return (
    <div className="w-full  p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl text-gray-700 dark:text-white py-2">
          Teams
        </h2>
      </div>
      <div className="overflow-y-auto">
        <ul className="space-y-2">
          {teams.map((team, index) => (
            <li
              key={index}
              className="p-2 rounded flex justify-between items-center bg-sidebar-light dark:bg-sidebar-dark text-white dark:text-gray-100"
            >
              {team.name}
              <button
                className="bg-red-500 hover:bg-red-800 text-white px-2 py-1 rounded-md"
                onClick={() => handleDeleteTeam(team.id_team)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LeagueTeams;
