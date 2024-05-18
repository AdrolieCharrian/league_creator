"use client";
import Image from "next/image";
import "./sidebar.css";
import Link from "next/link";

export default function LeagueCard({ league }) {
  return (
    <Link href={`/hub/leagues/teams`}>
      <div className="w-100 rounded-lg overflow-hidden shadow-lg text-center bg-background-light mt-1">
        <Image
          src="/sidebar/logo.png"
          width={300}
          height={300}
          className="cursor-pointer duration-500 w-full p-3"
          alt=""
        />
        <div className="py-4">
          <div className="font-bold text-xl mb-2">{league.name}</div>
        </div>
      </div>
    </Link>
  );
}
