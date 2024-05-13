import { Inter } from "next/font/google";
import "../globals.css";
import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import Sidebar from "../components/Sidebar";

export default function RootLayout({ children }) {
  return (
    <div>
      <Sidebar />
      {children}
    </div>
  );
}
