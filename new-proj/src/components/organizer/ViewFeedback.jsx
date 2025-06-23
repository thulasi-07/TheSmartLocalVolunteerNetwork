import React, { useEffect, useState } from 'react';
import { getFeedbacksForOrganizer } from '../../services/organizerApi';

const ViewFeedback = ({ organizerId }) => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const loadFeedbacks = async () => {
      try {
        const res = await getFeedbacksForOrganizer(organizerId);
        setFeedbacks(res.data);
      } catch (err) {
        console.error('Failed to load feedbacks', err);
      }
    };
    loadFeedbacks();
  }, [organizerId]);

  return (
    <div className="bg-white shadow p-6 rounded-md mt-4">
      <h2 className="text-xl font-bold mb-4 text-indigo-700">Volunteer Feedback</h2>
      {feedbacks.length === 0 ? (
        <p className="text-gray-500">No feedbacks available.</p>
      ) : (
        <ul className="space-y-3">
          {feedbacks.map((fb) => (
            <li key={fb._id} className="p-3 bg-gray-100 rounded-md">
              <p><strong>Event:</strong> {fb.eventId?.title}</p>
              <p><strong>Volunteer:</strong> {fb.volunteerId?.name}</p>
              <p className="mt-1"><strong>Message:</strong> {fb.message}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewFeedback;
