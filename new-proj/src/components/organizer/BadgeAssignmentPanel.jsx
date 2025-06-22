import React, { useEffect, useState } from 'react';
import axios from '../../services/authApi';
import { toast } from 'react-toastify';

const BadgeAssignmentPanel = ({ organizerId }) => {
  const [volunteers, setVolunteers] = useState([]);
  const [selectedBadges, setSelectedBadges] = useState({});

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const res = await axios.get(`/events/activities/${organizerId}`);
        setVolunteers(res.data);
      } catch (err) {
        console.error('Failed to fetch volunteer data', err);
        toast.error('Could not load volunteer activity');
      }
    };

    fetchVolunteers();
  }, [organizerId]);

  const handleBadgeChange = (volunteerId, badge) => {
    setSelectedBadges({ ...selectedBadges, [volunteerId]: badge });
  };

  const assignBadge = async (volunteerId) => {
    try {
      const badge = selectedBadges[volunteerId];
      if (!badge) {
        toast.warn('Please select a badge');
        return;
      }

      await axios.post(`/events/assign-badge`, {
        organizerId,
        volunteerId,
        badge,
      });

      toast.success(`Badge "${badge}" assigned successfully`);
    } catch (err) {
      console.error('Failed to assign badge', err);
      toast.error('Error assigning badge');
    }
  };

  const badgeOptions = ['🌟 Star Volunteer', '🔥 Top Contributor', '🎯 Task Master'];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-indigo-700 mb-4">🎖 Assign Badges</h2>

      {volunteers.length === 0 ? (
        <p className="text-gray-500">No volunteer activity available.</p>
      ) : (
        <div className="space-y-6">
          {volunteers.map((v, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row items-start md:items-center justify-between border-b pb-4"
            >
              <div>
                <p className="font-medium text-gray-800">
                  👤 {v.volunteerName} — <span className="text-sm text-gray-600">({v.status})</span>
                </p>
                <p className="text-sm text-gray-500">📌 Event: {v.eventTitle}</p>
              </div>

              <div className="flex gap-3 items-center mt-2 md:mt-0">
                <select
                  className="border border-gray-300 rounded px-3 py-1 text-sm"
                  value={selectedBadges[v.volunteerName] || ''}
                  onChange={(e) => handleBadgeChange(v.volunteerName, e.target.value)}
                >
                  <option value="">Select Badge</option>
                  {badgeOptions.map((badge, idx) => (
                    <option key={idx} value={badge}>
                      {badge}
                    </option>
                  ))}
                </select>

                <button
                  className="bg-indigo-600 text-white px-4 py-1 rounded text-sm hover:bg-indigo-700"
                  onClick={() => assignBadge(v.volunteerName)}
                >
                  Assign
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BadgeAssignmentPanel;
