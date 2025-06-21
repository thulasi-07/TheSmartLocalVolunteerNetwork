// src/components/dashboard/OrganizerStats.jsx
import React, { useEffect, useState } from 'react';
import axios from '../../services/api';

const OrganizerStats = () => {
  const [eventCount, setEventCount] = useState(0);

  useEffect(() => {
    const fetchOrganizerStats = async () => {
      try {
        const organizerId = localStorage.getItem('userId');
        const response = await axios.get(`/events?organizerId=${organizerId}`);
        setEventCount(response.data.length);
      } catch (err) {
        console.error('Error fetching organizer stats', err);
      }
    };

    fetchOrganizerStats();
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-4 text-center">
      <h2 className="text-xl font-semibold text-blue-700">Organizer Stats</h2>
      <p className="mt-2 text-gray-600">Total Events Created: <strong>{eventCount}</strong></p>
    </div>
  );
};

export default OrganizerStats;
