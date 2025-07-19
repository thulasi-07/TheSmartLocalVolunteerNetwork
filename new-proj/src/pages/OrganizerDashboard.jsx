import React, { useEffect, useState } from 'react';
import OrganizerStats from '../components/dashboard/OrganizerStats';
import EventForm from '../components/events/EventForm';
import VolunteerActivityPanel from '../components/dashboard/VolunteerActivityPanel';
import FeedbackPanel from '../components/organizer/FeedbackPanel';
import BadgeAssignmentPanel from '../components/organizer/BadgeAssignmentPanel';
import CertificateGenerator from '../components/organizer/CertificateGenerator';
import OrganizerSidebar from '../components/organizer/OrganizerSidebar';
import OrganizerProfile from './OrganizerProfile';

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
        return <CertificateGenerator organizerId={user._id} />;
      case 'profile':
        return <OrganizerProfile organizerId={user._id} />;
      default:
        return null;
    }
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-indigo-100 to-purple-100">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar section (fixed height, no scroll) */}
        <div className="w-80 bg-white shadow-lg border-r border-gray-200 h-full overflow-hidden">
          <OrganizerSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        {/* Main content section (scrollable) */}
        <div className="flex-1 h-full overflow-y-auto p-10">
          <h1 className="text-4xl font-semibold text-indigo-700 mb-6">
            Welcome, {user.name}
          </h1>
          <div className="bg-white shadow-md rounded-2xl p-6">
            {renderActivePanel()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizerDashboard;
