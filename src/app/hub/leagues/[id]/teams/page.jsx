import TeamLeagueCard from "@/app/components/TeamLeagueCard";
import { getTeamsFromLeague } from "../../../actions";

const LeaguesTeams = async ({params: {id}}) => {

  const teamsData = await getTeamsFromLeague(id);

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

export default LeaguesTeams;
