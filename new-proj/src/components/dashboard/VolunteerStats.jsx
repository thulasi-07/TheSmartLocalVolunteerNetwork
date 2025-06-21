// src/components/dashboard/VolunteerStats.jsx
import React, { useEffect, useState } from 'react';
import axios from '../../services/api';

const VolunteerStats = () => {
  const [registeredEvents, setRegisteredEvents] = useState(0);

  useEffect(() => {
    const fetchVolunteerStats = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const response = await axios.get('/events');
        const filtered = response.data.filter(event =>
          event.volunteers.includes(userId)
        );
        setRegisteredEvents(filtered.length);
      } catch (err) {
        console.error('Error fetching volunteer stats', err);
      }
    };

    fetchVolunteerStats();
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-4 text-center">
      <h2 className="text-xl font-semibold text-green-700">Volunteer Stats</h2>
      <p className="mt-2 text-gray-600">Events Participated: <strong>{registeredEvents}</strong></p>
    </div>
  );
};

export default VolunteerStats;
