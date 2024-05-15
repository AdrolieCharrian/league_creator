import React from "react";
import LeagueCard from "@/app/components/LeagueCard";

const Leagues = () => {
  return (
    <div className="h-100 w-100">
      <div className="mb-3">
        <button className="bg-sidebar-light hover:bg-sidebar-light2 text-white font-bold py-2 px-4 rounded">Create League</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        <LeagueCard />
        <LeagueCard />
        <LeagueCard />
        <LeagueCard />
      </div>
    </div>
  );
};

export default Leagues;
