// // backend/routes/aiRoutes.js

// const express = require("express");
// const router = express.Router();
// const predictWithPython = require("../ai/invokeModel");

// router.post("/recommend", (req, res) => {
//   const inputData = req.body;

//   predictWithPython(inputData, (err, prediction) => {
//     if (err) {
//       return res.status(500).json({ error: "Prediction failed" });
//     }

//     const isMatch = prediction.match === 1;

//     res.json({
//       match: isMatch,
//       recommendedEvents: isMatch ? ["EV101", "EV105", "EV204"] : [],
//     });
//   });
// });

// module.exports = router;





// backend/routes/aiRoutes.js

const express = require("express");
const router = express.Router();

// Dummy dataset: You can replace this with real logic or database
const matchedEvents = [
  {
    event_code: "EV101",
    volunteer_skill_score: 8,
    event_difficulty_level: 7,
    volunteer_experience_years: 2,
    distance_km: 18,
    availability_hours: 9
  },
  {
    event_code: "EV105",
    volunteer_skill_score: 2,
    event_difficulty_level: 1,
    volunteer_experience_years: 5,
    distance_km: 34,
    availability_hours: 9
  },
  {
    event_code: "EV204",
    volunteer_skill_score: 7,
    event_difficulty_level: 6,
    volunteer_experience_years: 3,
    distance_km: 25,
    availability_hours: 5
  }
];

// POST /api/ai/recommend
router.post("/recommend", (req, res) => {
  const input = req.body;

  // You can apply actual AI matching logic here
  const recommendedEvents = matchedEvents;

  res.json({
    match: recommendedEvents.length > 0,
    input: input,
    recommendedEvents: recommendedEvents
  });
});

module.exports = router;
