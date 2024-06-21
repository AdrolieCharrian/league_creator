"use client";
import React, { useState, useEffect } from "react";
import LeaguePlayers from "@/app/components/LeaguePlayers";
import LeagueSports from "@/app/components/LeagueSports";

const Admin = ({ params: { id } }) => {
  return (
    <div className="h-full w-full pt-3">
      <div className="bg-background-light dark:bg-background-dark p-4">
        <h2 className="text-xl mb-4 text-gray-700 dark:text-white">
          League info
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              League Name
            </label>
            <input
              type="text"
              className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Description
            </label>
            <textarea className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Image
            </label>
            <input
              type="file"
              className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
          </div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Save
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row mt-4">
        <LeagueSports leagueId={id} />
        <LeaguePlayers leagueId={id} />
      </div>
    </div>
  );
};

export default Admin;