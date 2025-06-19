// // src/components/feedback/FeedbackForm.jsx
// import React, { useState } from 'react';
// import axios from '../../services/api'; // your axios instance

// const FeedbackForm = ({ eventId, onFeedbackSubmitted }) => {
//   const [rating, setRating] = useState(5);
//   const [comments, setComments] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     try {
//       await axios.post('/feedback', { eventId, rating, comments });
//       setRating(5);
//       setComments('');
//       onFeedbackSubmitted(); // notify parent
//     } catch (err) {
//       setError('Failed to submit feedback.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="mb-6">
//       <label className="block mb-2 font-semibold">Rating (1-5):</label>
//       <select
//         value={rating}
//         onChange={(e) => setRating(Number(e.target.value))}
//         className="border rounded p-2 mb-4 w-full max-w-xs"
//       >
//         {[5,4,3,2,1].map((r) => (
//           <option key={r} value={r}>{r}</option>
//         ))}
//       </select>

//       <label className="block mb-2 font-semibold">Comments:</label>
//       <textarea
//         value={comments}
//         onChange={(e) => setComments(e.target.value)}
//         className="border rounded p-2 mb-4 w-full max-w-md"
//         rows={3}
//         placeholder="Write your feedback..."
//         required
//       />

//       {error && <p className="text-red-500 mb-2">{error}</p>}

//       <button
//         type="submit"
//         disabled={loading}
//         className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
//       >
//         {loading ? 'Submitting...' : 'Submit Feedback'}
//       </button>
//     </form>
//   );
// };

// export default FeedbackForm;

// src/components/feedback/FeedbackForm.jsx
import React, { useState, useContext } from 'react';
import axios from '../../services/api'; // your axios instance
import { AuthContext } from '../../context/AuthContext';

const FeedbackForm = ({ eventId, onFeedbackSubmitted }) => {
  const [rating, setRating] = useState(5);
  const [comments, setComments] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!comments.trim()) {
      setError('Please write a comment.');
      setLoading(false);
      return;
    }

    try {
      await axios.post('/feedbacks', {
        userId: user?._id,
        eventId,
        rating,
        comments
      });
      setRating(5);
      setComments('');
      onFeedbackSubmitted(); // notify parent
    } catch (err) {
      setError('Failed to submit feedback.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <label className="block mb-2 font-semibold">Rating (1-5):</label>
      <select
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
        className="border rounded p-2 mb-4 w-full max-w-xs"
      >
        {[5, 4, 3, 2, 1].map((r) => (
          <option key={r} value={r}>{r}</option>
        ))}
      </select>

      <label className="block mb-2 font-semibold">Comments:</label>
      <textarea
        value={comments}
        onChange={(e) => setComments(e.target.value)}
        className="border rounded p-2 mb-4 w-full max-w-md"
        rows={3}
        placeholder="Write your feedback..."
        required
      />

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Submitting...' : 'Submit Feedback'}
      </button>
    </form>
  );
};

export default FeedbackForm;

