import {PrismaClient} from "@prisma/client";
import {cookies} from "next/headers";
import jwt from "jsonwebtoken";
import HomeComponent from "./components/homeComponent";

const prisma = new PrismaClient();

// async function getLeagueUsers() {
//   const userList = await prisma.leagues.findMany({
//     include: {
//       league_players: true,
//       score: false,
//       sports_custom: true,
//       sports_league: true,
//       teams: true,
//     },
//   });
//   return userList;
// }
// {!user ? (
//         <p className="mx-auto">Logged in as: None</p>
//       ) : (
//         <p className="mx-auto">Logged in as: {/*user.email*/}</p>
//       )}
{/* <div className="flex justify-center items-center">
  <Link href={"/login"}>Login</Link>
  <Link href={"/hub/leagues"}>Hub</Link>
  <LogOut />
</div> */}
export default async function Home() {
  //const userList = await getLeagueUsers();

  const token = cookies().get("access-token");
  const user = token ? jwt.decode(token.value) : null;

  return (
    <main className="min-h-screen">
      <HomeComponent />
    </main>
  );
}
