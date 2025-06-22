import React, { useEffect, useState } from 'react';
import axios from '../../services/api'; // make sure this points to your main axios config

const VolunteerStats = () => {
  const [stats, setStats] = useState({
    participated: 0,
    completed: 0,
    notInterested: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user?._id) return;

        const response = await axios.get(`/events/volunteer-stats/${user._id}`);
        setStats(response.data);
      } catch (err) {
        console.error('Failed to load volunteer stats', err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg p-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
      <div className="bg-blue-100 p-4 rounded">
        <h3 className="text-lg font-semibold text-blue-700">Participated</h3>
        <p className="text-2xl mt-2 font-bold text-blue-800">{stats.participated}</p>
      </div>
      <div className="bg-green-100 p-4 rounded">
        <h3 className="text-lg font-semibold text-green-700">Completed</h3>
        <p className="text-2xl mt-2 font-bold text-green-800">{stats.completed}</p>
      </div>
      <div className="bg-red-100 p-4 rounded">
        <h3 className="text-lg font-semibold text-red-700">Not Interested</h3>
        <p className="text-2xl mt-2 font-bold text-red-800">{stats.notInterested}</p>
      </div>
    </div>
  );
};

export default VolunteerStats;
