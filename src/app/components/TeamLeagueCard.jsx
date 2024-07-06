"use client";
import { useRouter } from "next/navigation";
import { CldImage } from "next-cloudinary";
import Image from "next/image";

const TeamLeagueCard = ({ team, leagueId }) => {
  const router = useRouter();

  const handleNavigate = async (id, teamId) => {
    router.push(`/hub/leagues/${id}/teams/${teamId}/players`);
  };

  return (
    <div
      className="w-100 rounded-lg overflow-hidden shadow-lg text-center bg-background-light mt-1 relative"
      onClick={() => handleNavigate(leagueId, team.id_team)}
    >
      {team.image ?
        <CldImage
          className="cursor-pointer duration-500 w-full p-3"
          width="300"
          height="300"
          alt="team-img"
          crop="fill"
          src={team.image}
        /> :
        <Image
          src="/sidebar/logo.png"
          width={300}
          height={300}
          className="cursor-pointer duration-500 w-full p-3"
          alt=""
        />}
      <div className="py-3">
        <div className="font-bold text-xl mb-2">{team.name}</div>
      </div>
      <div className="">
        <div className="font-bold text-xl mb-2">{team.acronym}</div>
      </div>
    </div>
  );
}

export default TeamLeagueCard