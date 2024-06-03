"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TeamLeagueCard({ leagueId, team }) {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [adminId, setAdminId] = useState(null);
  const router = useRouter();

  const openConfirmModal = (event) => {
    event.stopPropagation(); // Detener la propagación del evento
    setIsConfirmModalOpen(true);
  };

  const closeConfirmModal = () => {
    setIsConfirmModalOpen(false);
  };

  const handleDelete = () => {};

  const handleNavigate = async (id, teamId) => {
    // const adminId = await getAdminFromLeague(id);
    // setAdminId(adminId);
    router.push(`/hub/leagues/${id}/teams/${teamId}/players`);
  };

  return (
    <div
      className="w-100 rounded-lg overflow-hidden shadow-lg text-center bg-background-light mt-1 relative"
      onClick={() => handleNavigate(leagueId, team.id_team)}
    >
      <Image
        src="/sidebar/logo.png"
        width={300}
        height={300}
        className="cursor-pointer duration-500 w-full p-3"
        alt=""
      />
      <div className="py-4">
        <div className="font-bold text-xl mb-2">{team.name}</div>
      </div>
    </div>
  );
}
