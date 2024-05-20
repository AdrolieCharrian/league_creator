"use client";
import { useEffect, useState } from "react";
import TeamLeagueCard from "@/app/components/TeamLeagueCard";
import { getTeamsFromLeague } from "../../actions";

const LeaguesTeams = () => {
  const [teamsLeague, setTeamsLeague] = useState([]);

  const getTeamsLeague = async () => {
    try {
      const teamsData = await getTeamsFromLeague(id_league);
      setTeams(teamsData);
      sessionStorage.setItem("teamsLeague", JSON.stringify(teamsData));
    } catch (error) {
      console.error("Failed to fetch teamsLeague:", error);
    }
  };

  useEffect(() => {
    const storedTeamsLeague = sessionStorage.getItem("teamsLeague");
    const id_league = sessionStorage.getItem("id_league");
    if (storedTeamsLeague) {
      setTeamsLeague(JSON.parse(storedTeamsLeague));
    } else {
      getTeamsLeague(id_league);
    }
  }, []);

  return (
    <div className="h-100 w-100">
       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {teamsLeague.map((team, index) => (
          <TeamLeagueCard key={index} team={team} />
        ))}
      </div>
    </div>
  );
};

export default LeaguesTeams;
