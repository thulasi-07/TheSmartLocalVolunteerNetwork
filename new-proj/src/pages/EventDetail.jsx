import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EventDetailsModal from '../components/events/EventDetailsModal';
import API from '../services/api';

const EventDetail = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(true); // Automatically open modal

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await API.get(`/events/${eventId}`);
        setEvent(response.data);
      } catch (error) {
        console.error('Error fetching event:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  if (loading) return <p className="text-center mt-10">Loading event details...</p>;
  if (!event) return <p className="text-center mt-10 text-red-500">Event not found.</p>;

  return (
    <div>
      {showModal && (
        <EventDetailsModal event={event} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default EventDetail;
