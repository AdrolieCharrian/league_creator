import { auth } from "auth";
import { TabNav } from "@/app/components/TabNav";
import { findLeagueAdminFromTeam, getAdminFromLeague } from "../../actions";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export default async function RootLayout({ children, params }) {
  const session = await auth();
  const { id } = params;
  const token = cookies().get("access-token");
  const user = token && jwt.decode(token.value)

  const adminId = await getAdminFromLeague(id)
  const isAdmin = session ? session.user.id === adminId : user.id === adminId

  return (
    <div>
      <TabNav id={id} isAdmin={isAdmin} />
      <div className="text-2x1 font-semibold flex-1 h-screen overflow-auto scrollbar-hide bg-white dark:bg-background-dark">
        {children}
      </div>
    </div>
  );
}