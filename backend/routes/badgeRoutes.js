const express = require('express');
const { createBadge, getAllBadges } = require('../controllers/badgeController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * /api/badges:
 *   get:
 *     summary: Get all badges (Authenticated)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of all badges
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 *                   icon:
 *                     type: string
 */
router.get('/', authMiddleware, getAllBadges);

// You can uncomment and document this route when it's implemented
// /**
//  * @swagger
//  * /api/badges/award:
//  *   post:
//  *     summary: Award a badge to a user
//  *     security:
//  *       - bearerAuth: []
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               userId:
//  *                 type: string
//  *               badgeId:
//  *                 type: string
//  *     responses:
//  *       200:
//  *         description: Badge awarded successfully
//  */
// router.post('/award', authMiddleware, awardBadge);

module.exports = router;
