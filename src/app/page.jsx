import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import HomeComponent from "./components/homeComponent";
import { auth } from "auth";
import "./globals.css"

export default async function Home() {
  const token = cookies().get("access-token");
  const user = token && jwt.decode(token.value);
  const session = await auth();

  return (
    <main className="min-h-screen">
      <HomeComponent session={session || user} image={session ? session?.user.image : user?.image} user={user} />
    </main>
  );
}
