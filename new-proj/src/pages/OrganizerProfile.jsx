import React, { useEffect, useState } from 'react';
import API from '../services/authApi';

const OrganizerProfile = ({ userId }) => {
  const [organizer, setOrganizer] = useState({});
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await API.get(`/organizers/profile/${userId}`);
      setOrganizer(res.data.organizer);
      setEvents(res.data.events);
    };
    fetchProfile();
  }, [userId]);

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-2">Organizer Profile</h2>
      <p><strong>Name:</strong> {organizer.name}</p>
      <p><strong>Email:</strong> {organizer.email}</p>
      {/* <p><strong>Phone:</strong> {organizer.phone}</p>
      <p><strong>Organization:</strong> {organizer.organization}</p> */}

      <h3 className="mt-4 font-semibold">Created Events:</h3>
      <ul className="list-disc list-inside">
        {events.map(event => (
          <li key={event._id}>{event.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default OrganizerProfile;
