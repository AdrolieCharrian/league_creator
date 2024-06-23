"use client";
import { useState, useEffect } from "react";
import TeamLeagueCard from "@/app/components/TeamLeagueCard";
import { getTeamsFromLeague } from "../../../actions";
import ModalCreateTeam from "@/app/components/teams/modalCreateTeam";

const LeaguesTeams = ({ params: { id } }) => {
  const [teamsData, setTeamsData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log(teamsData)

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTeamsFromLeague(id);
      setTeamsData(data);
    };

    fetchData();
  }, [id]);

  const getTeams = async () => {
    const teamsData = await getTeamsFromLeague(id)
    setTeamsData(teamsData)
  }

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  return (
    <div className="h-100 w-100">
      <div className="mb-3">
        <button
          className="bg-sidebar-light dark:bg-sidebar-dark hover:bg-sidebar-light2 dark:hover:bg-sidebar-dark2 text-white font-bold py-2 px-4 rounded"
          onClick={openModal}
        >
          Create Team
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {teamsData.map((team, index) => (
          <TeamLeagueCard key={index} team={team} leagueId={id} />
        ))}
      </div>
      {isModalOpen && (
        <ModalCreateTeam onClickClose={closeModal} param={id} afterSubmit={getTeams} />
      )}
    </div>
  );
};

export default LeaguesTeams;


