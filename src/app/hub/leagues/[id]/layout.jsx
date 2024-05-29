import { auth } from "auth";
import { TabNav } from "@/app/components/TabNav";

export default async function RootLayout({ children, params }) {
  const session = await auth();
  const { id } = params;

  return (
    <div>
      <TabNav id={id} />
      <div className="p-7 text-2x1 font-semibold flex-1 h-screen overflow-y-scroll bg-white dark:bg-background-dark">
        {children}
      </div>
    </div>
  );
}
