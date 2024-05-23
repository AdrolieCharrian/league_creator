"use client";
import "./sidebar.css";
import Image from "next/image";
import { ChevronFirst, ChevronLast, MoreVertical } from "lucide-react";
import { createContext, useContext, useState } from "react";

const SidebarContext = createContext();

export default function NewSidebar({ children }) {
  const [expanded, setExpanded] = useState(true);
  return (
    <>
      <aside className="h-screen">
        <nav className="h-full flex flex-col bg-white border-r shadow-sm">
          <div className="p-4 pb-2 flex justify-between items-center">
            <Image
              src={"/sidebar/logo.png"}
              width={400}
              height={400}
              className={`w-32 h-12 overflow-hidden transition-all ${
                expanded ? "w-32" : "w-0"
              }`}
              alt="logo"
            />
            <button
              className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
              onClick={() => setExpanded((current) => !current)}
            >
              {expanded ? <ChevronFirst /> : <ChevronLast />}
            </button>
          </div>

          <SidebarContext.Provider value={{ expanded }}>
            <ul className="flex-1 px-3">{children}</ul>
          </SidebarContext.Provider>

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
                <h4 className="font-semibold ms-2">NombreUser</h4>
              </div>
              <MoreVertical size={20} />
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
}

export function SidebarItem({ icon, text, active }) {
  const { expanded } = useContext(SidebarContext);

  return (
    <li
      className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${
        active
          ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
          : "hover:bg-indigo-50 text-gray-600"
      }`}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "w-52 ml-3" : "w-0"
        }`}
      >
        {text}
      </span>
    </li>
  );
}
