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
  const page = pdfDoc.addPage([842, 595]); // A4 Landscape
  const titleFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const { width, height } = page.getSize();

  // Light cream background
  page.drawRectangle({
    x: 0,
    y: 0,
    width,
    height,
    color: rgb(0.98, 0.98, 0.96),
  });

  // Outer border
  page.drawRectangle({
    x: 30,
    y: 30,
    width: width - 60,
    height: height - 60,
    borderColor: rgb(0.3, 0.3, 0.6),
    borderWidth: 2,
  });

  // Watermark
  const watermark = 'CERTIFICATE';
  const watermarkSize = 60;
  const watermarkWidth = titleFont.widthOfTextAtSize(watermark, watermarkSize);
  page.drawText(watermark, {
    x: (width - watermarkWidth) / 2,
    y: height / 2,
    size: watermarkSize,
    font: titleFont,
    color: rgb(0.9, 0.9, 0.9),
    opacity: 0.2,
  });

  // Start vertical position
  let y = height - 90;

  const drawCenteredText = (text, font, size, color = rgb(0, 0, 0), spacing = 25) => {
    const textWidth = font.widthOfTextAtSize(text, size);
    page.drawText(text, {
      x: (width - textWidth) / 2,
      y,
      size,
      font,
      color,
    });
    y -= spacing; // Adjust gap after each line
  };

  // ✍️ Draw Certificate Content - with spacing
  drawCenteredText('Certificate of Participation', titleFont, 28, rgb(0.2, 0.3, 0.6), 40);
  drawCenteredText('This certificate is awarded to', regularFont, 16, rgb(0.3, 0.3, 0.3), 20);
  drawCenteredText(cert.volunteerId?.name || 'Volunteer Name', titleFont, 22, rgb(0.1, 0.4, 0.6), 30);
  drawCenteredText('For successfully participating in the event:', regularFont, 14, rgb(0.2, 0.2, 0.2), 20);
  drawCenteredText(`"${cert.eventId?.title || 'Event Title'}"`, titleFont, 18, rgb(0.2, 0.5, 0.2), 30);
  drawCenteredText(`Organized by: ${cert.organizerId?.name || 'Organizer Name'}`, regularFont, 14, rgb(0.25, 0.25, 0.25), 20);
  drawCenteredText(`Remarks: ${cert.description || 'No remarks'}`, regularFont, 12, rgb(0.2, 0.2, 0.2), 20);
  drawCenteredText(`Issued on: ${new Date(cert.createdAt).toLocaleDateString()}`, regularFont, 12, rgb(0.5, 0.5, 0.5), 20);

  // Save and download
  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `Certificate_${cert.eventId?.title?.replace(/\s+/g, '_') || 'event'}.pdf`;
  link.click();
};



  return (
  <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white flex justify-center items-start py-12 px-4">
    <div className="w-full max-w-4xl">
      <div className="bg-white bg-opacity-90 shadow-2xl rounded-3xl p-10">
        <h2 className="text-3xl font-extrabold text-center text-indigo-700 mb-8">
          🎓 My Certificates
        </h2>

        {certificates.length === 0 ? (
          <p className="text-center text-gray-600">No certificates yet.</p>
        ) : (
          <div className="space-y-8">
            {certificates.map((cert) => (
              <div
                key={cert._id}
                className="bg-indigo-100 border border-indigo-300 p-6 rounded-2xl shadow-md hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold text-indigo-800 mb-2">
                  {cert.eventId?.title || 'Untitled Event'}
                </h3>
                <p className="text-gray-700 leading-relaxed text-sm mb-3">
                  <strong>Organizer:</strong> {cert.organizerId?.name || 'N/A'} <br />
                  <strong>Description:</strong> {cert.description} <br />
                  <strong>Date:</strong> {new Date(cert.createdAt).toLocaleDateString()}
                </p>
                <div className="text-right">
                  <button
                    onClick={() => generatePDF(cert)}
                    className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition"
                  >
                    Download Certificate
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  </div>
);

};

export default CertificateView;
