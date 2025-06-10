const express = require('express');
const { submitFeedback, getFeedbacksByEvent } = require('../controllers/feedbackController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, submitFeedback);
router.get('/:eventId', getFeedbacksByEvent);

module.exports = router;
