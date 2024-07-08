"use client";
import React from "react";
import LeaguePlayers from "@/app/components/LeaguePlayers";
import LeagueSports from "@/app/components/LeagueSports";
import LeagueInfoForm from "@/app/components/LeagueInfoForm";
import LeagueTeams from "@/app/components/LeagueTeams";

const Admin = ({ params: { id } }) => {
  return (
    <div className="h-full w-full pt-3">
      <LeagueInfoForm leagueId={id} />
      <LeagueTeams leagueId={id}/>
      <div className="flex flex-col md:flex-row mt-4">
        <LeagueSports leagueId={id} />
        <LeaguePlayers leagueId={id} />
      </div>
    </div>
  );
};

export default Admin;
