"use client";
import React, { useState, useEffect } from "react";
import LeaguePlayers from "@/app/components/LeaguePlayers";

const Admin = ({ params: { id } }) => {
  const [showAddSportModal, setShowAddSportModal] = useState(false);

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
        <div className="w-full md:w-1/3 p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl text-gray-700 dark:text-white py-2">
              Sports
            </h2>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
              onClick={() => setShowAddSportModal(true)}
            >
              Add Sport
            </button>
          </div>
          <div className="overflow-y-auto">
            <ul className="space-y-2">
              <li className="p-2 rounded flex justify-between items-center bg-white dark:bg-sidebar-dark text-gray-900 dark:text-gray-100">
                deporte1
                <button className="bg-red-500 text-white px-2 py-1 rounded-md">
                  Delete
                </button>
              </li>
              <li className="p-2 rounded flex justify-between items-center bg-white dark:bg-sidebar-dark text-gray-900 dark:text-gray-100">
                deporte2
                <button className="bg-red-500 text-white px-2 py-1 rounded-md">
                  Delete
                </button>
              </li>
              <li className="p-2 rounded flex justify-between items-center bg-white dark:bg-sidebar-dark text-gray-900 dark:text-gray-100">
                deporte3
                <button className="bg-red-500 text-white px-2 py-1 rounded-md">
                  Delete
                </button>
              </li>
            </ul>
          </div>
        </div>
        <LeaguePlayers leagueId={id} />
      </div>

      {/* Add Sport Modal */}
      {showAddSportModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white dark:bg-background-dark p-4 rounded-md">
            <h2 className="text-xl mb-4 text-gray-700 dark:text-white">
              Add Sport
            </h2>
            <input
              type="text"
              placeholder="Sport Name"
              className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
              onClick={() => setShowAddSportModal(false)}
            >
              Add Sport
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-md mt-4 ml-2"
              onClick={() => setShowAddSportModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
