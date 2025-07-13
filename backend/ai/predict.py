# predict.py

import sys
import json
import joblib
import os
import numpy as np

# Load model
MODEL_PATH = os.path.join(os.path.dirname(__file__), "model", "skill_match_model.pkl")
model = joblib.load(MODEL_PATH)

# Read JSON input from Node.js
input_json = sys.argv[1]
input_data = json.loads(input_json)

# Prepare features
features = [
    input_data["volunteer_skill_score"],
    input_data["event_difficulty_level"],
    input_data["volunteer_experience_years"],
    input_data["distance_km"],
    input_data["availability_hours"]
]
features = np.array([features])

# Predict
prediction = int(model.predict(features)[0])

# Return as JSON
print(json.dumps({"match": prediction}))
