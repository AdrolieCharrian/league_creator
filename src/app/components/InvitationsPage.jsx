'use client';
import { useState, useEffect } from 'react';
import { getInvitationsFromUser } from '../hub/actions';
import InvitationCard from '@/app/components/InvitationCard';

const InvitationsPage = ({ initialInvitations, userId }) => {
  const [invitations, setInvitations] = useState(initialInvitations);

  const handleUpdateInvitations = async () => {
    const updatedInvitations = await getInvitationsFromUser(userId);
    setInvitations(updatedInvitations);
  };

  return (
    <div className="h-100 w-100">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {invitations.map((invi, index) => (
          <InvitationCard
            key={index}
            idLeague={invi.idLeague}
            idInvitation={invi.idInvitation}
            idUser={invi.idUser}
            onActionComplete={handleUpdateInvitations}
          />
        ))}
      </div>
    </div>
  );
};

export default InvitationsPage;
