import React, { useEffect, useState } from 'react';
import API from '../../services/api';

const OrganizerStats = () => {
  const [stats, setStats] = useState({
    totalEventsOrganized: 0,
    volunteersRegistered: 0,
    feedbackCount: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrganizerStats = async () => {
      try {
        const response = await API.get('/organizer/stats'); // Adjust API endpoint as per backend
        setStats(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load organizer stats.');
        setLoading(false);
      }
    };

    fetchOrganizerStats();
  }, []);

  if (loading) return <div>Loading organizer stats...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div className="bg-purple-100 rounded-lg p-4 text-center shadow">
        <h3 className="text-xl font-semibold">Events Organized</h3>
        <p className="text-3xl font-bold">{stats.totalEventsOrganized}</p>
      </div>
      <div className="bg-pink-100 rounded-lg p-4 text-center shadow">
        <h3 className="text-xl font-semibold">Volunteers Registered</h3>
        <p className="text-3xl font-bold">{stats.volunteersRegistered}</p>
      </div>
      <div className="bg-indigo-100 rounded-lg p-4 text-center shadow">
        <h3 className="text-xl font-semibold">Feedback Received</h3>
        <p className="text-3xl font-bold">{stats.feedbackCount}</p>
      </div>
    </div>
  );
};

export default OrganizerStats;
