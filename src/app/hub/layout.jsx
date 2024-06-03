import NewSidebar, { SidebarItem } from "../components/NewSidebar";
import { Home, Trophy, Shield, User, Mail } from "lucide-react";
import "../globals.css";
import { auth } from "auth";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import "../globals.css";

export default async function RootLayout({ children }) {
  const session = await auth();

  const token = cookies().get("access-token");
  const user = token && jwt.decode(token.value)

  return (
    <div className="flex">
      <NewSidebar name={session?.user.name || user.name} session={session || user} user={user} image={session?.user.image}>
        <SidebarItem icon={<Home size={20} />} text="Home" link="/" />
        <SidebarItem icon={<User size={20} />} text="Profile" link="/hub/profile" />
        <SidebarItem icon={<Trophy size={20} />} text="Leagues" link="/hub/leagues" />
        <SidebarItem icon={<Shield size={20} />} text="Teams" link="/hub/teams" />
        <SidebarItem icon={<Mail size={20} />} text="Invitations" link="/hub/invitations"/>
      </NewSidebar>
      <div className="p-7 text-2x1 font-semibold flex-1 h-screen overflow-y-scroll bg-white dark:bg-background-dark">
        {children}
      </div>
    </div>
  );
}
