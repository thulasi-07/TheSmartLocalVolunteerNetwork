const express = require('express');
const { generateCertificate, downloadCertificate } = require('../controllers/certificateController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, generateCertificate);
router.get('/:certificateId/download', downloadCertificate);

module.exports = router;
