const express = require('express');
const { createEvent, getAllEvents, getEventById, registerForEvent } = require('../controllers/eventController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, createEvent);
router.get('/', getAllEvents);
router.get('/:id', getEventById);
router.post('/:id/register', authMiddleware, registerForEvent);

module.exports = router;
