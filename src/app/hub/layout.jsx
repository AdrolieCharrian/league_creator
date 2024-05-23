import Sidebar from "../components/Sidebar";
import NewSidebar, { SidebarItem } from "../components/NewSidebar";
import { Home, Trophy, Shield, User } from "lucide-react";
import "../globals.css";
import { auth } from "auth";

export default async function RootLayout({ children }) {
  const session = await auth();
  return (
    <div className="flex">
       <NewSidebar>
        <SidebarItem icon={<Home size={20} />} text="Home"  />
        <SidebarItem icon={<User size={20} />} text="Profile"  />
        <SidebarItem icon={<Trophy size={20} />} text="Leagues"  />
        <SidebarItem icon={<Shield size={20} />} text="Teams"  />
      </NewSidebar> 
      {/* <Sidebar
        session={session}
        image={session.user.image}
        name={session.user.name}
      />  */}
      <div className="p-7 text-2x1 font-semibold flex-1 h-screen overflow-y-scroll">
        {children}
      </div>
    </div>
  );
}
