"use client";
import Image from "next/image";
import "./sidebar.css";

export default function LeagueCard() {
  return (
    <div className="w-72 rounded-lg overflow-hidden shadow-lg text-center bg-background-light">
      <Image
        src="/sidebar/logo.png"
        width={200}
        height={200}
        className={`cursor-pointer duration-500 w-full p-3`}
        alt=""
      />
      <div className="py-4">
        <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
      </div>
    </div>
  );
}
