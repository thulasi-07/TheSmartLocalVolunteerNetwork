import React from 'react';

const OrganizerProfileDetails = ({ organizer }) => {
  return (
    <div className="bg-white p-6 rounded shadow-md">
      <h2 className="text-xl font-bold text-indigo-700 mb-4">Organizer Profile</h2>
      <p><strong>Name:</strong> {organizer.name}</p>
      <p><strong>Email:</strong> {organizer.email}</p>
      <p><strong>Organization:</strong> {organizer.organization}</p>
    </div>
  );
};

export default OrganizerProfileDetails;