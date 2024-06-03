"use client";
import PlayerCard from "@/app/components/PlayerCard";
import { useState, useEffect } from "react";
import { getPlayersFromTeam } from "@/app/hub/actions";

export default function Players({ params: { teamId } }) {
  const [playersData, setPlayersData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPlayersFromTeam(teamId);
      setPlayersData(data);
    };

    fetchData();
  }, [teamId]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
      {playersData.map((player, index) => (
        <PlayerCard id={player.id_player} key={index} />
      ))}
    </div>
  );
}
