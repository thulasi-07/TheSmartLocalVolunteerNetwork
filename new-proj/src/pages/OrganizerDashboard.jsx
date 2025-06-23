// src/pages/OrganizerDashboard.jsx
import React, { useEffect, useState } from 'react';
import OrganizerStats from '../components/dashboard/OrganizerStats';
import EventForm from '../components/events/EventForm';
import VolunteerActivityPanel from '../components/dashboard/VolunteerActivityPanel';
import FeedbackPanel from '../components/organizer/FeedbackPanel';
import BadgeAssignmentPanel from '../components/organizer/BadgeAssignmentPanel';
import CertificateGenerator from '../components/organizer/CertificateGenerator';
import OrganizerSidebar from '../components/organizer/OrganizerSidebar';
import OrganizerProfile from '../pages/OrganizerProfile';

const OrganizerDashboard = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) setUser(JSON.parse(userData));
  }, []);

  if (!user) {
    return <p className="text-center text-gray-500 mt-10">Loading Organizer Dashboard...</p>;
  }

  // Panel rendering based on activeTab
  const renderActivePanel = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <>
            <OrganizerStats organizerId={user._id} />
            <EventForm organizerId={user._id} />
          </>
        );
      case 'activities':
        return <VolunteerActivityPanel organizerId={user._id} />;
      case 'feedback':
        return <FeedbackPanel organizerId={user._id} />;
        
      case 'badges':
        return <BadgeAssignmentPanel organizerId={user._id} />;
      case 'certificates':
        return <CertificateGenerator organizerName={user.name} />;
        case 'profile':
          return <OrganizerProfile organizerId={user._id} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-indigo-700 mb-6">Welcome, {user.name}</h1>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <OrganizerSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        {/* Main Content */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white shadow rounded-lg p-5">
            {renderActivePanel()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizerDashboard;
