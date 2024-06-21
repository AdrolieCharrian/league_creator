'use client'
import { useEffect, useState } from 'react';
import { getLeaderboardData } from '@/app/hub/actions';
import LeaderboardTable from '@/app/components/LeaderboardTable';

const Leaderboard = ({ params: { id } }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const leaderboardData = await getLeaderboardData(id);
      setData(leaderboardData);
    };

    fetchData();
  }, [id]);

  return (
    <div className="w-100 h-100 pt-3">
      <LeaderboardTable data={data} />
    </div>
  );
};

export default Leaderboard;
