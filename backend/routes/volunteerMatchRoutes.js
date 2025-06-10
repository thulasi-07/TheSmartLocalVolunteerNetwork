const express = require('express');
const { matchVolunteersToEvents } = require('../controllers/volunteerMatchController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, matchVolunteersToEvents);

module.exports = router;
