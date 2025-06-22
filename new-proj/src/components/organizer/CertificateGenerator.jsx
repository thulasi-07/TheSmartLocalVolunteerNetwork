// src/components/organizer/CertificateGenerator.jsx
import React, { useState } from 'react';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { saveAs } from 'file-saver';
import { toast } from 'react-toastify';
// import axios from '../../services/api'; // Uncomment if saving to backend

const CertificateGenerator = () => {
  const [volunteerName, setVolunteerName] = useState('');
  const [eventName, setEventName] = useState('');
  const [stars, setStars] = useState('');
  const [organizerName, setOrganizerName] = useState('');

  const generateCertificate = async () => {
    if (!volunteerName || !eventName || !stars || !organizerName) {
      toast.error('Please fill all fields');
      return;
    }

    try {
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage([600, 400]);
      const { width, height } = page.getSize();
      const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

      // Background
      page.drawRectangle({
        x: 0,
        y: 0,
        width,
        height,
        color: rgb(1, 0.99, 0.95),
      });

      // Border
      page.drawRectangle({
        x: 20,
        y: 20,
        width: width - 40,
        height: height - 40,
        borderWidth: 2,
        borderColor: rgb(0.6, 0.6, 0.6),
      });

      // Title
      page.drawText('Certificate of Appreciation', {
        x: 140,
        y: 330,
        size: 22,
        font,
        color: rgb(0.2, 0.3, 0.6),
      });

      // Body
      page.drawText('Presented to', {
        x: 240,
        y: 290,
        size: 12,
        font,
        color: rgb(0.3, 0.3, 0.3),
      });

      page.drawText(volunteerName, {
        x: 180,
        y: 260,
        size: 18,
        font,
        color: rgb(0.1, 0.6, 0.2),
      });

      page.drawText('for outstanding contribution to', {
        x: 180,
        y: 230,
        size: 12,
        font,
        color: rgb(0.3, 0.3, 0.3),
      });

      page.drawText(`"${eventName}"`, {
        x: 180,
        y: 205,
        size: 14,
        font,
        color: rgb(0.2, 0.2, 0.6),
      });

      page.drawText(`Rating: ${'*'.repeat(stars)} (${stars}/5)`, {
        x: 200,
        y: 170,
        size: 12,
        font,
        color: rgb(0.8, 0.5, 0),
      });

      page.drawText(`Organizer: ${organizerName}`, {
        x: 180,
        y: 130,
        size: 12,
        font,
        color: rgb(0.2, 0.2, 0.2),
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      saveAs(blob, `Certificate_${volunteerName}.pdf`);

      toast.success('Certificate downloaded successfully!');

      // Optional: save to backend so volunteer can view it later
      /*
      await axios.post('/certificates', {
        volunteerName,
        eventName,
        stars,
        organizerName,
        date: new Date(),
      });
      */

    } catch (err) {
      console.error(err);
      toast.error('Failed to generate certificate');
    }
  };

  return (
    <div className="bg-white max-w-xl mx-auto p-6 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-indigo-700">Generate Certificate</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Volunteer Name"
          value={volunteerName}
          onChange={(e) => setVolunteerName(e.target.value)}
          className="w-full border border-gray-300 rounded px-4 py-2"
        />
        <input
          type="text"
          placeholder="Event Name"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          className="w-full border border-gray-300 rounded px-4 py-2"
        />
        <select
          value={stars}
          onChange={(e) => setStars(e.target.value)}
          className="w-full border border-gray-300 rounded px-4 py-2"
        >
          <option value="">Select Star Rating</option>
          {[1, 2, 3, 4, 5].map((s) => (
            <option key={s} value={s}>{`${'*'.repeat(s)} (${s})`}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Organizer Name"
          value={organizerName}
          onChange={(e) => setOrganizerName(e.target.value)}
          className="w-full border border-gray-300 rounded px-4 py-2"
        />
        <button
          onClick={generateCertificate}
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
        >
          Generate Certificate
        </button>
      </div>
    </div>
  );
};

export default CertificateGenerator;
