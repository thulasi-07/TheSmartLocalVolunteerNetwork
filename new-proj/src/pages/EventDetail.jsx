// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import EventDetailsModal from '../components/events/EventDetailsModal';
// import API from '../services/api';

// const EventDetail = () => {
//   const { eventId } = useParams();
//   const [event, setEvent] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [showModal, setShowModal] = useState(true); // Automatically open modal

//   useEffect(() => {
//     const fetchEvent = async () => {
//       try {
//         const response = await API.get(`/events/${eventId}`);
//         setEvent(response.data);
//       } catch (error) {
//         console.error('Error fetching event:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEvent();
//   }, [eventId]);

//   if (loading) return <p className="text-center mt-10">Loading event details...</p>;
//   if (!event) return <p className="text-center mt-10 text-red-500">Event not found.</p>;

//   return (
//     <div>
//       {showModal && (
//         <EventDetailsModal event={event} onClose={() => setShowModal(false)} />
//       )}
//     </div>
//   );
// };

// export default EventDetail;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EventDetailsModal from '../components/events/EventDetailsModal';
import FeedbackForm from '../components/volunteer/FeedbackForm';
import FeedbackList from '../components/feedback/FeedbackList';
import API from '../services/authApi';

const EventDetail = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(true);
  const [refreshFeedback, setRefreshFeedback] = useState(false);

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

  const handleFeedbackSubmitted = () => {
    setRefreshFeedback(!refreshFeedback);
  };

  if (loading) return <p className="text-center mt-10">Loading event details...</p>;
  if (!event) return <p className="text-center mt-10 text-red-500">Event not found.</p>;

  return (
    <div>
      {showModal && (
        <EventDetailsModal event={event} onClose={() => setShowModal(false)} />
      )}

      {/* Feedback Section */}
      <div className="p-4 max-w-3xl mx-auto">
        <h2 className="text-xl font-semibold mt-8 mb-4">Leave Your Feedback</h2>
        <FeedbackForm eventId={eventId} onFeedbackSubmitted={handleFeedbackSubmitted} />

        <h2 className="text-xl font-semibold mt-8 mb-4">Feedback Received</h2>
        <FeedbackList key={refreshFeedback} eventId={eventId} />
      </div>
    </div>
  );
};

export default EventDetail;
