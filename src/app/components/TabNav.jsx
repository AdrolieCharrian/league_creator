'use client'
import React from "react";
import { useRouter } from 'next/navigation';

export function TabNav({ id }) {
  const router = useRouter();

  const handleTabClick = (tab) => {
    router.push(`/hub/leagues/${id}/${tab}`);
  };

  return (
    <div className="flex bg-gray-100 p-2 rounded-lg">
      <button
        className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded"
        onClick={() => handleTabClick('leaderboard')}
      >
        <span className="material-icons">leaderboard</span>
        <span>Leaderboard</span>
      </button>
      <button
        className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded"
        onClick={() => handleTabClick('matches')}
      >
        <span className="material-icons">sports_soccer</span>
        <span>Matches</span>
      </button>
      <button
        className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded"
        onClick={() => handleTabClick('teams')}
      >
        <span className="material-icons">group</span>
        <span>Teams</span>
      </button>
    </div>
  );
}
