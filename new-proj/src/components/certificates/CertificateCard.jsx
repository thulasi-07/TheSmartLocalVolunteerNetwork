import React from 'react';
import CertificateDownloadButton from './CertificateDownloadButton';

const CertificateCard = ({ certificate }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center text-center hover:shadow-lg transition">
      <img 
        src={certificate.imageUrl || '/assets/certificates/default-certificate.png'} 
        alt="Certificate Preview" 
        className="w-full h-48 object-contain mb-4 border rounded-lg" 
      />
      <h3 className="text-lg font-semibold text-gray-800">{certificate.eventName}</h3>
      <p className="text-sm text-gray-500 mb-2">Awarded on: {certificate.date}</p>
      
      {/* Reusable Button Component */}
      <CertificateDownloadButton downloadUrl={certificate.downloadUrl} />
    </div>
  );
};

export default CertificateCard;
