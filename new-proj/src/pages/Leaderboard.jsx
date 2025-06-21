import React, { useEffect, useState } from 'react';
import API from '../services/authApi';

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await API.get('/leaderboard'); // Your backend API endpoint
        setLeaders(response.data);
      } catch (err) {
        setError('Failed to fetch leaderboard data.');
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) return <p className="p-6 text-center">Loading leaderboard...</p>;
  if (error) return <p className="p-6 text-center text-red-600">{error}</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Leaderboard</h1>

      {leaders.length === 0 ? (
        <p className="text-center text-gray-600">No leaderboard data available.</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-300 rounded shadow">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="py-3 px-6 text-left">Rank</th>
              <th className="py-3 px-6 text-left">Participant</th>
              <th className="py-3 px-6 text-left">Points</th>
              <th className="py-3 px-6 text-left">Badges Earned</th>
            </tr>
          </thead>
          <tbody>
            {leaders.map((leader, index) => (
              <tr
                key={leader.id || index}
                className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
              >
                <td className="py-3 px-6">{index + 1}</td>
                <td className="py-3 px-6 font-semibold">{leader.name}</td>
                <td className="py-3 px-6">{leader.points}</td>
                <td className="py-3 px-6">
                  {leader.badges && leader.badges.length > 0
                    ? leader.badges.map((badge) => (
                        <span
                          key={badge.id}
                          className="inline-block bg-yellow-300 text-yellow-900 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded"
                        >
                          {badge.name}
                        </span>
                      ))
                    : 'None'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Leaderboard;
