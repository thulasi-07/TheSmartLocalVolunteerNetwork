const express = require('express');
const { registerUser, loginUser, logoutUser, getCurrentUser } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/current', authMiddleware, getCurrentUser);

module.exports = router;
