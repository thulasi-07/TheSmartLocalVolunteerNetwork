import React, { useEffect, useState } from 'react';
import API from '../../services/api';

const VolunteerActivityPanel = ({ organizerId }) => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const loadActivities = async () => {
      try {
        const res = await API.get(`/events/activities/${organizerId}`);
        setActivities(res.data);
      } catch (err) {
        console.error('Failed to load volunteer activity');
      }
    };

    loadActivities();
  }, [organizerId]);

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mt-4">
      <h3 className="text-lg font-bold mb-2">Volunteer Activity</h3>
      {activities.length === 0 ? (
        <p className="text-gray-500">No activity yet</p>
      ) : (
        <ul className="space-y-2">
          {activities.map((act, i) => (
            <li key={i} className="text-sm text-gray-700">
              🧍 <strong>{act.volunteerName}</strong> - <strong>{act.eventTitle}</strong>: {act.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default VolunteerActivityPanel;