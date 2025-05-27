import React from 'react';

const EventRegisterModal = ({ event, isOpen, onClose, onRegister }) => {
  if (!isOpen || !event) return null;

  const handleRegister = () => {
    onRegister(event._id); // Assuming MongoDB ID
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-xl w-11/12 max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-red-500 text-xl"
        >
          ✕
        </button>
        <h2 className="text-xl font-bold text-indigo-600 mb-2">{event.title}</h2>
        <p className="text-gray-700 text-sm mb-2">{event.description}</p>
        <p className="text-sm text-gray-600">📍 {event.location}</p>
        <p className="text-sm text-gray-600">📅 {event.date} | 🕒 {event.time}</p>
        <button
          onClick={handleRegister}
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Confirm Registration
        </button>
      </div>
    </div>
  );
};

export default EventRegisterModal;
