"use client";
import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { Crown, Shield, Swords } from "lucide-react";

export function TabNav({ id }) {
  const router = useRouter();
  const pathname = usePathname();

  const handleTabClick = (tab) => {
    router.push(`/hub/leagues/${id}/${tab}`);
  };

  const isActive = (tab) => {
    return pathname === `/hub/leagues/${id}/${tab}`;
  };

  return (
    <div className="flex bg-sidebar-light dark:bg-sidebar-dark p-2 rounded-lg">
      <button
        className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded ${
          isActive("teams")
            ? "bg-sidebar-light2 dark:bg-sidebar-dark2 text-white"
            : "text-white"
        }`}
        onClick={() => handleTabClick("teams")}
      >
        <Swords />
        <span>Teams</span>
      </button>
      <button
        className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded ${
          isActive("matches")
            ? "bg-sidebar-light2 dark:bg-sidebar-dark2 text-white"
            : "text-white"
        }`}
        onClick={() => handleTabClick("matches")}
      >
        <Shield />
        <span>Matches</span>
      </button>
      <button
        className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded ${
          isActive("leaderboard")
            ? "bg-sidebar-light2 dark:bg-sidebar-dark2 text-white"
            : "text-white"
        }`}
        onClick={() => handleTabClick("leaderboard")}
      >
        <Crown />
        <span>Leaderboard</span>
      </button>
    </div>
  );
}
