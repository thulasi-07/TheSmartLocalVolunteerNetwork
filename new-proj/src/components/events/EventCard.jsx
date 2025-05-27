import React from 'react';
import { Link } from 'react-router-dom';

const EventCard = ({ event }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition w-full">
      <h2 className="text-lg font-semibold text-indigo-600 mb-2">{event.title}</h2>
      <p className="text-gray-700 text-sm">{event.description}</p>
      <p className="mt-2 text-sm text-gray-500">
        📍 {event.location} | 🕒 {event.date}
      </p>
      <div className="mt-4 flex justify-between items-center">
        <Link
          to={`/events/${event._id}`}
          className="text-sm text-indigo-500 hover:underline"
        >
          View Details
        </Link>
        {event.registered ? (
          <span className="text-green-600 text-sm">✅ Registered</span>
        ) : (
          <button className="bg-indigo-500 text-white px-3 py-1 rounded text-sm hover:bg-indigo-600">
            Register
          </button>
        )}
      </div>
    </div>
  );
};

export default EventCard;
