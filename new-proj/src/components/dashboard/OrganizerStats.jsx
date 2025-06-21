// src/components/dashboard/OrganizerStats.jsx
import React, { useEffect, useState } from 'react';
import { fetchEventsByOrganizer } from '../../services/eventApi'; // ✅ use event API

const OrganizerStats = ({ organizerId }) => {
  const [eventCount, setEventCount] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        if (!organizerId) throw new Error("Organizer ID is missing");

        const response = await fetchEventsByOrganizer(organizerId);
        setEventCount(response.data.length);
      } catch (err) {
        console.error('Error fetching organizer stats', err);
      }
    };

    fetchStats();
  }, [organizerId]);

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-4 text-center">
      <h2 className="text-xl font-semibold text-blue-700">Organizer Stats</h2>
      <p className="mt-2 text-gray-600">Total Events Created: <strong>{eventCount}</strong></p>
    </div>
  );
};

export default OrganizerStats;
