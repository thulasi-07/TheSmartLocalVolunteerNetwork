import React, { useEffect, useState } from 'react';
import BadgeCard from '../components/achievements/BadgeCard';
import { fetchBadges } from '../services/badgeService';

const AchievementsPage = () => {
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBadges = async () => {
      try {
        const data = await fetchBadges();
        setBadges(data);
      } catch (error) {
        console.error('Failed to load badges:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBadges();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-center text-indigo-700 mb-8">Achievements & Badges</h1>
      {loading ? (
        <p className="text-center text-gray-500">Loading badges...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {badges.length > 0 ? (
            badges.map((badge) => <BadgeCard key={badge._id} badge={badge} />)
          ) : (
            <p className="col-span-full text-center text-gray-500">No badges earned yet.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AchievementsPage;
