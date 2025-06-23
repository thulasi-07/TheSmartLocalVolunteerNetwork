// src/components/organizer/OrganizerSidebar.jsx
import React from 'react';

const OrganizerSidebar = ({ activeTab, setActiveTab }) => {
  const tabs = [
    // { key: 'profile', label: 'My Profile' },
    { key: 'dashboard', label: 'Dashboard Overview' },
    { key: 'activities', label: 'Volunteer Activities' },
    { key: 'feedback', label: 'View Feedbacks' },
    { key: 'badges', label: 'Assign Badges / Stars' },
    { key: 'certificates', label: 'Generate Certificates' },
    
  ];

  return (
    <aside className="w-full lg:w-64 bg-white shadow-md rounded-lg p-5 space-y-4">
      <h2 className="text-xl font-bold text-indigo-700 border-b pb-2">Organizer Menu</h2>

      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => setActiveTab(tab.key)}
          className={`w-full text-left px-4 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out
            ${
              activeTab === tab.key
                ? 'bg-indigo-600 text-white'
                : 'text-gray-700 hover:bg-indigo-100'
            }`}
        >
          {tab.label}
        </button>
      ))}
    </aside>
  );
};

export default OrganizerSidebar;
