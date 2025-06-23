import React, { useEffect, useState } from 'react';
import axios from '../../services/api'; // Make sure this points to your configured axios instance

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
        if (!user || !user._id) return;

        const res = await axios.get(`/events/stats/${user._id}`);
        setStats({
          participated: res.data.participated || 0,
          completed: res.data.completed || 0,
          notInterested: res.data.notInterested || 0,
        });
      } catch (error) {
        console.error('Error fetching volunteer stats:', error);
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
