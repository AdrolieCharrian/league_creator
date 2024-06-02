"use client";
import Image from "next/image";
import Link from "next/link";
import PlayerCard from "@/app/components/PlayerCard";
import { useState, useEffect } from "react";
import { getPlayersFromTeam } from "@/app/hub/actions";

export default function Players({ params: { id,teamId } }) {
  const [playersData, setPlayersData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPlayersFromTeam(id,teamId);
      setPlayersData(data);
    };

    fetchData();
  }, [id,teamId]);

  return (<div>
    {/* <h1 className="text-white"> {id}</h1>
    <h1 className="text-white">{teamId}</h1> */}
  </div>);
}
