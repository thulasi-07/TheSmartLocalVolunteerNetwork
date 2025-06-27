const express = require('express');
const router = express.Router();
const certCtrl = require('../controllers/certificateController');

router.post('/generate', certCtrl.generateCertificateForVolunteer);
router.get('/volunteer/:volunteerId', certCtrl.getCertificatesByVolunteer);
router.get('/pdf/:certificateId', certCtrl.generateCertificatePDF); // 👈 PDF route

module.exports = router;
