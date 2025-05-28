import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const InvitePage = () => {
  const { eventId } = useParams();
  const [copySuccess, setCopySuccess] = useState('');

  const inviteLink = `${window.location.origin}/eventdetail/${eventId}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(inviteLink)
      .then(() => setCopySuccess('Link copied to clipboard!'))
      .catch(() => setCopySuccess('Failed to copy link.'));
    
    setTimeout(() => setCopySuccess(''), 3000);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Invite Friends to Join Event</h1>
      <p className="mb-4">
        Share the invitation link below with your friends to invite them to participate in this event.
      </p>

      <div className="flex items-center space-x-2">
        <input
          type="text"
          readOnly
          value={inviteLink}
          className="flex-grow p-2 border rounded focus:outline-none"
        />
        <button
          onClick={copyToClipboard}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Copy Link
        </button>
      </div>

      {copySuccess && (
        <p className="mt-2 text-green-600 font-semibold">{copySuccess}</p>
      )}
    </div>
  );
};

export default InvitePage;
