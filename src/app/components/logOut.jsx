"use client";
import React from "react";

export const LogOut = () => {
  const delete_cookie = (name) => {
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  };

  return (
    <div>
      <button
        className="w-full bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        onClick={() => delete_cookie("access-token")}
      >
        Log Out
      </button>
    </div>
  );
};
