const express = require('express');
const { getBadges, awardBadge } = require('../controllers/badgeController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, getBadges);
router.post('/award', authMiddleware, awardBadge);

module.exports = router;
