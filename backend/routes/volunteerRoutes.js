// const express = require('express');
// const { getMatchesForVolunteer, getMatchesForEvent } = require('../controllers/volunteerMatchController');
// const authMiddleware = require('../middleware/authMiddleware');

// const router = express.Router();

// /**
//  * @swagger
//  * /api/match:
//  *   get:
//  *     summary: Get recommended matches for the logged-in volunteer
//  *     security:
//  *       - bearerAuth: []
//  *     responses:
//  *       200:
//  *         description: List of matched events or opportunities
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: array
//  *               items:
//  *                 type: object
//  *                 properties:
//  *                   eventId:
//  *                     type: string
//  *                   eventName:
//  *                     type: string
//  *                   matchScore:
//  *                     type: number
//  *       401:
//  *         description: Unauthorized (no token or invalid token)
//  */
// router.get('/', authMiddleware, getMatchesForVolunteer);

// module.exports = router;


const express = require('express');
const router = express.Router();
const {
  submitFeedback,
  getBadgesByVolunteer,
  getCertificatesByVolunteer
} = require('../controllers/volunteerController');

// Submit feedback
router.post('/feedback/:eventId', submitFeedback);

// Get assigned badges
router.get('/badges/:volunteerId', getBadgesByVolunteer);

// Get issued certificates
router.get('/certificates/:volunteerId', getCertificatesByVolunteer);

module.exports = router;
