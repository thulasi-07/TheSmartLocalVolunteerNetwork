import React, { useEffect, useState } from 'react';
import OrganizerStats from '../components/dashboard/OrganizerStats';
import EventForm from '../components/events/EventForm';
import VolunteerActivityPanel from '../components/dashboard/VolunteerActivityPanel';

const OrganizerDashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) setUser(JSON.parse(userData));
  }, []);

  if (!user) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user.name}</h1>
      <OrganizerStats organizerId={user._id} />
      <EventForm organizerId={user._id} />
      <VolunteerActivityPanel organizerId={user._id} />
    </div>
  );
};

export default OrganizerDashboard;
