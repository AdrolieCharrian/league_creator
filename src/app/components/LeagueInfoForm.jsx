"use client";
import React, { useState, useEffect } from "react";
import { updateLeague, getLeagueById } from '@/app/hub/actions';

const LeagueInfoForm = ({ leagueId }) => {
  const [leagueData, setLeagueData] = useState({
    name: '',
    description: '',
  });

  useEffect(() => {
    const fetchLeagueData = async () => {
      try {
        const data = await getLeagueById(leagueId);
        setLeagueData({
          name: data.name,
          description: data.description,
        });
      } catch (error) {
        console.error("Error fetching league data:", error);
      }
    };

    fetchLeagueData();
  }, [leagueId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeagueData({
      ...leagueData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateLeague(leagueId, leagueData);
      alert("League updated successfully!");
    } catch (error) {
      console.error("Error updating league:", error);
      alert("Failed to update league.");
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark p-4">
      <h2 className="text-xl mb-4 text-gray-700 dark:text-white">
        League info
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            League Name
          </label>
          <input
            type="text"
            name="name"
            value={leagueData.name}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Description
          </label>
          <textarea
            name="description"
            value={leagueData.description}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          ></textarea>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Save
        </button>
      </form>
    </div>
  );
};

export default LeagueInfoForm;
