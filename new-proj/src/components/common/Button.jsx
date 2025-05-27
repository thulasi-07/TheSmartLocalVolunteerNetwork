import React from 'react';

const Button = ({ text, onClick, type = 'button', className = '' }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;
