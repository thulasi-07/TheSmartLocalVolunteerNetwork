import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
import joblib

# ✅ Load your new CSV file
df = pd.read_csv("high_accuracy_volunteer_matching_dataset.csv")

# ✅ Select the feature columns and target
X = df[[
    'volunteer_skill_score',
    'event_difficulty_level',
    'volunteer_experience_years',
    'distance_km',
    'availability_hours'
]]
y = df['match']

# ✅ Split into train and test
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# ✅ Train the model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# ✅ Save the trained model
joblib.dump(model, 'skill_match_model.pkl')

print("✅ Updated model trained and saved as skill_match_model.pkl")
