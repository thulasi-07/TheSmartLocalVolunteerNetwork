// import React, { useEffect, useState } from 'react';
// import { getRecommendedEvents } from '../services/eventApi';

// const RecommendedEvents = ({ userId }) => {
//   const [recommended, setRecommended] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const res = await getRecommendedEvents(userId);
//       setRecommended(res.data);
//     };
//     fetchData();
//   }, [userId]);

//   return (
//     <div className="p-6 bg-white rounded shadow-md">
//       <h2 className="text-2xl font-semibold text-indigo-700 mb-4">🔍 Recommended Events</h2>
//       {recommended.length === 0 ? (
//         <p>No recommendations at the moment.</p>
//       ) : (
//         <ul className="space-y-3">
//           {recommended.map(event => (
//             <li key={event._id} className="border p-3 rounded">
//               <h3 className="text-lg font-bold">{event.title}</h3>
//               <p className="text-sm text-gray-600">{event.description}</p>
//               <p className="text-sm text-blue-600">Location: {event.location}</p>
//               <p className="text-sm text-green-600">Score: {(event.score * 100).toFixed(1)}%</p>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default RecommendedEvents;
