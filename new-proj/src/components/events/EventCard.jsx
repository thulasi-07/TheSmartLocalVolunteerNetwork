import React, { useState, useEffect } from 'react';
import {
  participateInEvent,
  markNotInterested,
  markEventCompleted,
  fetchEventById
} from '../../services/eventApi';
import { toast } from 'react-toastify';

const EventCard = ({ event, userId: propUserId }) => {
  const [status, setStatus] = useState('');
  const [userId, setUserId] = useState(propUserId);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!userId && storedUser) {
      setUserId(storedUser._id);
    }

    const determineStatus = async () => {
      try {
        const latestEvent = await fetchEventById(event._id);
        const { participants, completedVolunteers, notInterested } = latestEvent.data;

        if (completedVolunteers.includes(storedUser._id)) {
          setStatus('completed');
        } else if (participants.includes(storedUser._id)) {
          setStatus('participated');
        } else if (notInterested.includes(storedUser._id)) {
          setStatus('not_interested');
        } else {
          setStatus('');
        }
      } catch (err) {
        console.error('Error fetching event status', err);
      }
    };

    if (userId) determineStatus();
  }, [userId, event._id]);

  const handleParticipation = async () => {
    try {
      await participateInEvent(event._id, userId);
      setStatus('participated');
      toast.success('You have successfully registered!');
      window.alert('You have successfully registered!');
    } catch (err) {
      toast.error('Error while participating');
      console.error(err);
    }
  };

  const handleNotInterested = async () => {
    try {
      await markNotInterested(event._id, userId);
      setStatus('not_interested');
      toast.info('Marked as not interested');
    } catch (err) {
      toast.error('Error while updating status');
      console.error(err);
    }
  };

  const handleCompleted = async () => {
    try {
      await markEventCompleted(event._id, userId);
      setStatus('completed');
      toast.success('Marked as completed!');
    } catch (err) {
      toast.error('Error while completing task');
      console.error(err);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-6 border hover:shadow-lg transition">
      <h3 className="text-2xl font-bold text-indigo-700">{event.title}</h3>
      <p className="text-gray-700 mt-2">{event.description}</p>

      <div className="text-sm text-gray-600 mt-3">
        📅 <strong>{event.date}</strong> | 🕒 <strong>{event.time}</strong> | 📍 <strong>{event.location}</strong>
      </div>

      <div className="mt-4 space-x-2">
        {status === '' && (
          <>
            <button
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              onClick={handleParticipation}
            >
              Participate
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              onClick={handleNotInterested}
            >
              Not Interested
            </button>
          </>
        )}

        {status === 'participated' && (
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={handleCompleted}
          >
            Mark as Completed
          </button>
        )}

        {status === 'not_interested' && (
          <span className="text-red-600 font-semibold">❌ Not Interested</span>
        )}

        {status === 'completed' && (
          <span className="text-green-600 font-semibold">✅ Task Completed</span>
        )}
      </div>
    </div>
  );
};

export default EventCard;
