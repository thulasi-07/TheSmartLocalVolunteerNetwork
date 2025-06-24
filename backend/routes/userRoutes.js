const express = require('express');
const router = express.Router();
const { getAllVolunteers } = require('../controllers/userController');

router.get('/volunteers', getAllVolunteers);

module.exports = router;
