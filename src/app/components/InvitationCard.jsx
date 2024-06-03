"use client";
import Image from "next/image";
import "./sidebar.css";
import { useState, useEffect } from "react";
import { getInfoLeague } from "../hub/actions";

export default function InvitationCard({ idLeague, idUser }) {
  const [leagueData, setLeagueData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getInfoLeague(idLeague);
      setLeagueData(data);
    };
    fetchData();
  }, [idLeague]);

  return (
    <div className=" w-100  rounded-lg overflow-hidden shadow-lg text-center bg-background-light mt-1 relative">
      <h2 className="py-3">{`You've been invitated to`}</h2>
      <div className="py-3 ">
        {leagueData && (
          <div className="font-bold text-xl mb-2">{leagueData.name}</div>
        )}
      </div>
      <div className="py-3">
      <button
          type="button"
          class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        >
          Decline
        </button>
        <button
          type="button"
          class="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Accept
        </button>
        
      </div>
    </div>
  );
}
