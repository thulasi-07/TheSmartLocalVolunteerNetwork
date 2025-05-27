import React from 'react';

const BadgeCard = ({ badge }) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-4 text-center hover:shadow-lg transition">
      <img 
        src={badge.imageUrl} 
        alt={badge.name} 
        className="w-20 h-20 mx-auto mb-3 rounded-full border-2 border-indigo-500 object-cover"
      />
      <h3 className="text-lg font-semibold text-gray-800">{badge.name}</h3>
      <p className="text-sm text-gray-500">{badge.description}</p>
      <p className="text-xs text-indigo-600 mt-2">Earned: {badge.earnedDate}</p>
    </div>
  );
};

export default BadgeCard;
