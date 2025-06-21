// const express = require('express');
// const { getAllFeedbacks, submitFeedback } = require('../controllers/feedbackController');
// const authMiddleware = require('../middleware/authMiddleware');

// const router = express.Router();

// /**
//  * @swagger
//  * /api/feedback:
//  *   post:
//  *     summary: Submit feedback for an event
//  *     security:
//  *       - bearerAuth: []
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               eventId:
//  *                 type: string
//  *               rating:
//  *                 type: number
//  *                 minimum: 1
//  *                 maximum: 5
//  *               comment:
//  *                 type: string
//  *     responses:
//  *       201:
//  *         description: Feedback submitted successfully
//  *       400:
//  *         description: Invalid input
//  */
// router.post('/', authMiddleware, submitFeedback);

// /**
//  * @swagger
//  * /api/feedback/{eventId}:
//  *   get:
//  *     summary: Get all feedback for a specific event
//  *     parameters:
//  *       - in: path
//  *         name: eventId
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: ID of the event
//  *     responses:
//  *       200:
//  *         description: List of feedbacks for the event
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: array
//  *               items:
//  *                 type: object
//  *                 properties:
//  *                   rating:
//  *                     type: number
//  *                   comment:
//  *                     type: string
//  *                   user:
//  *                     type: string
//  */
// router.get('/:eventId', getAllFeedbacks);

// module.exports = router;


