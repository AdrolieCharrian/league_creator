import Sidebar from "../components/Sidebar";
import NewSidebar, { SidebarItem } from "../components/NewSidebar";
import { Home, Trophy, Shield, User } from "lucide-react";
import "../globals.css";
import { auth } from "auth";

export default async function RootLayout({ children }) {
  const session = await auth();
  return (
    <div className="flex">
      <NewSidebar name={session.user.name} image={session.user.image}>
        <SidebarItem icon={<Home size={20} />} text="Home" link="/" />
        <SidebarItem icon={<User size={20} />} text="Profile" link="/hub/profile" />
        <SidebarItem icon={<Trophy size={20} />} text="Leagues" link="/hub/leagues" />
        <SidebarItem icon={<Shield size={20} />} text="Teams" link="/hub/teams" />
      </NewSidebar>
      <div className="p-7 text-2x1 font-semibold flex-1 h-screen overflow-y-scroll">
        {children}
      </div>
    </div>
  );
}
