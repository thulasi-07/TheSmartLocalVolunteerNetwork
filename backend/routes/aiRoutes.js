// backend/routes/aiRoutes.js

const express = require("express");
const router = express.Router();
const predictWithPython = require("../ai/invokeModel");

router.post("/recommend", (req, res) => {
  const inputData = req.body;

  predictWithPython(inputData, (err, prediction) => {
    if (err) {
      return res.status(500).json({ error: "Prediction failed" });
    }

    const isMatch = prediction.match === 1;

    res.json({
      match: isMatch,
      recommendedEvents: isMatch ? ["EV101", "EV105", "EV204"] : [],
    });
  });
});

module.exports = router;
