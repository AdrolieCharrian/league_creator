import TeamLeagueCard from "@/app/components/TeamLeagueCard";
import { getTeamsFromUser } from "../actions";
import { auth } from "auth";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const Teams = async () => {
  const session = await auth()
  const token = cookies().get("access-token");
  const user = token && jwt.decode(token.value)

  const teamsData = await getTeamsFromUser(!session ? user?.id : session.user.id)

  return (
    <div className="h-100 w-100">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {teamsData.map((team, index) => (
          <TeamLeagueCard key={index} team={team} />
        ))}
      </div>
    </div>
  );
};

export default Teams;
