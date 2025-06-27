const express = require('express');
const router = express.Router();
const { getVolunteersByOrganizer } = require('../controllers/userController');

// ✅ Route to get volunteers who completed the organizer's events
router.get('/volunteers/by-organizer/:organizerId', getVolunteersByOrganizer);

module.exports = router;
