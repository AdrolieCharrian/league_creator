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
      console.log(data);
    };

    fetchData();
  }, [id]);

  if (!playerInfo) {
    return <div className="dark:text-white">Loading...</div>;
  }

  return (
    <div className="flip-card w-full max-w-xs mx-auto rounded-lg text-center mt-4 md:mb-5 relative">
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
        <div className="flip-card-back bg-gradient-to-b from-sidebar-light to-sidebar-light2 dark:from-sidebar-dark dark:to-sidebar-dark2 flex items-center justify-center">
          <h1 className="text-white text-9xl">
            {playerInfo.favnumber}
          </h1>
        </div>
      </div>
    </div>
  );
}
