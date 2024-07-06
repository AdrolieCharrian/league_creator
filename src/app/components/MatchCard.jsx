"use client";

import { CldImage } from "next-cloudinary";
import { useState } from 'react';
import { declareWinner } from "../hub/actions";

export default function MatchCard({ match, teams, admin }) {
  const [winnerDeclared, setWinnerDeclared] = useState(false);
  const [winnerTeam, setWinnerTeam] = useState(null);

  const teamOne = teams.find((team) => team.name === match.teamOne.name);
  const teamTwo = teams.find((team) => team.name === match.teamTwo.name);

  if (!teamOne || !teamTwo) {
    return (
      <div className="flex items-center justify-between bg-white shadow-md p-4 rounded-lg">
        <div className="w-1/6">
          <p>Team not found</p>
        </div>
        <div className="flex-grow text-center px-4">
          <h3 className="text-xl font-bold">{match.sport}</h3>
          <p className="text-lg font-medium">Team not found</p>
        </div>
        <div className="w-1/6">
          <p>Team not found</p>
        </div>
      </div>
    );
  }

  const teamOneData = {
    id: teamOne.id_team,
    name: teamOne.name,
    image: teamOne.image
  };

  const teamTwoData = {
    id: teamTwo.id_team,
    name: teamTwo.name,
    image: teamTwo.image
  };

  const handleDeclareWinner = async (winnerId, loserId) => {
    try {
      await declareWinner(match.id_match, winnerId, loserId);
      setWinnerDeclared(true);
      setWinnerTeam(winnerId);
    } catch (error) {
      console.error("Failed to declare winner", error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-white shadow-md p-4 rounded-lg">
      <div className="flex flex-col items-center w-full md:w-1/6">
        <CldImage
          className="w-full h-auto rounded-lg"
          width="1000"
          height="1000"
          alt={`${teamOneData.name} logo`}
          crop="fill"
          src={teamOneData.image}
        />
        {admin && !winnerDeclared && (
          <button 
            className="mt-2 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => handleDeclareWinner(teamOneData.id, teamTwoData.id)}
          >
            Winner
          </button>
        )}
        <div className="md:hidden flex flex-col items-center mt-2">
          <button 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => handleDeclareWinner(teamOneData.id, teamTwoData.id)}
          >
            Winner
          </button>
          <p className="text-lg font-medium mt-2">{teamOneData.name}</p>
        </div>
      </div>
      <div className="flex-grow text-center px-4">
        <h3 className="text-xl font-bold">{match.sport}</h3>
        <p className="text-lg font-medium">
          {teamOneData.name} <span className="text-gray-500">vs</span> {teamTwoData.name}
        </p>
      </div>
      <div className="flex flex-col items-center w-full md:w-1/6">
        <CldImage
          className="w-full h-auto rounded-lg"
          width="1000"
          height="1000"
          alt={`${teamTwoData.name} logo`}
          crop="fill"
          src={teamTwoData.image}
        />
        {admin && !winnerDeclared && (
          <button 
            className="mt-2 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => handleDeclareWinner(teamTwoData.id, teamOneData.id)}
          >
            Winner
          </button>
        )}
        <div className="md:hidden flex flex-col items-center mt-2">
          <button 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => handleDeclareWinner(teamTwoData.id, teamOneData.id)}
          >
            Winner
          </button>
          <p className="text-lg font-medium mt-2">{teamTwoData.name}</p>
        </div>
      </div>
    </div>
  );
}
