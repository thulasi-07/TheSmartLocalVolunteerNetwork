// src/components/organizer/OrganizerSidebar.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const OrganizerSidebar = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();

  const tabs = [
    { key: 'dashboard', label: 'Dashboard Overview' },
    { key: 'activities', label: 'Volunteer Activities' },
    { key: 'feedback', label: 'View Feedbacks' },
    { key: 'badges', label: 'Assign Badges / Stars' },
    { key: 'certificates', label: 'Generate Certificates' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <aside className="h-full w-full bg-white shadow-lg p-6 space-y-5 overflow-y-auto rounded-xl">
      <h2 className="text-2xl font-bold text-indigo-700 border-b pb-3">Organizer Menu</h2>

      {/* Sidebar Tabs */}
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => setActiveTab(tab.key)}
          className={`w-full text-left px-5 py-3 rounded-lg text-base font-semibold transition duration-200 ease-in-out
            ${
              activeTab === tab.key
                ? 'bg-indigo-600 text-white'
                : 'text-gray-700 hover:bg-indigo-100'
            }`}
        >
          {tab.label}
        </button>
      ))}

      {/* Logout (same style as other tabs, no extra spacing) */}
      <button
        onClick={handleLogout}
        className="w-full text-left px-5 py-3 rounded-lg text-base font-semibold text-gray-700 hover:bg-indigo-100 transition"
      >
        Logout
      </button>
    </aside>
  );
};

export default OrganizerSidebar;
