import React from 'react';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-6 w-11/12 max-w-md relative">
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-lg"
          onClick={onClose}
        >
          ✕
        </button>
        <div className="text-sm">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
