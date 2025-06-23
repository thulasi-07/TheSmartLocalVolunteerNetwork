// src/components/organizer/FeedbackPanel.jsx
import React, { useEffect, useState } from 'react';
import axios from '../../services/api'; // ✅ Make sure this is correct
import { toast } from 'react-toastify';

const FeedbackPanel = ({ organizerId }) => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
       const res = await axios.get(`/feedback/organizer/${organizerId}`);


        setFeedbacks(res.data);
      } catch (err) {
        console.error('Failed to fetch feedbacks:', err);
        toast.error('Error fetching feedbacks');
      }
    };

    if (organizerId) fetchFeedbacks();
  }, [organizerId]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-indigo-700 mb-4">Volunteer Feedbacks</h2>

      {feedbacks.length === 0 ? (
        <p className="text-gray-500 text-sm">No feedbacks received yet.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {feedbacks.map((feedback) => (
            <li key={feedback._id} className="py-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-medium text-gray-900">
                    {feedback.volunteerName}
                  </p>
                  <p className="text-sm text-gray-600">{feedback.eventTitle}</p>
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(feedback.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="mt-2 text-gray-700 text-sm">{feedback.message}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FeedbackPanel;
