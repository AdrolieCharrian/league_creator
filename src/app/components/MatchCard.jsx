"use client";

import { CldImage } from 'next-cloudinary';

export default function MatchCard({ match, teams }) {
  const teamOne = teams.find(team => team.name === match.teamOne.name);
  const teamTwo = teams.find(team => team.name === match.teamTwo.name);

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

  return (
    <div className="flex items-center justify-between bg-white shadow-md p-4 rounded-lg">
      <div className="w-1/6">
        <CldImage
          className="w-full h-auto rounded-lg"
          width="50"
          height="50"
          alt={`${teamOne.name} logo`}
          crop="fill"
          src={teamOne.image}
        />
      </div>
      <div className="flex-grow text-center px-4">
        <h3 className="text-xl font-bold">{match.sport}</h3>
        <p className="text-lg font-medium">{teamOne.name} <span className="text-gray-500">vs</span> {teamTwo.name}</p>
      </div>
      <div className="w-1/6">
        <CldImage
          className="w-full h-auto rounded-lg"
          width="50"
          height="50"
          alt={`${teamTwo.name} logo`}
          crop="fill"
          src={teamTwo.image}
        />
      </div>
    </div>
  );
}
