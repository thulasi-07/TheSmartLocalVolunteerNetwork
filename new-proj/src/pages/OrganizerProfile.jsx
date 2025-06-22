import React, { useEffect, useState } from 'react';
import OrganizerProfileDetails from '../components/organizer/OrganizerProfileDetails';
import axios from '../services/api';

const OrganizerProfile = () => {
  const [organizer, setOrganizer] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      axios.get(`/organizers/${userData._id}`).then((res) => {
        setOrganizer(res.data);
      });
    }
  }, []);

  if (!organizer) return <p className="text-gray-500">Loading profile...</p>;

  return (
    <div className="p-6">
      <OrganizerProfileDetails organizer={organizer} />
    </div>
  );
};

export default OrganizerProfile;