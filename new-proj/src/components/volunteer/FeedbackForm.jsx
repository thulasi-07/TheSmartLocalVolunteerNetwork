// src/components/volunteer/FeedbackForm.jsx
import React, { useEffect, useState } from 'react';
import axios from '../../services/api';
import { toast } from 'react-toastify';

const FeedbackForm = ({ volunteerId }) => {
  const [eventId, setEventId] = useState('');
  const [message, setMessage] = useState('');
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchCompletedEvents = async () => {
      try {
        const res = await axios.get(`/events/stats/${volunteerId}`);
        const completedEvents = res.data.completedEvents || [];
        setEvents(completedEvents);
      } catch (err) {
        toast.error('Failed to load completed events');
      }
    };

    if (volunteerId) fetchCompletedEvents();
  }, [volunteerId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!eventId || !message) return toast.error('Please fill in all fields');

    try {
      await axios.post('/feedback', { volunteerId, eventId, message });
      toast.success('Feedback submitted!');
      window.alert('Thank you for your feedback!');
      setEventId('');
      setMessage('');
    } catch (err) {
      toast.error('Failed to submit feedback');
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4 text-indigo-700">Submit Feedback</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          value={eventId}
          onChange={(e) => setEventId(e.target.value)}
          className="w-full border px-4 py-2 rounded text-gray-700"
        >
          <option value="">Select a Completed Event</option>
          {events.map(event => (
            <option key={event._id} value={event._id}>
              {event.title}
            </option>
          ))}
        </select>

        <textarea
          placeholder="Your feedback..."
          className="w-full border px-4 py-2 rounded h-28"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button
          type="submit"
          className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;
