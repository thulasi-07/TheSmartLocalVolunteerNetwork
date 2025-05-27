import React from 'react';

const ErrorMessage = ({ message }) => {
  return (
    <div className="text-red-600 text-sm mt-1">
      {message}
    </div>
  );
};

export default ErrorMessage;
