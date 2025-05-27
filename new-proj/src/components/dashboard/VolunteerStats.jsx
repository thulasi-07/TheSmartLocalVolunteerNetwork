import React, { useEffect, useState } from 'react';
import API from '../services/api';

const VolunteerStats = () => {
  const [stats, setStats] = useState({
    totalEventsParticipated: 0,
    badgesEarned: 0,
    upcomingEvents: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVolunteerStats = async () => {
      try {
        const response = await API.get('/volunteer/stats'); // Adjust API endpoint as per backend
        setStats(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load volunteer stats.');
        setLoading(false);
      }
    };

    fetchVolunteerStats();
  }, []);

  if (loading) return <div>Loading volunteer stats...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div className="bg-blue-100 rounded-lg p-4 text-center shadow">
        <h3 className="text-xl font-semibold">Events Participated</h3>
        <p className="text-3xl font-bold">{stats.totalEventsParticipated}</p>
      </div>
      <div className="bg-green-100 rounded-lg p-4 text-center shadow">
        <h3 className="text-xl font-semibold">Badges Earned</h3>
        <p className="text-3xl font-bold">{stats.badgesEarned}</p>
      </div>
      <div className="bg-yellow-100 rounded-lg p-4 text-center shadow">
        <h3 className="text-xl font-semibold">Upcoming Events</h3>
        <p className="text-3xl font-bold">{stats.upcomingEvents}</p>
      </div>
    </div>
  );
};

export default VolunteerStats;
