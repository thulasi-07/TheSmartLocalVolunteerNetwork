// routes/organizerRoutes.js
const express = require('express');
const router = express.Router();

const {
  getOrganizerProfile,
  getFeedbacksForOrganizer,
  assignBadgeToVolunteer,
  generateCertificateForVolunteer,
} = require('../controllers/organizerController');

// 1. Organizer Profile with created events
router.get('/profile/:organizerId', getOrganizerProfile);

// 2. View Feedbacks for organizer's events
router.get('/feedbacks/:organizerId', getFeedbacksForOrganizer);

// 3. Assign Badge or Star to a Volunteer
router.post('/badges/assign', assignBadgeToVolunteer);

// 4. Generate Certificate for a Volunteer
router.post('/certificates/generate', generateCertificateForVolunteer);

module.exports = router;
