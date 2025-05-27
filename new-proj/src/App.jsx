// src/App.jsx
import React from 'react';
import BadgeCard from './components/achievements/BadgeCard';

const App = () => {
  const badges = [
    {
      name: 'Volunteer Star',
      description: 'Participated in 5 events',
      earnedDate: 'May 20, 2025',
      image: '/assets/badges/star.png',
    },
    {
      name: 'First Event',
      description: 'Joined your first event!',
      earnedDate: 'Apr 15, 2025',
      image: '/assets/badges/first.png',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-indigo-700 mb-8">
        Your Badges
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {badges.map((badge, index) => (
          <BadgeCard key={index} badge={badge} />
        ))}
      </div>
    </div>
  );
};

export default App;
