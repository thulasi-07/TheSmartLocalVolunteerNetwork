import React, { useEffect, useState } from 'react';
import { fetchAllEvents } from '../services/eventApi';
import EventCard from '../components/events/EventCard';
import { toast } from 'react-toastify';

const VolunteerDashboard = () => {
  const [events, setEvents] = useState([]);
  const [user, setUser] = useState(null);

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

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Volunteer Dashboard</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {events.map(event => (
          <EventCard key={event._id} event={event} userId={user?._id} />
        ))}
      </div>
    </div>
  );
};

export default VolunteerDashboard;