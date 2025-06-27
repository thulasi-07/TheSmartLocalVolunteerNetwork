// src/pages/CertificatePage.jsx
import React from 'react';
import CertificateGenerator from '../components/organizer/CertificateGenerator';

const CertificatePage = () => {
  // You can get organizerId from localStorage or context
  const organizerId = localStorage.getItem('organizerId');

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <CertificateGenerator organizerId={organizerId} />
    </div>
  );
};

export default CertificatePage;
