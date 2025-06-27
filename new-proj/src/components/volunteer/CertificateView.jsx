// src/components/volunteer/CertificateView.jsx
import React, { useEffect, useState } from 'react';
import axios from '../../services/api';
import { toast } from 'react-toastify';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

const CertificateView = ({ volunteerId }) => {
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

  const generatePDF = async (cert) => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595, 842]); // A4 size
    const titleFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const { width, height } = page.getSize();

    // Styled certificate frame
    page.drawRectangle({
      x: 40,
      y: 40,
      width: width - 80,
      height: height - 80,
      borderColor: rgb(0.3, 0.3, 0.8),
      borderWidth: 2,
    });

    // Title
    page.drawText('Certificate of Participation', {
  x: 60,
  y: height - 100,
  size: 24,
  font: titleFont,
  color: rgb(0.2, 0.2, 0.6),
});


    // Volunteer Name
    page.drawText(`Awarded to:`, {
      x: 60,
      y: height - 150,
      size: 16,
      font: regularFont,
    });
    page.drawText(`${cert.volunteerId?.name || 'Volunteer Name'}`, {
      x: 60,
      y: height - 170,
      size: 20,
      font: titleFont,
      color: rgb(0.1, 0.4, 0.6),
    });

    // Event Title
    page.drawText(`For successfully participating in the event:`, {
      x: 60,
      y: height - 210,
      size: 14,
      font: regularFont,
    });
    page.drawText(`"${cert.eventId?.title || 'Event Title'}"`, {
      x: 60,
      y: height - 230,
      size: 18,
      font: titleFont,
      color: rgb(0.2, 0.5, 0.2),
    });

    // Organizer Name
    page.drawText(`Organized by: ${cert.organizerId?.name || 'Organizer Name'}`, {
      x: 60,
      y: height - 270,
      size: 14,
      font: regularFont,
    });

    // Description & Date
    page.drawText(`Remarks: ${cert.description}`, {
      x: 60,
      y: height - 300,
      size: 12,
      font: regularFont,
    });

    page.drawText(`Issued on: ${new Date(cert.createdAt).toLocaleDateString()}`, {
      x: 60,
      y: height - 330,
      size: 12,
      font: regularFont,
      color: rgb(0.5, 0.5, 0.5),
    });

    // Finalize PDF
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Certificate_${cert.eventId?.title?.replace(/\s+/g, '_') || 'event'}.pdf`;
    link.click();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-indigo-700 mb-4">🎓 My Certificates</h2>

      {certificates.length === 0 ? (
        <p className="text-gray-500">No certificates yet.</p>
      ) : (
        <div className="space-y-4">
          {certificates.map((cert) => (
            <div key={cert._id} className="p-4 border rounded bg-indigo-50 shadow">
              <h3 className="text-lg font-semibold text-indigo-800">
                {cert.eventId?.title || 'Untitled Event'}
              </h3>
              <p className="text-sm text-gray-700 mt-1">
                <strong>Organizer:</strong> {cert.organizerId?.name || 'N/A'} <br />
                <strong>Description:</strong> {cert.description} <br />
                <strong>Date:</strong> {new Date(cert.createdAt).toLocaleDateString()}
              </p>
              <button
                onClick={() => generatePDF(cert)}
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

export default CertificateView;
