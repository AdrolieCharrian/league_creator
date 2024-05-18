'use client'
import LeagueCard from "@/app/components/LeagueCard";
import { identifyUser, getLeaguesFromUser } from "./../actions";
import { useEffect, useState } from "react";

const Leagues = () => {
  const [leagues, setLeagues] = useState([]); // Inicializar con un array vacío

  useEffect(() => {
    const fetchLeagues = async () => {
      const leaguesData = await getLeaguesFromUser();
      setLeagues(leaguesData);
    };
    fetchLeagues();
  }, []);

  return (
    <div className="h-100 w-100">
      <div className="mb-3">
        <form action={identifyUser}>
          <button className="bg-sidebar-light hover:bg-sidebar-light2 text-white font-bold py-2 px-4 rounded">
            Create League
          </button>
        </form>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {leagues.map((league, index) => (
          <LeagueCard key={index} league={league} />
        ))}
      </div>
    </div>
  );
};

export default Leagues;
