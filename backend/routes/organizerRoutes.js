const express = require('express');
const router = express.Router();

const {
  getOrganizerProfile,
  getFeedbacksForOrganizer,
  assignBadgeToVolunteer,
  generateCertificateForVolunteer,
   getOrganizerById
} = require('../controllers/organizerController');

// Organizer profile route
router.get('/profile/:organizerId', getOrganizerProfile);

// Get feedbacks sent to organizer's events
router.get('/feedbacks/:organizerId', getFeedbacksForOrganizer);

// Assign badge or star
router.post('/badges/assign', assignBadgeToVolunteer);

// Generate certificate
router.post('/certificates/generate', generateCertificateForVolunteer);
router.get('/:id', getOrganizerById);

module.exports = router;
