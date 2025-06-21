import React, { useEffect, useState } from 'react';
import API from '../services/authApi';
import EventDetailsModal from '../components/events/EventDetailsModal';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchEvents = async () => {
    try {
      const response = await API.get('/events'); // Adjust to your backend route
      setEvents(response.data);
    } catch (error) {
      console.error('Failed to fetch events:', error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const openModal = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedEvent(null);
    setIsModalOpen(false);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Events</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((event) => (
          <div
            key={event._id}
            className="bg-white shadow-md rounded-xl p-4 cursor-pointer hover:shadow-lg transition"
            onClick={() => openModal(event)}
          >
            <h3 className="text-lg font-semibold">{event.title}</h3>
            <p className="text-gray-600">{event.description.slice(0, 80)}...</p>
            <p className="text-sm text-gray-500 mt-2">
              Date: {new Date(event.date).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>

      {isModalOpen && selectedEvent && (
        <EventDetailsModal event={selectedEvent} onClose={closeModal} />
      )}
    </div>
  );
};

export default EventList;
