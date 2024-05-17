import React from "react";
import LeagueCard from "@/app/components/LeagueCard";
import { getLeaguesFromUser,identifyUser } from "./../actions";
import {cookies} from "next/headers";
import jwt from "jsonwebtoken";

const Leagues = () => {
  const token = cookies().get("access-token");
  if (token) {
    const user = jwt.decode(token.value);
    console.log(user);
  }

  return (
    <div className="h-100 w-100 ">
      <div className="mb-3">
        <form action={identifyUser}>
          <button className="bg-sidebar-light hover:bg-sidebar-light2 text-white font-bold py-2 px-4 rounded">
            Create League
          </button>
        </form>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 ">
        <LeagueCard />
        <LeagueCard />
        <LeagueCard />
        <LeagueCard />
        <LeagueCard />
        <LeagueCard />
      </div>
    </div>
  );
};

export default Leagues;
