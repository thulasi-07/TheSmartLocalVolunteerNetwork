// backend/controllers/aiController.js

const { recommend_events } = require("../ai/recommender");

exports.getAIRecommendation = async (req, res) => {
  try {
    const input = req.body; // Get input from frontend
    const result = recommend_events(input); // Call your Python-trained model

    // Add input to the result so it can be shown in the UI
    res.json({
      input: input,               // 👈 Include input in the response
      ...result                   // 👈 Spread the model result (match, recommendedEvents)
    });

  } catch (error) {
    res.status(500).json({
      message: "AI Recommendation failed",
      error: error.message
    });
  }
};
