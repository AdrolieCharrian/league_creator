import {PrismaClient} from "@prisma/client";
import {cookies} from "next/headers";
import jwt from "jsonwebtoken";
import HomeComponent from "./components/homeComponent";
import { auth } from "auth";


const prisma = new PrismaClient();

export default async function Home() {
  const token = cookies().get("access-token");
  const user = token && jwt.decode(token.value);
  const session = await auth();

  console.log(session)

  return (
    <main className="min-h-screen">
      <HomeComponent session={session || user} image={session?.user.image} user={user}/>
    </main>
  );
}
