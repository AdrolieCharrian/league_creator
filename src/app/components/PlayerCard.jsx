"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { getPlayerInfo } from "../hub/actions";
import "./flipCard.css";

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
    <div className="flip-card w-full sm:w-64 md:w-72 lg:w-80 xl:w-96 max-w-md rounded-lg text-center mt-1 relative">
      <div className="flip-card-inner aspect-[3/4]">
        <div className="flip-card-front bg-gradient-to-b from-sidebar-light to-sidebar-light2 dark:from-sidebar-dark dark:to-sidebar-dark2">
          <Image
            src="/sidebar/logo.png"
            width={300}
            height={300}
            className="cursor-pointer duration-500 w-full h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 object-cover p-3"
            alt=""
          />
          <div className="py-4">
            <div className="font-bold text-xl mb-2 text-white">
              {playerInfo.name}
            </div>
          </div>
        </div>
        <div className="flip-card-back bg-gradient-to-b from-sidebar-light to-sidebar-light2 dark:from-sidebar-dark dark:to-sidebar-dark2">
          <div className="p-2">
            <div className="font-bold text-xl mb-2 text-white">
              Name: {playerInfo.name}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
