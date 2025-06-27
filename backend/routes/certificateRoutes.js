const express = require('express');
const { generateCertificateForVolunteer, getCertificatesByVolunteer } = require('../controllers/certificateController');
const router = express.Router();

router.post('/generate', generateCertificateForVolunteer);
router.get('/volunteer/:volunteerId', getCertificatesByVolunteer);

module.exports = router;
