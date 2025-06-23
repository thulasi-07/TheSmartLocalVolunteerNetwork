import React, { useEffect, useState } from 'react';
import API from '../../services/api';
import { toast } from 'react-toastify';

const VolunteerActivityPanel = ({ organizerId }) => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const loadActivities = async () => {
      try {
        const res = await API.get(`/events/activities/${organizerId}`);
        setActivities(res.data || []);
      } catch (err) {
        console.error('Failed to load volunteer activity:', err);
        toast.error('Error loading volunteer activity');
      }
    };

    if (organizerId) {
      loadActivities();
    }
  }, [organizerId]);

  return (
    <div className="bg-white shadow-md rounded-lg p-5 mt-6">
      <h3 className="text-xl font-semibold text-indigo-700 mb-4">📊 Volunteer Activity</h3>

      {activities.length === 0 ? (
        <p className="text-gray-500 text-sm">No recent volunteer activity yet.</p>
      ) : (
        <ul className="space-y-3 text-sm text-gray-800">
          {activities.map((act, index) => (
            <li key={index} className="bg-gray-50 border rounded-md p-3">
              🧍 <strong>{act.volunteerName}</strong> responded to <strong>{act.eventTitle}</strong> - <span className="italic">{act.status}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default VolunteerActivityPanel;
