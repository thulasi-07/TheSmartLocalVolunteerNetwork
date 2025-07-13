// src/components/volunteer/VolunteerSidebar.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const VolunteerSidebar = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();

  const tabs = [
    { key: 'dashboard', label: 'Dashboard Overview' },
    { key: 'feedback', label: 'Send Feedback' },
    { key: 'badges', label: 'View Badges / Stars' },
    { key: 'certificates', label: 'My Certificates' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const goToAIPage = () => {
    navigate('/ai-recommendations');
  };

  return (
    <aside className="h-full w-full bg-white shadow-lg p-6 space-y-5 overflow-y-auto">
      <h2 className="text-2xl font-bold text-indigo-700 border-b pb-3">Volunteer Menu</h2>

      {/* Internal Tabs */}
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

      {/* AI Recommendation Button */}
      <button
        onClick={goToAIPage}
        className="w-full text-left px-5 py-3 rounded-lg text-base font-semibold text-gray-700 hover:bg-indigo-100 transition"
      >
        🤖 AI Recommendations
      </button>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="w-full text-left px-5 py-3 rounded-lg text-base font-semibold text-gray-700 hover:bg-indigo-100 transition"
      >
        Logout
      </button>
    </aside>
  );
};

export default VolunteerSidebar;
