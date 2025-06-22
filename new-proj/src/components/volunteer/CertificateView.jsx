import React, { useEffect, useState } from 'react';
import axios from '../../services/api';

const CertificateView = ({ volunteerId }) => {
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    const loadCertificates = async () => {
      try {
        const res = await axios.get(`/certificates/${volunteerId}`);
        setCertificates(res.data);
      } catch (err) {
        console.error('Error loading certificates', err);
      }
    };
    loadCertificates();
  }, [volunteerId]);

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold text-green-700 mb-4">Certificates</h2>
      {certificates.length === 0 ? (
        <p className="text-gray-500">No certificates issued yet.</p>
      ) : (
        <ul className="space-y-3">
          {certificates.map((cert, i) => (
            <li key={i} className="flex justify-between items-center p-3 border rounded">
              <div>
                <p className="font-medium">{cert.eventName}</p>
                <p className="text-sm text-gray-600">Issued by {cert.organizerName}</p>
              </div>
              <a
                href={cert.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                View PDF
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CertificateView;
