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
const eventController = require('../controllers/eventController');

// Event routes
router.post('/', eventController.createEvent);
router.get('/', eventController.getAllEvents);
router.get('/by-organizer/:organizerId', eventController.getEventsByOrganizer);
router.get('/:id', eventController.getEventById);
router.post('/:eventId/participate', eventController.participateInEvent);
router.post('/:eventId/not-interested', eventController.markNotInterested);
router.post('/:eventId/complete', eventController.markEventCompleted);
router.get('/:eventId/participants', eventController.getParticipantsForEvent);
router.get('/:eventId/completed-volunteers', eventController.getCompletedVolunteersForEvent);

// Organizer-related
router.get('/organizer/:organizerId', eventController.getEventsByOrganizerStats);
router.get('/activities/:organizerId', eventController.getVolunteerActivityByOrganizer);

// Volunteer stats
router.get('/stats/:volunteerId', eventController.getVolunteerStats);

module.exports = router;


