// controllers/aiController.js
const { exec } = require("child_process");
const path = require("path");

exports.getRecommendations = (req, res) => {
  const volunteerId = req.params.id;

  const scriptPath = path.join(__dirname, "..", "ai", "recommend.py");

  exec(`python ${scriptPath} ${volunteerId}`, (error, stdout, stderr) => {
    if (error) {
      console.error("Error:", error);
      return res.status(500).json({ error: "AI model execution failed" });
    }
    try {
      const data = JSON.parse(stdout);
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: "Failed to parse AI output" });
    }
  });
};
