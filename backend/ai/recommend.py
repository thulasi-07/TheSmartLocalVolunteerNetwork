import sys
import json
import joblib

# ✅ Load the trained model
model = joblib.load('model/skill_match_model.pkl')

# ✅ Dummy data: simulate skill input based on volunteer ID
def get_volunteer_skills(user_id):
    # In real scenario, fetch from DB
    dummy_skills = {
        "1": [1, 0, 1],
        "2": [0, 1, 1],
        "3": [1, 1, 0],
        "4": [0, 0, 0],
    }
    return dummy_skills.get(user_id, [0, 0, 0])

# ✅ Get volunteer ID from command-line argument
if len(sys.argv) < 2:
    print(json.dumps({"error": "No user ID provided"}))
    sys.exit()

user_id = sys.argv[1]
skills = get_volunteer_skills(user_id)

# ✅ Make prediction
prediction = model.predict([skills])[0]

# ✅ Simulate recommended event IDs
recommended_events = {
    1: ["EV101", "EV103", "EV106"],  # suitable
    0: []  # not suitable
}

# ✅ Return result as JSON
result = {
    "volunteer_id": user_id,
    "skills": skills,
    "match": int(prediction),
    "recommended_events": recommended_events[int(prediction)]
}

print(json.dumps(result))
