// const express = require('express');
// const { generateCertificate, getCertificatesByUser } = require('../controllers/certificateController');
// const authMiddleware = require('../middleware/authMiddleware');

// const router = express.Router();

// /**
//  * @swagger
//  * /api/certificates:
//  *   post:
//  *     summary: Generate a certificate for a user
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
//  *               userId:
//  *                 type: string
//  *     responses:
//  *       201:
//  *         description: Certificate generated successfully
//  */
// router.post('/', authMiddleware, generateCertificate);

// // You can uncomment and document this route later when implemented
// // /**
// //  * @swagger
// //  * /api/certificates/{certificateId}/download:
// //  *   get:
// //  *     summary: Download a certificate PDF by ID
// //  *     parameters:
// //  *       - in: path
// //  *         name: certificateId
// //  *         required: true
// //  *         schema:
// //  *           type: string
// //  *         description: The ID of the certificate to download
// //  *     responses:
// //  *       200:
// //  *         description: Certificate downloaded successfully
// //  *       404:
// //  *         description: Certificate not found
// //  */
// // router.get('/:certificateId/download', downloadCertificate);

// module.exports = router;

