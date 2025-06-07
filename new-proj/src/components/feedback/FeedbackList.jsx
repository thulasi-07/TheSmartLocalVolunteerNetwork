// // src/components/feedback/FeedbackList.jsx
// import React, { useEffect, useState } from 'react';
// import axios from '../../services/api'; // your axios instance

// const FeedbackList = ({ eventId }) => {
//   const [feedbacks, setFeedbacks] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchFeedbacks = async () => {
//       try {
//         const res = await axios.get(`/feedback/${eventId}`);
//         setFeedbacks(res.data);
//       } catch (err) {
//         console.error('Failed to fetch feedback:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchFeedbacks();
//   }, [eventId]);

//   if (loading) return <p>Loading feedback...</p>;

//   if (feedbacks.length === 0) return <p>No feedback submitted yet.</p>;

//   return (
//     <div>
//       {feedbacks.map(({ _id, rating, comments, submittedBy, submittedAt }) => (
//         <div key={_id} className="border-b py-2">
//           <p className="font-semibold">Rating: {rating} / 5</p>
//           <p>{comments}</p>
//           <p className="text-sm text-gray-500">
//             By: {submittedBy || 'Anonymous'} on {new Date(submittedAt).toLocaleDateString()}
//           </p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default FeedbackList;


// src/components/feedback/FeedbackList.jsx
import React, { useEffect, useState } from 'react';
import axios from '../../services/api'; // your axios instance

const FeedbackList = ({ eventId }) => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await axios.get(`/feedbacks`, {
          params: eventId ? { eventId } : {}
        });
        setFeedbacks(res.data);
      } catch (err) {
        console.error('Failed to fetch feedback:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, [eventId]);

  if (loading) return <p>Loading feedback...</p>;

  if (feedbacks.length === 0) return <p>No feedback submitted yet.</p>;

  return (
    <div>
      {feedbacks.map(({ _id, rating, comments, submittedBy, submittedAt }) => (
        <div key={_id} className="border-b py-2">
          <p className="font-semibold">Rating: {rating} / 5</p>
          <p>{comments}</p>
          <p className="text-sm text-gray-500">
            By: {submittedBy || 'Anonymous'} on {new Date(submittedAt).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default FeedbackList;
