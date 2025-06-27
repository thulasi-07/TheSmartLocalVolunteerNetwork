// src/components/volunteer/CertificateView.jsx
import React, { useEffect, useState } from 'react';
import axios from '../../services/api';
import { toast } from 'react-toastify';

const CertificateViewer = ({ volunteerId }) => {
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const res = await axios.get(`/certificates/volunteer/${volunteerId}`);
        setCertificates(res.data || []);
      } catch (error) {
        console.error(error);
        toast.error('❌ Failed to fetch certificates');
      }
    };

    if (volunteerId) fetchCertificates();
  }, [volunteerId]);

  const handleDownload = (cert) => {
    const content = `
Certificate of Participation
----------------------------
Event: ${cert.eventId?.title || 'N/A'}
Volunteer: ${cert.volunteerId?.name || 'N/A'}
Organizer: ${cert.organizerId?.name || 'N/A'}
Description: ${cert.description}
Date: ${new Date(cert.createdAt).toLocaleDateString()}
    `;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const fileName = `Certificate_${cert.eventId?.title?.replace(/\s+/g, '_') || 'event'}.txt`;

    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.rel = 'noopener';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-indigo-700 mb-4">🎓 My Certificates</h2>

      {certificates.length === 0 ? (
        <p className="text-gray-500">No certificates yet.</p>
      ) : (
        <div className="space-y-4">
          {certificates.map((cert) => (
            <div key={cert._id} className="p-4 border rounded bg-indigo-50">
              <h3 className="text-lg font-semibold text-indigo-800">
                {cert.eventId?.title || 'Untitled Event'}
              </h3>
              <p className="text-sm text-gray-700 mt-1">
                <strong>Organizer:</strong> {cert.organizerId?.name || 'N/A'} <br />
                <strong>Description:</strong> {cert.description} <br />
                <strong>Date:</strong> {new Date(cert.createdAt).toLocaleDateString()}
              </p>
              <button
                onClick={() => handleDownload(cert)}
                className="mt-2 bg-indigo-600 text-white px-4 py-1 rounded hover:bg-indigo-700"
              >
                Download Certificate
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CertificateViewer;
