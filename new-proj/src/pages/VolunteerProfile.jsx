import React, { useEffect, useState } from 'react';
import VolunteerProfileDetails from '../components/volunteer/VolunteerProfileDetails';
import axios from '../services/api';

const VolunteerProfile = () => {
  const [volunteer, setVolunteer] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      axios.get(`/volunteers/${userData._id}`).then((res) => {
        setVolunteer(res.data);
      });
    }
  }, []);

  if (!volunteer) return <p className="text-gray-500">Loading profile...</p>;

  return (
    <div className="p-6">
      <VolunteerProfileDetails volunteer={volunteer} />
    </div>
  );
};

export default VolunteerProfile;