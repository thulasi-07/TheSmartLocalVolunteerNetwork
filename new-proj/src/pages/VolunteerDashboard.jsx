import React, { useEffect, useState } from 'react';
import VolunteerSidebar from '../components/volunteer/VolunteerSidebar';
import VolunteerStats from '../components/volunteer/VolunteerStats';
import EventCard from '../components/events/EventCard';
import FeedbackForm from '../components/volunteer/FeedbackForm';
import BadgeView from '../components/volunteer/BadgeView';
import CertificateViewer from '../components/volunteer/CertificateView';
import VolunteerProfile from '../pages/VolunteerProfile';
import { fetchAllEvents } from '../services/eventApi';
import { toast } from 'react-toastify';

const VolunteerDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
    else toast.error('Please login again.');
  }, []);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const res = await fetchAllEvents();
        setEvents(res.data);
      } catch (err) {
        toast.error('Failed to load events');
      }
    };
    loadEvents();
  }, []);

  const renderTabContent = () => {
    if (!user) return <p className="text-center text-gray-600">Loading user data...</p>;

    switch (activeTab) {
      case 'dashboard':
        return (
          <>
            <VolunteerStats volunteerId={user._id} />
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              {events.map((event) => (
                <EventCard key={event._id} event={event} userId={user._id} />
              ))}
            </div>
          </>
        );
      case 'feedback':
        return <FeedbackForm volunteerId={user._id} />;
      case 'badges':
        return <BadgeView volunteerId={user._id} />;
      case 'certificates':
        return <CertificateViewer volunteerId={user._id} />;
      case 'profile':
        return <VolunteerProfile volunteerId={user._id} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-16"> {/* assumes navbar height = 5rem, footer = 4rem */}
      <div className="flex">
        {/* Sticky Sidebar */}
        <div className="w-80">
          <div className="sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto">
            <VolunteerSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 p-6">
          <h1 className="text-3xl font-bold text-indigo-700 mb-6">
            Welcome, {user?.name || 'Volunteer'}
          </h1>
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default VolunteerDashboard;
