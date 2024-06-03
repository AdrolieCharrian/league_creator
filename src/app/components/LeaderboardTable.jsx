"use client";

const LeaderboardTable = ({ data }) => {
  return (
    <div className="container mx-auto py-5">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-sidebar-light rounded-lg shadow-md dark:bg-sidebar-dark">
          <thead className="bg-sidebar-light2 text-white dark:bg-sidebar-dark2">
            <tr>
              <th className="py-2 px-4 border-b border-sidebar-light2 dark:border-sidebar-dark2">Rank</th>
              <th className="py-2 px-4 border-b border-sidebar-light2 dark:border-sidebar-dark2">Team</th>
              <th className="py-2 px-4 border-b border-sidebar-light2 dark:border-sidebar-dark2">MP</th>
              <th className="py-2 px-4 border-b border-sidebar-light2 dark:border-sidebar-dark2">W</th>
              <th className="py-2 px-4 border-b border-sidebar-light2 dark:border-sidebar-dark2">D</th>
              <th className="py-2 px-4 border-b border-sidebar-light2 dark:border-sidebar-dark2">L</th>
              <th className="py-2 px-4 border-b border-sidebar-light2 dark:border-sidebar-dark2">Pts</th>
            </tr>
          </thead>
          <tbody>
            {data.map((team) => (
              <tr key={team.rank} className="text-center odd:bg-sidebar-light even:bg-sidebar-light2 hover:bg-sidebar-light2 dark:odd:bg-sidebar-dark dark:even:bg-sidebar-dark2 dark:hover:bg-sidebar-dark2 dark:hover:text-white transition-colors duration-200">
                <td className="text-white py-2 px-4 border-b border-sidebar-light2 dark:border-sidebar-dark2">{team.rank}</td>
                <td className="text-white py-2 px-4 border-b border-sidebar-light2 dark:border-sidebar-dark2">{team.teamName}</td>
                <td className="text-white py-2 px-4 border-b border-sidebar-light2 dark:border-sidebar-dark2">{team.matchesPlayed}</td>
                <td className="text-white py-2 px-4 border-b border-sidebar-light2 dark:border-sidebar-dark2">{team.wins}</td>
                <td className="text-white py-2 px-4 border-b border-sidebar-light2 dark:border-sidebar-dark2">{team.draws}</td>
                <td className="text-white py-2 px-4 border-b border-sidebar-light2 dark:border-sidebar-dark2">{team.loses}</td>
                <td className="text-white py-2 px-4 border-b border-sidebar-light2 dark:border-sidebar-dark2">{team.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaderboardTable;
