import TeamCard from "@/app/components/TeamCard";
import { getTeamsFromUser, identifyUserTeam } from "../actions";
import ModalCreateTeam from "@/app/components/teams/modalCreateTeam";

const Teams = async () => {
  const teamsData = await getTeamsFromUser()  

  return (
    <div className="h-100 w-100">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {teamsData.map((team, index) => (
          <TeamCard key={index} team={team} />
        ))}
      </div>
      <ModalCreateTeam />
    </div>
  );
};

export default Teams;
