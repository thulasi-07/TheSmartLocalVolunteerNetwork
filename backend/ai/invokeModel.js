// backend/ai/invokeModel.js

const { spawn } = require("child_process");
const path = require("path");

function predictWithPython(inputData, callback) {
  const pythonScriptPath = path.join(__dirname, "predict.py");

  const process = spawn("python", [
    pythonScriptPath,
    JSON.stringify(inputData),
  ]);

  let result = "";

  process.stdout.on("data", (data) => {
    result += data.toString();
  });

  process.stderr.on("data", (data) => {
    console.error("Python Error:", data.toString());
  });

  process.on("close", (code) => {
    try {
      const prediction = JSON.parse(result);
      callback(null, prediction);
    } catch (err) {
      callback(err, null);
    }
  });
}

module.exports = predictWithPython;
