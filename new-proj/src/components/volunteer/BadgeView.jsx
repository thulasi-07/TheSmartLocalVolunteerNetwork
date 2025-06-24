// src/components/volunteer/BadgeView.jsx
import React, { useEffect, useState } from 'react';
import axios from '../../services/api';
import { toast } from 'react-toastify';

const BadgeView = ({ volunteerId }) => {
  const [badges, setBadges] = useState([]);

  useEffect(() => {
    const fetchBadges = async () => {
      try {
        const res = await axios.get(`/badges/volunteer/${volunteerId}`);
        setBadges(res.data);
      } catch (err) {
        toast.error('Failed to load badges');
      }
    };

    if (volunteerId) fetchBadges();
  }, [volunteerId]);

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold text-indigo-700 mb-4">🏆 Your Badges</h2>

      {badges.length === 0 ? (
        <p className="text-gray-500">No badges assigned yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {badges.map((badge) => (
            <div key={badge._id} className="border p-4 rounded-lg bg-indigo-50 shadow">
              <h3 className="text-lg font-semibold text-indigo-800">{badge.badgeTitle}</h3>
              <p className="text-sm text-gray-700 mt-1">
                ⭐ <strong>{badge.stars}</strong> Star{badge.stars > 1 ? 's' : ''} <br />
                📂 <strong>Category:</strong> {badge.category} <br />
                📝 <strong>Reason:</strong> {badge.reason} <br />
                📅 <strong>Date:</strong>{' '}
                {new Date(badge.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BadgeView;
