const Certificate = require('../models/Certificate');
const Event = require('../models/Event');
const User = require('../models/User');
const PDFDocument = require('pdfkit');

// Generate and store certificate in DB
exports.generateCertificateForVolunteer = async (req, res) => {
  try {
    const { volunteerId, eventId, organizerId, description } = req.body;

    // ✅ Check if a certificate already exists for this volunteer and event
    const existingCert = await Certificate.findOne({ volunteerId, eventId });
    if (existingCert) {
      return res.status(400).json({
        error: 'Certificate already generated for this volunteer and event.',
        existingCert,
      });
    }

    // Proceed if no certificate exists
    const [event, volunteer, organizer] = await Promise.all([
      Event.findById(eventId),
      User.findById(volunteerId),
      User.findById(organizerId),
    ]);

    if (!event || !volunteer || !organizer) {
      return res.status(404).json({ error: 'Event, Volunteer, or Organizer not found' });
    }

    const cert = new Certificate({
      volunteerId,
      organizerId,
      eventId,
      eventTitle: event.title,
      volunteerName: volunteer.name,
      organizerName: organizer.name,
      description,
    });

    await cert.save();
    res.status(201).json({ message: 'Certificate generated', cert });

  } catch (error) {
    console.error('Error generating certificate:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


// Get all certificates for a volunteer
// CertificateController.js
exports.getCertificatesByVolunteer = async (req, res) => {
  try {
    const certs = await Certificate.find({ volunteerId: req.params.volunteerId })
      .populate('volunteerId', 'name')
      .populate('eventId', 'title')
      .populate('organizerId', 'name');
    res.json(certs);
  } catch (error) {
    console.error('Error fetching certificates:', error);
    res.status(500).json({ message: 'Failed to fetch certificates' });
  }
};


// Generate and download PDF version of the certificate
exports.generateCertificatePDF = async (req, res) => {
  try {
    const { certificateId } = req.params;

    const cert = await Certificate.findById(certificateId)
      .populate('eventId', 'title')
      .populate('organizerId', 'name')
      .populate('volunteerId', 'name email');

    if (!cert) {
      return res.status(404).json({ message: 'Certificate not found' });
    }

    const doc = new PDFDocument({ size: 'A4', margin: 50 });

    // Set response headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=Certificate_${cert.eventId.title.replace(/\s+/g, '_')}.pdf`);

    doc.pipe(res);

    // --- Certificate Layout ---
    doc
      .fontSize(26)
      .fillColor('#1f2937')
      .text('🎓 Certificate of Participation', {
        align: 'center',
        underline: true
      });

    doc.moveDown(2);

    doc
      .fontSize(16)
      .fillColor('#000000')
      .text('This is to certify that ', { continued: true })
      .fillColor('#4f46e5')
      .text(cert.volunteerId.name, { continued: true, underline: true })
      .fillColor('#000000')
      .text(' has successfully participated in the event ', { continued: true })
      .fillColor('#4f46e5')
      .text(cert.eventId.title, { continued: true, underline: true })
      .fillColor('#000000')
      .text(' organized by ', { continued: true })
      .fillColor('#4f46e5')
      .text(cert.organizerId.name, { underline: true });

    doc.moveDown(1.5);

    doc
      .fontSize(14)
      .fillColor('#374151')
      .text(`Description: ${cert.description || 'N/A'}`);

    doc.moveDown(2);

    doc
      .fontSize(12)
      .fillColor('#9ca3af')
      .text(`Issued on: ${new Date(cert.createdAt).toLocaleDateString()}`, {
        align: 'right'
      });

    doc.end();

  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
