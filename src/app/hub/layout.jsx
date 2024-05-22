import Sidebar from "../components/Sidebar";
import "../globals.css";
import {PrismaClient} from "@prisma/client";
import {cookies} from "next/headers";
import jwt from "jsonwebtoken";
import { auth } from "auth";

export default async function RootLayout({children}) {
  const session = await auth();
  return (
    <div className="flex">
      <Sidebar session={session} image={session.user.image} name={session.user.name}/>
      <div className="p-7 text-2x1 font-semibold flex-1 h-screen overflow-y-scroll">
        {children}
      </div>
    </div>
  );
}
