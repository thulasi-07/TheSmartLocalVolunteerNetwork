import React, { useEffect, useState } from 'react';
import axios from '../../services/api';

const BadgeView = ({ volunteerId }) => {
  const [badges, setBadges] = useState([]);

  useEffect(() => {
    const fetchBadges = async () => {
      try {
        const res = await axios.get(`/badges/${volunteerId}`);
        setBadges(res.data);
      } catch (err) {
        console.error('Failed to load badges');
      }
    };
    fetchBadges();
  }, [volunteerId]);

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4 text-yellow-600">Your Badges / Stars</h2>
      {badges.length === 0 ? (
        <p className="text-gray-500">No badges assigned yet.</p>
      ) : (
        <ul className="space-y-2">
          {badges.map((badge, i) => (
            <li key={i} className="p-3 bg-yellow-100 rounded">
              ⭐ {badge.eventName} - {badge.stars} Stars by {badge.organizerName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BadgeView;
