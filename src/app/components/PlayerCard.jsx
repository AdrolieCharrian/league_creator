"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getAdminFromLeague } from "../hub/actions";

export default function PlayerCard({ team, onDelete }) {
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

  const handleDelete = () => {
    onDelete(league.id_league);
    closeConfirmModal();
  };

  const handleNavigate = async (id) => {
    const adminId = await getAdminFromLeague(id);
    setAdminId(adminId);
    router.push(`/hub/leagues/${id}/teams`);
  };

  return (
    <div
      className="w-100 rounded-lg overflow-hidden shadow-lg text-center bg-background-light mt-1 relative"
      onClick={() => handleNavigate(league.id_league)}
    >
      <Image
        src="/sidebar/logo.png"
        width={300}
        height={300}
        className="cursor-pointer duration-500 w-full p-3"
        alt=""
      />
      <div className="py-4">
        <div className="font-bold text-xl mb-2">{league.name}</div>
      </div>

      {league.admin && (
        <>
          <button
            onClick={openConfirmModal}
            className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-2"
          >
            Delete
          </button>
          
        </>
      )}
    </div>
  );
}
