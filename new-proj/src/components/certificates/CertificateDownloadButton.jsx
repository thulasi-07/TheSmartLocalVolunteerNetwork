import React from 'react';

const CertificateDownloadButton = ({ downloadUrl }) => {
  const handleDownload = () => {
    window.open(downloadUrl, '_blank');
  };

  return (
    <button
      onClick={handleDownload}
      className="mt-2 inline-block bg-indigo-600 text-white text-sm px-4 py-2 rounded hover:bg-indigo-700 transition"
    >
      Download Certificate
    </button>
  );
};

export default CertificateDownloadButton;
