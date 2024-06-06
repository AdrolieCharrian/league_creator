"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getAdminFromLeague } from "../hub/actions";
import { CldImage } from "next-cloudinary";

export default function LeagueCard({ league, onDelete }) {
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
      <CldImage
        className="cursor-pointer duration-500 p-3"
        width="300"
        height="300"
        alt="league-img"
        crop="fill"
        src={league.image}
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
          {isConfirmModalOpen && (
            <div
              id="delete-confirmation-modal"
              tabIndex="-1"
              aria-hidden="true"
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
            >
              <div className="relative w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                  <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Confirm Deletion
                    </h3>
                    <button
                      type="button"
                      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={closeConfirmModal}
                    >
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7L1 13"
                        />
                      </svg>
                      <span className="sr-only">Close modal</span>
                    </button>
                  </div>
                  <div className="p-4">
                    <p>Are you sure you want to delete this league?</p>
                    <div className="flex justify-end mt-4">
                      <button
                        onClick={handleDelete}
                        className="bg-red-600 text-white font-bold py-2 px-4 rounded mr-2"
                      >
                        Delete
                      </button>
                      <button
                        onClick={closeConfirmModal}
                        className="bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
