const express = require('express');
const router = express.Router();
const { getVolunteersByOrganizer } = require('../controllers/userController');

router.get('/volunteers/by-organizer/:organizerId', getVolunteersByOrganizer);

module.exports = router;