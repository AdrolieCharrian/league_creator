import TeamCard from "@/app/components/TeamCard";
import { getTeamsFromUser } from "../actions";
import { auth } from "auth";

const Teams = async () => {
  const session = await auth()
  console.log(session)
  const teamsData = await getTeamsFromUser(session.id)

  return (
    <div className="h-100 w-100">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {teamsData.map((team, index) => (
          <TeamCard key={index} team={team} />
        ))}
      </div>
    </div>
  );
};

export default Teams;
