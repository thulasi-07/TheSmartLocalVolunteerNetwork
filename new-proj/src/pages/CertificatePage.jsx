import React, { useEffect, useState } from 'react';
import CertificateCard from '../components/certificates/CertificateCard';
import { fetchCertificates } from '../services/certificateService';

const CertificatePage = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCertificates = async () => {
      try {
        const data = await fetchCertificates();
        setCertificates(data);
      } catch (error) {
        console.error("Error fetching certificates:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCertificates();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">My Certificates</h1>
      {loading ? (
        <p className="text-center text-gray-500">Loading certificates...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.length > 0 ? (
            certificates.map((cert) => (
              <CertificateCard key={cert._id} certificate={cert} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">No certificates found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CertificatePage;
