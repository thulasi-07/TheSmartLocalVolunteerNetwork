import React from 'react';
import OrganizerStats from '../components/dashboard/OrganizerStats';
import EventForm from '../components/events/EventForm';

const OrganizerDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome, Organizer!</h1>
      <OrganizerStats />
      <div className="mt-6">
        <EventForm />
      </div>
    </div>
  );
};

export default OrganizerDashboard;
