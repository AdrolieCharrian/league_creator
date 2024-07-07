"use client";

import { useState, useEffect } from "react";
import MatchCard from "@/app/components/MatchCard";
import {
  getMatchesFromLeague,
  generateMatchesForLeague,
  getTeamsFromLeague,
  getUserInfo,
  isAdmin
} from "@/app/hub/actions";

const Matches = ({ params: { id } }) => {
  const [matches, setMatches] = useState([]);
  const [teams, setTeams] = useState([]);
  const [isitadmin, setIsItAdmin] = useState();

  useEffect(() => {
    const fetchMatchesAndTeams = async () => {
      const initialMatches = await getMatchesFromLeague(id);
      const initialTeams = await getTeamsFromLeague(id);
      setMatches(initialMatches);
      setTeams(initialTeams);
    };

    fetchMatchesAndTeams();
  }, [id]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userId = await getUserInfo();
      const admin = await isAdmin(id, userId);
      setIsItAdmin(admin);
    };

    fetchUserInfo();
  }, [id]);

  const handleGenerateMatches = async () => {
    if (
      window.confirm("After creating the matches, there is no turning back.")
    ) {
      await generateMatchesForLeague(id);
      const updatedMatches = await getMatchesFromLeague(id);
      setMatches(updatedMatches);
    }
  };

  return (
    <div className="h-full w-full p-4">
      {isitadmin && matches.length === 0 && (
        <button
          onClick={handleGenerateMatches}
          className="mb-4 bg-sidebar-light hover:bg-sidebar-light2 dark:hover:bg-sidebar-dark2 dark:bg-sidebar-dark text-white font-bold py-2 px-4 rounded"
        >
          Generate Matches
        </button>
      )}
      <div className="grid grid-cols-1 gap-4">
        {matches.map((match) => (
          <MatchCard key={match.id_match} match={match} teams={teams} admin={isitadmin}/>
        ))}
      </div>
    </div>
  );
};

export default Matches;
