"use client";
import Link from "next/link";
import "./sidebar.css";
import Image from "next/image";
import { ChevronFirst, ChevronLast } from "lucide-react";
import { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const SidebarContext = createContext();

export default function NewSidebar({ children, name, image }) {
  const [expanded, setExpanded] = useState(true);
  const pathname = usePathname();
  const [activeItem, setActiveItem] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    switch (pathname) {
      case "/":
        setActiveItem("Home");
        break;
      case "/hub/profile":
        setActiveItem("Profile");
        break;
      case "/hub/leagues":
        setActiveItem("Leagues");
        break;
      case "/hub/teams":
        setActiveItem("Teams");
        break;
      case "/hub/invitations":
        setActiveItem("Invitations");
        break;
      default:
        setActiveItem("");
    }
  }, [pathname]);

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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setExpanded(false);
      }
    };

    // Set initial state based on window size
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSetActive = (text) => {
    setActiveItem(text);
  };

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
    <SidebarContext.Provider value={{ expanded, activeItem, handleSetActive }}>
      <div
        className={`h-screen flex flex-col bg-sidebar-light dark:bg-sidebar-dark shadow-sm relative transition-colors`}
      >
        <div className={`p-4 pb-2 justify-between items-center hidden sm:flex`}>
          <Image
            src={`/sidebar/logo.png`}
            width={500}
            height={500}
            className={`overflow-hidden transition-all ${
              expanded ? "w-12 h-12" : "w-0"
            }`}
            alt="logo"
          />
          <h2
            className={`overflow-hidden transition-all ${
              expanded ? "me-6 text-white font-bold font-merienda" : "w-0"
            }`}
          >
            League Manager
          </h2>

          <button
            className="p-1.5 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white"
            onClick={() => setExpanded((current) => !current)}
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <ul className="flex-1 px-3">
          <div className="sm:hidden flex justify-center mt-3 mb-2">
            <button
              onClick={toggleDarkMode}
              className="px-1 py-1 text-sm bg-gray-200 rounded-full hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white text-black"
            >
              {isDarkMode ? "Light" : "Dark"}
            </button>
          </div>
          {children}
        </ul>

        <div className="triangle-container absolute bottom-0 w-full h-24">
          <div className="border-t dark:border-gray-700 flex p-3">
            <Image
              src={"/sidebar/logo.png"}
              width={400}
              height={400}
              className="w-10 h-10 rounded-md"
              alt="logo"
            />
            <div
              className={`flex justify-between items-center overflow-hidden transition-all ${
                expanded ? "w-52 ml-3" : "w-0"
              }`}
            >
              <div className="leading-4">
                <h4 className="font-semibold ms-2 text-white">{name}</h4>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`triangle w-full h-full bg-sidebar-light2 dark:bg-sidebar-dark2`}
        ></div>

        <div className="border-t flex p-3 z-10 relative">
          <Image
            src={image}
            width={400}
            height={400}
            className="w-10 h-10 rounded-full border"
            alt="logo"
          />
          <div
            className={`flex justify-between items-center overflow-hidden transition-all ${
              expanded ? "w-52 ml-3" : "w-0"
            }`}
          >
            <div className="leading-4">
              <h4 className="font-semibold ms-2 text-white">{name}</h4>
            </div>
            <div className="hidden sm:flex">
              <button
                onClick={toggleDarkMode}
                className="px-3 py-1 bg-gray-200 rounded-full hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white text-black"
              >
                {isDarkMode ? "Light" : "Dark"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </SidebarContext.Provider>
  );
}

export function SidebarItem({ icon, text, link }) {
  const { expanded, activeItem, handleSetActive } = useContext(SidebarContext);
  const isActive = activeItem === text;

  return (
    <li
      className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${
        isActive
          ? "bg-sidebar-light2 dark:bg-sidebar-dark2"
          : "hover:bg-sidebar-light2 dark:hover:bg-sidebar-dark2 text-gray-600 dark:text-gray-300"
      }`}
      onClick={() => handleSetActive(text)}
    >
      <Link href={link} passHref className="flex items-center w-full">
        <p className="text-white">{icon}</p>
        <span
          className={`overflow-hidden transition-all ${
            expanded ? "w-52 ml-3" : "w-0"
          }`}
        >
          <p className="text-white">{text}</p>
        </span>
      </Link>
    </li>
  );
}
