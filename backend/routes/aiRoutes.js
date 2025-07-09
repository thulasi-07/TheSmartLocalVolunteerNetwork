// routes/aiRoutes.js
const express = require("express");
const router = express.Router();
const { getRecommendations } = require("../controllers/aiController");

router.get("/recommend/:id", getRecommendations);

module.exports = router;
