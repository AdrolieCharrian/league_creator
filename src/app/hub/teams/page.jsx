"use client";
import { useEffect, useState } from "react";
import TeamCard from "@/app/components/TeamCard";
import { getTeamsFromUser } from "../actions";

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getTeams = async () => {
    try {
      const teamsData = await getTeamsFromUser();
      setTeams(teamsData);
      sessionStorage.setItem("teams", JSON.stringify(teamsData));
    } catch (error) {
      console.error("Failed to fetch teams:", error);
    }
  };

  useEffect(() => {
    const storedTeams = sessionStorage.getItem("teams");
    if (storedTeams) {
      setTeams(JSON.parse(storedTeams));
    } else {
      getTeams();
    }
  }, []);

  return (
    <div className="h-100 w-100">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {teams.map((team, index) => (
          <TeamCard key={index} team={team} />
        ))}
      </div>
    </div>
  );
};

export default Teams;
