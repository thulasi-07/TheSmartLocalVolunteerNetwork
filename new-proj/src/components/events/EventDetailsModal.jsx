import React, { useEffect, useState } from 'react';
import Modal from '../common/Modal';
import API from '../../services/authApi';

const EventDetailsModal = ({ eventId, isOpen, onClose }) => {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen && eventId) {
      fetchEventDetails();
    }
  }, [isOpen, eventId]);

  const fetchEventDetails = async () => {
    try {
      setLoading(true);
      const response = await API.get(`/events/${eventId}`);
      setEvent(response.data);
    } catch (error) {
      console.error('Error fetching event details:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Event Details">
      {loading ? (
        <p className="text-center">Loading event details...</p>
      ) : event ? (
        <div className="space-y-4">
          <h2 className="text-xl font-bold">{event.title}</h2>
          <p><strong>Description:</strong> {event.description}</p>
          <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
          <p><strong>Location:</strong> {event.location}</p>
          <p><strong>Organizer:</strong> {event.organizerName || 'N/A'}</p>
          <p><strong>Spots:</strong> {event.volunteersRegistered?.length || 0} / {event.maxVolunteers}</p>
          {/* Additional fields */}
        </div>
      ) : (
        <p className="text-center text-red-500">Failed to load event details.</p>
      )}
    </Modal>
  );
};

export default EventDetailsModal;
