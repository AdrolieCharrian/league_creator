"use client";
import Link from "next/link";
import "./sidebar.css";
import Image from "next/image";
import { ChevronFirst, ChevronLast } from "lucide-react";
import { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Merienda } from "next/font/google";

const SidebarContext = createContext();
const merienda = Merienda({ subsets: ["latin"] });

export default function NewSidebar({ children, name, image }) {
  const [expanded, setExpanded] = useState(true);
  const pathname = usePathname(); // Get the current pathname
  const [activeItem, setActiveItem] = useState(""); // State to track the active item

  useEffect(() => {
    // Set the active item based on the current pathname
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
      default:
        setActiveItem("");
    }
  }, [pathname]);

  const handleSetActive = (text) => {
    setActiveItem(text);
  };

  return (
    <SidebarContext.Provider value={{ expanded, activeItem, handleSetActive }}>
      <div className="h-screen flex flex-col bg-sidebar-light border-r shadow-sm relative">
        <div className="p-4 pb-2 flex justify-between items-center">
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
              expanded ? " me-6 text-white font-bold font-merienda" : "w-0"
            }`}
          >
            League Manager
          </h2>

          <button
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
            onClick={() => setExpanded((current) => !current)}
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>
        <ul className="flex-1 px-3">{children}</ul>
        <div className="triangle-container absolute bottom-0 w-full h-24">
          <div className="border-t flex p-3">
            <Image
              src={"/sidebar/logo.png"}
              width={400}
              height={400}
              className={"w-10 h-10 rounded-md"}
              alt="logo"
            />
            <div
              className={`flex justify-between items-center overflow-hidden transition-all ${
                expanded ? "w-52 ml-3" : "w-0"
              }`}
            >
              <div className="leading-4">
                <h4 className="font-semibold ms-2">{name}</h4>
              </div>
            </div>
          </div>
        </div>
        <div className="triangle w-full h-full"></div>
        <div className="border-t flex p-3 z-10">
          <Image
            src={image}
            width={400}
            height={400}
            className={"w-10 h-10 rounded-full border"}
            alt="logo"
          />
          <div
            className={`flex justify-between items-center overflow-hidden transition-all ${
              expanded ? "w-52 ml-3" : "w-0"
            }`}
          >
            <div className="leading-4">
              <h4 className="font-semibold ms-2">{name}</h4>
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
          ? "bg-sidebar-light2 "
          : "hover:bg-sidebar-light2 text-gray-600"
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
