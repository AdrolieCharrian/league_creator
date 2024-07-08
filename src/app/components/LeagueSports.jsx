"use client";
import React, { useState, useEffect } from "react";
import { getSportsFromLeague, deleteSportFromLeague, addPredefinedSportToLeague, addCustomSportToLeague, getPredefinedSports } from '@/app/hub/actions';

const LeagueSports = ({ leagueId }) => {
  const [leagueSports, setLeagueSports] = useState([]);
  const [showAddSportModal, setShowAddSportModal] = useState(false);
  const [predefinedSports, setPredefinedSports] = useState([]);
  const [selectedSport, setSelectedSport] = useState(null);
  const [customSport, setCustomSport] = useState({ name: '', description: '', rules: '', num_players: 0 });

  useEffect(() => {
    const fetchSports = async () => {
      try {
        const sports = await getSportsFromLeague(leagueId);
        setLeagueSports(sports);
        const predefinedSports = await getPredefinedSports();
        setPredefinedSports(predefinedSports);
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

  const handleAddSport = async () => {
    try {
      if (selectedSport) {
        await addPredefinedSportToLeague(leagueId, selectedSport);
      } else if (customSport.name) {
        await addCustomSportToLeague(leagueId, customSport);
      } else {
        console.error("No sport selected or custom sport details missing.");
        return;
      }
      setShowAddSportModal(false);
      setSelectedSport(null); // Reset selected sport
      setCustomSport({ name: '', description: '', rules: '', num_players: 0 }); // Reset custom sport fields
      const sports = await getSportsFromLeague(leagueId);
      setLeagueSports(sports);
    } catch (error) {
      console.error("Error adding sport:", error);
    }
  };

  return (
    <div className="w-full md:w-1/3 p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl text-gray-700 dark:text-white py-2">
          Sports
        </h2>
        <button
          className="bg-sidebar-light hover:bg-sidebar-light2 dark:hover:bg-sidebar-dark2 dark:bg-sidebar-dark text-white px-4 py-2 rounded-md"
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
              className="p-2 rounded flex justify-between items-center bg-sidebar-light dark:bg-sidebar-dark text-white dark:text-gray-100"
            >
              {sport.name}
              <button
                className="bg-red-500 hover:bg-red-800 text-white px-2 py-1 rounded-md"
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
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Select Predefined Sport</label>
              <select
                className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                onChange={(e) => {
                  setSelectedSport(e.target.value);
                  setCustomSport({ name: '', description: '', rules: '', num_players: 0 }); // Reset custom sport fields if predefined sport is selected
                }}
                value={selectedSport || ''}
              >
                <option value="">Select a sport</option>
                {predefinedSports.map((sport) => (
                  <option key={sport.id_sport} value={sport.id_sport}>
                    {sport.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Or Add Custom Sport</label>
              <input
                type="text"
                placeholder="Sport Name"
                className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                value={customSport.name}
                onChange={(e) => setCustomSport({ ...customSport, name: e.target.value })}
                disabled={!!selectedSport} // Disable if a predefined sport is selected
              />
              <input
                type="text"
                placeholder="Description"
                className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                value={customSport.description}
                onChange={(e) => setCustomSport({ ...customSport, description: e.target.value })}
                disabled={!!selectedSport} // Disable if a predefined sport is selected
              />
              <input
                type="text"
                placeholder="Rules"
                className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                value={customSport.rules}
                onChange={(e) => setCustomSport({ ...customSport, rules: e.target.value })}
                disabled={!!selectedSport} // Disable if a predefined sport is selected
              />
              <input
                type="number"
                placeholder="Number of Players"
                className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                value={customSport.num_players}
                onChange={(e) => setCustomSport({ ...customSport, num_players: parseInt(e.target.value) })}
                disabled={!!selectedSport} // Disable if a predefined sport is selected
              />
            </div>
            <div className="mt-4 flex justify-end">
              <button
                className="bg-sidebar-light hover:bg-sidebar-light2 dark:hover:bg-sidebar-dark2 dark:bg-sidebar-dark text-white px-4 py-2 rounded-md"
                onClick={handleAddSport}
              >
                Add Sport
              </button>
              <button
                className="bg-red-500 hover:bg-red-800 text-white px-4 py-2 rounded-md ml-2"
                onClick={() => setShowAddSportModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeagueSports;