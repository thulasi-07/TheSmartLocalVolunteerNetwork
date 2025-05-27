import React from 'react';

const SuccessMessage = ({ message }) => {
  return (
    <div className="text-green-600 text-sm mt-1">
      {message}
    </div>
  );
};

export default SuccessMessage;
