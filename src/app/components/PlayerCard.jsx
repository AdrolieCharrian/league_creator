"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { getPlayerInfo } from "../hub/actions";

export default function PlayerCard({ id }) {
  const [playerInfo, setPlayerInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPlayerInfo(id);
      setPlayerInfo(data);
    };

    fetchData();
  }, [id]);

  if (!playerInfo) {
    return <div className="dark:text-white">Loading...</div>;
  }

  return (
    <div className="w-100 rounded-lg overflow-hidden shadow-lg text-center bg-background-light mt-1 relative">
      <Image
        src="/sidebar/logo.png"
        width={300}
        height={300}
        className="cursor-pointer duration-500 w-full p-3"
        alt=""
      />
      <div className="py-4">
        <div className="font-bold text-xl mb-2">{playerInfo.name}</div>
      </div>
    </div>
  );
}
