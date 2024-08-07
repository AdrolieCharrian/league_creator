"use client";
import { useState, useEffect } from "react";
import { Sun,Moon } from "lucide-react";

export default function DarkButton() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const darkModePreference =
      window.localStorage.getItem("darkMode") === "true";
    setIsDarkMode(darkModePreference);
    if (darkModePreference) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add("dark");
      window.localStorage.setItem("darkMode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      window.localStorage.setItem("darkMode", "false");
    }
  };

  return (
    <button
      onClick={toggleDarkMode}
      className=" bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white text-black text-center rounded-full border-2 p-3"
    >
      {isDarkMode ? <Sun/> : <Moon/>}
    </button>
  );
}
