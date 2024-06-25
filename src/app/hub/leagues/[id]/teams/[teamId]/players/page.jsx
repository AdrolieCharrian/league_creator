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
    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {playersData.map((player, index) => (
        <PlayerCard id={player.id_player} key={index} />
      ))}
    </div>
  );
}
