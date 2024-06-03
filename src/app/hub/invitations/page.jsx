import { getInvitationsFromUser } from "../actions";
import { auth } from "auth";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import InvitationCard from "@/app/components/InvitationCard";

const Invitations = async () => {
  const session = await auth();
  const token = cookies().get("access-token");
  const user = token && jwt.decode(token.value);

  const invitationData = await getInvitationsFromUser(!session ? user?.id : session.user.id);
  return (
    <div className="h-100 w-100">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {invitationData.map((invi, index) => (
          <InvitationCard key={index} idLeague={invi.idLeague} idUser={invi.idUser} />
        ))}
      </div>
    </div>
  );
};

export default Invitations;
