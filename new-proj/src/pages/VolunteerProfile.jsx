import React, { useEffect, useState } from 'react';
import API from '../services/authApi';

const VolunteerProfile = ({ userId }) => {
  const [volunteer, setVolunteer] = useState({});
  const [completedEvents, setCompletedEvents] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await API.get(`/volunteers/profile/${userId}`);
      setVolunteer(res.data.volunteer);
      setCompletedEvents(res.data.completedEvents);
    };
    fetchProfile();
  }, [userId]);

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-2">Volunteer Profile</h2>
      <p><strong>Name:</strong> {volunteer.name}</p>
      <p><strong>Email:</strong> {volunteer.email}</p>
      {/* <p><strong>Phone:</strong> {volunteer.phone}</p>
      <p><strong>Interests:</strong> {volunteer.interests?.join(', ')}</p> */}

      <h3 className="mt-4 font-semibold">Completed Events:</h3>
      <ul className="list-disc list-inside">
        {completedEvents.map(event => (
          <li key={event._id}>{event.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default VolunteerProfile;
