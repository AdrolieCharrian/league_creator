'use client';
import Image from 'next/image';
import './sidebar.css';
import { useState, useEffect } from 'react';
import { getInfoLeague, declineInvitation, acceptInvitation } from '../hub/actions';

export default function InvitationCard({ idLeague, idInvitation, idUser, onActionComplete }) {
  const [leagueData, setLeagueData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [actionType, setActionType] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getInfoLeague(idLeague);
      setLeagueData(data);
    };
    fetchData();
  }, [idLeague]);

  const handleAction = async () => {
    if (actionType === 'accept') {
      await acceptInvitation(idInvitation, idLeague, idUser);
    } else if (actionType === 'decline') {
      await declineInvitation(idInvitation);
    }
    setShowModal(false);
    onActionComplete();  // Llamar la función pasada para actualizar el estado
  };

  return (
    <div className="w-100 rounded-lg overflow-hidden shadow-lg text-center bg-background-light mt-1 relative">
      <h2 className="py-3">{`You've been invited to`}</h2>
      <div className="py-3 ">
        {leagueData && (
          <div className="font-bold text-xl mb-2">{leagueData.name}</div>
        )}
      </div>
      <div className="py-3">
        <button
          type="button"
          onClick={() => {
            setActionType('decline');
            setShowModal(true);
          }}
          className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4
           focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center ms-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        >
          Decline
        </button>
        <button
          type="button"
          onClick={() => {
            setActionType('accept');
            setShowModal(true);
          }}
          className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4
           focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center ms-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Accept
        </button>
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Confirmation</h2>
            <p>Are you sure you want to {actionType} this invitation?</p>
            <div className="mt-4">
              <button
                onClick={handleAction}
                className="text-white bg-green-600 hover:bg-green-800 focus:outline-none focus:ring-4
                 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Yes
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="text-white bg-gray-500 hover:bg-gray-600 focus:outline-none focus:ring-4
                 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ms-2 mb-2"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
