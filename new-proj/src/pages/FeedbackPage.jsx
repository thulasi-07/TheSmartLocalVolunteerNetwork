import React, { useEffect, useState } from 'react';
import API from '../services/authApi';

const FeedbackPage = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFeedbacks = async () => {
    try {
      const response = await API.get('/feedback'); // Adjust according to your backend route
      setFeedbacks(response.data);
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Event Feedbacks</h2>
      {loading ? (
        <p>Loading feedbacks...</p>
      ) : feedbacks.length > 0 ? (
        <div className="grid gap-4">
          {feedbacks.map((feedback) => (
            <div
              key={feedback._id}
              className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500"
            >
              <h3 className="font-semibold text-lg mb-1">
                {feedback.eventName || 'Unnamed Event'}
              </h3>
              <p className="text-gray-700 italic">"{feedback.comment}"</p>
              <p className="text-sm text-gray-500 mt-2">— {feedback.userName}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No feedback available yet.</p>
      )}
    </div>
  );
};

export default FeedbackPage;
