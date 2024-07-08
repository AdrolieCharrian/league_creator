import { getInvitationsFromUser } from '../actions';
import { auth } from 'auth';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import InvitationsPage from '@/app/components/InvitationsPage';
const Invitations = async () => {
  const session = await auth();
  const token = cookies().get('access-token');
  const user = token && jwt.decode(token.value);

  const userId = !session ? user?.id : session.user.id;
  const invitationData = await getInvitationsFromUser(userId);

  return <InvitationsPage initialInvitations={invitationData} userId={userId} />;
};

export default Invitations;
