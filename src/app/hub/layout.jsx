import Sidebar from "../components/Sidebar";
import "../globals.css";
import {PrismaClient} from "@prisma/client";
import {cookies} from "next/headers";
import jwt from "jsonwebtoken";

export default function RootLayout({children}) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="p-7 text-2x1 font-semibold flex-1 h-screen">
        {children}
      </div>
    </div>
  );
}
