"use client";
import React, { useState, useEffect } from "react";
import { getSportsFromLeague, deleteSportFromLeague } from '@/app/hub/actions';

const LeagueSports = ({ leagueId }) => {
  const [leagueSports, setLeagueSports] = useState([]);
  const [showAddSportModal, setShowAddSportModal] = useState(false);

  useEffect(() => {
    const fetchSports = async () => {
      try {
        const sports = await getSportsFromLeague(leagueId);
        setLeagueSports(sports);
      } catch (error) {
        console.error("Error fetching sports:", error);
      }
    };
    fetchSports();
  }, [leagueId]);

  const handleDeleteSport = async (idSportLeague) => {
    try {
      await deleteSportFromLeague(idSportLeague);
      setLeagueSports((prevSports) => prevSports.filter(sport => sport.id_sport_league !== idSportLeague));
    } catch (error) {
      console.error("Error deleting sport:", error);
    }
  };

  return (
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
          {leagueSports.map((sport, index) => (
            <li
              key={index}
              className="p-2 rounded flex justify-between items-center bg-white dark:bg-sidebar-dark text-gray-900 dark:text-gray-100"
            >
              {sport.name}
              <button
                className="bg-red-500 text-white px-2 py-1 rounded-md"
                onClick={() => handleDeleteSport(sport.id_sport_league)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>

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

export default LeagueSports;
