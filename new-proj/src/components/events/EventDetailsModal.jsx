// src/components/events/EventDetailsModal.jsx
import React, { useState } from 'react';
import FeedbackForm from '../feedback/FeedbackForm';
import FeedbackList from '../feedback/FeedbackList';

const EventDetailsModal = ({ event, isOpen, onClose }) => {
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-11/12 max-w-3xl max-h-[90vh] overflow-y-auto relative shadow-lg">
        <button
          className="absolute top-3 right-4 text-gray-600 hover:text-gray-900 text-2xl font-bold"
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>

        {/* Event Details */}
        <h2 className="text-3xl font-bold mb-4">{event.title}</h2>
        <p className="mb-2">{event.description}</p>
        <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
        <p><strong>Time:</strong> {event.time}</p>
        <p><strong>Location:</strong> {event.location}</p>
        <p><strong>Organizer:</strong> {event.organizerName || 'N/A'}</p>

        {/* Feedback Section */}
        <div className="mt-8 border-t pt-6">
          <h3 className="text-2xl font-semibold mb-4">Volunteer Feedback</h3>

          <FeedbackForm
            eventId={event._id}
            onFeedbackSubmitted={() => setFeedbackSubmitted(!feedbackSubmitted)}
          />

          <FeedbackList
            eventId={event._id}
            key={feedbackSubmitted}
          />
        </div>
      </div>
    </div>
  );
};

export default EventDetailsModal;
