import React from 'react';
import MyEventsList from '../components/events/MyEventsList';
import VolunteerStats from '../components/dashboard/VolunteerStats';

const VolunteerDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome, Volunteer!</h1>
      <VolunteerStats />
      <div className="mt-6">
        <MyEventsList />
      </div>
    </div>
  );
};

export default VolunteerDashboard;
