"use client";

import { useState, useEffect } from "react";
import MatchCard from "@/app/components/MatchCard";
import { getMatchesFromLeague, generateMatchesForLeague, getTeamsFromLeague } from "@/app/hub/actions";

const Matches = ({ params: { id } }) => {
  const [matches, setMatches] = useState([]);
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchMatchesAndTeams = async () => {
      const initialMatches = await getMatchesFromLeague(id);
      const initialTeams = await getTeamsFromLeague(id);
      console.log("Initial Matches: ", initialMatches);
      console.log("Initial Teams: ", initialTeams);
      setMatches(initialMatches);
      setTeams(initialTeams);
    };

    fetchMatchesAndTeams();
  }, [id]);

  const handleGenerateMatches = async () => {
    await generateMatchesForLeague(id);
    const updatedMatches = await getMatchesFromLeague(id);
    console.log("Updated Matches: ", updatedMatches);
    setMatches(updatedMatches);
  };

  return (
    <div className="h-full w-full p-4">
      <button 
        onClick={handleGenerateMatches} 
        className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Generate Matches
      </button>
      <div className="grid grid-cols-1 gap-4">
        {matches.map((match) => (
          <MatchCard key={match.id_match} match={match} teams={teams} />
        ))}
      </div>
    </div>
  );
};

export default Matches;
