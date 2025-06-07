const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const Certificate = require('../models/Certificate');
const User = require('../models/User');
const Event = require('../models/Event');

exports.generateCertificate = async (req, res) => {
  try {
    const { userId, eventId } = req.body;

    const user = await User.findById(userId);
    const event = await Event.findById(eventId);

    if (!user || !event) {
      return res.status(404).json({ message: 'User or event not found' });
    }

    const fileName = `certificate_${user._id}_${event._id}.pdf`;
    const filePath = path.join(__dirname, '..', 'certificates', fileName);

    // Create the PDF document
    const doc = new PDFDocument();
    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    // Design your certificate content here
    doc
      .fontSize(26)
      .text('Certificate of Participation', { align: 'center' })
      .moveDown();

    doc
      .fontSize(18)
      .text(`This certifies that`, { align: 'center' })
      .moveDown(0.5);

    doc
      .fontSize(22)
      .fillColor('blue')
      .text(user.name, { align: 'center' })
      .fillColor('black')
      .moveDown(0.5);

    doc
      .fontSize(18)
      .text(`has successfully participated in`, { align: 'center' })
      .moveDown(0.5);

    doc
      .fontSize(20)
      .text(event.title, { align: 'center' })
      .moveDown(2);

    doc
      .fontSize(14)
      .text(`Date: ${new Date().toLocaleDateString()}`, { align: 'right' });

    doc.end();

    // Wait until file is written
    stream.on('finish', async () => {
      const certificateUrl = `/certificates/${fileName}`;

      // Save certificate to DB
      const certificate = new Certificate({
        user: userId,
        event: eventId,
        certificateUrl,
        issuedAt: new Date(),
      });

      await certificate.save();

      res.status(201).json({
        message: 'Certificate generated successfully',
        certificateUrl,
      });
    });

  } catch (error) {
    console.error('Error generating certificate:', error);
    res.status(500).json({ message: 'Failed to generate certificate' });
  }
};

exports.getCertificatesByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const certificates = await Certificate.find({ user: userId }).populate('event');
    res.status(200).json(certificates);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch certificates' });
  }
};
