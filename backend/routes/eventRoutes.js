// const express = require('express');
// const {
//   createEvent,
//   getAllEvents,
//   getEventById,
//   getMyEvents,
//   registerVolunteer,
// } = require('../controllers/eventController');

// const authMiddleware = require('../middleware/authMiddleware');
// const router = express.Router();

// /**
//  * @swagger
//  * /api/events:
//  *   post:
//  *     summary: Create a new event (Admin only)
//  *     security:
//  *       - bearerAuth: []
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               title:
//  *                 type: string
//  *               description:
//  *                 type: string
//  *               date:
//  *                 type: string
//  *                 format: date
//  *               location:
//  *                 type: string
//  *     responses:
//  *       201:
//  *         description: Event created successfully
//  */
// router.post('/', authMiddleware, createEvent);

// /**
//  * @swagger
//  * /api/events:
//  *   get:
//  *     summary: Get all events
//  *     responses:
//  *       200:
//  *         description: A list of events
//  */
// router.get('/', getAllEvents);

// /**
//  * @swagger
//  * /api/events/{id}:
//  *   get:
//  *     summary: Get a single event by ID
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         description: Event ID
//  *         schema:
//  *           type: string
//  *     responses:
//  *       200:
//  *         description: Event details
//  *       404:
//  *         description: Event not found
//  */
// router.get('/:id', getEventById);

// // You can add this route later if needed
// // router.post('/:id/register', authMiddleware, registerVolunteer);

// module.exports = router;


const express = require('express');
const router = express.Router();

const {
  createEvent,
  getAllEvents,
  participateInEvent,
  markNotInterested,
  markEventCompleted,
  getParticipantsByOrganizer,
  getVolunteerActivities
} = require('../controllers/eventController');

// ✅ Routes
router.post('/', createEvent);
router.get('/', getAllEvents);
router.post('/:eventId/participate', participateInEvent);
router.post('/:eventId/not-interested', markNotInterested);
router.post('/:eventId/complete', markEventCompleted);

router.get('/organizer/:organizerId/participants', getParticipantsByOrganizer);
router.get('/activities/:organizerId', getVolunteerActivities);

module.exports = router;
