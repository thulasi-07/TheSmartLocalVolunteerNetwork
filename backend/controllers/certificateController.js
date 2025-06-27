const Certificate = require('../models/Certificate');
const Event = require('../models/Event');
const User = require('../models/User');

exports.generateCertificateForVolunteer = async (req, res) => {
  const { volunteerId, eventId, organizerId, description } = req.body;
  const event = await Event.findById(eventId);
  const volunteer = await User.findById(volunteerId);
  if (!event || !volunteer) return res.status(404).json({ error: 'Not found' });

  const cert = new Certificate({
    volunteerId,
    organizerId,
    eventId,
    eventTitle: event.title,
    volunteerName: volunteer.name,
    organizerName: (await User.findById(organizerId)).name,
    description
  });
  await cert.save();
  res.status(201).json({ message: 'Certificate generated', cert });
};

exports.getCertificatesByVolunteer = async (req, res) => {
  const certs = await Certificate.find({ volunteerId: req.params.volunteerId });
  res.json(certs);
};
