import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyEventsList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchMyEvents = async () => {
      try {
        const res = await axios.get('/api/events/myevents'); // Adjust endpoint
        setEvents(res.data);
      } catch (err) {
        console.error('Error fetching my events:', err);
      }
    };

    fetchMyEvents();
  }, []);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md mt-4">
      <h2 className="text-lg font-semibold text-indigo-700 mb-3">My Registered Events</h2>
      {events.length === 0 ? (
        <p className="text-gray-600 text-sm">No events registered yet.</p>
      ) : (
        <ul className="space-y-2">
          {events.map((event) => (
            <li key={event._id} className="p-3 border rounded-md hover:bg-gray-50">
              <h3 className="font-bold text-indigo-600">{event.title}</h3>
              <p className="text-sm text-gray-700">{event.description}</p>
              <p className="text-xs text-gray-500">📅 {event.date} | 📍 {event.location}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyEventsList;
