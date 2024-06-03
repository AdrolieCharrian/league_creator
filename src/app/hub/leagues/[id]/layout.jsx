
import { auth } from "auth";
import { TabNav } from "@/app/components/TabNav";
import { getAdminFromLeague } from "../../actions";

export default async function RootLayout({ children, params }) {
  const session = await auth();
  const { id } = params;

  const adminId = await getAdminFromLeague(id);
  const isAdmin = session.user.id === adminId;

  return (
    <div>
      <TabNav id={id} isAdmin={isAdmin} />
      <div className="pt-3 text-2x1 font-semibold flex-1 h-screen overflow-y-scroll scrollbar-hide bg-white dark:bg-background-dark">
        {children}
      </div>
    </div>
  );
}
