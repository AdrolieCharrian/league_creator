"use client";
import Image from "next/image";
import {useState} from "react";
import "./sidebar.css";
import Link from "next/link";

export default function Sidebar({}) {
  const [open, setOpen] = useState(true);
  const Menus = [
    {title: "My profile", src: "user-light", url: "profile"},
    {title: "My leagues", src: "league-light", url: "leagues"},
    {title: "My teams", src: "team-light", url: "teams"},
  ];

  return (
    <div
      className={`${
        open ? "w-72" : "w-20"
      } duration-100 h-screen bg-sidebar-light relative p-5 pt-6`}
    >
      <div className="flex gap-x-4 items-center">
        <Image
          src="/sidebar/logo.png"
          width={40}
          height={40}
          className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"}`}
          alt=""
        />
        <h1
          className={`text-white origin-left font-medium text-xl duration-300 ${
            !open && "scale-0"
          }`}
        >
          Nombre
        </h1>
      </div>
      <div className="triangle-container">
        <Image
          src="/sidebar/control-light.png"
          width={28}
          height={28}
          className={`absolute cursor-pointer -right-3 top-9 w-6 h-100 bg-white rounded-full border-2 border-sidebar-light ${
            !open && "rotate-180"
          }`}
          alt=""
          onClick={() => setOpen(!open)}
        />
        <ul className="pt-7 mt-10 p-3 ">
          {Menus.map((menu, index) => (
            <li
              key={index}
              className={`text-white text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-3`}
            >
              <Link href={`/hub/${menu.url}`}>
                <Image
                  src={`/sidebar/${menu.src}.png`}
                  width={35}
                  height={35}
                  alt=""
                  className={`${!open ? "ms-1 p-0.5" : ""}`}
                />
              </Link>
              <Link href={`/hub/${menu.url}`}>
                <span
                  className={`text-white origin-left font-medium text-md duration-500 ${
                    !open && "scale-0"
                  }`}
                >
                  {open ? menu.title : ""}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="triangle"></div>
      </div>
    </div>
  );
}
