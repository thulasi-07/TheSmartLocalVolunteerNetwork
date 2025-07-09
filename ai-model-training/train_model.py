# train_model.py

import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
import joblib

# Load the CSV dataset
df = pd.read_csv("volunteer_event_data.csv")

# Features and target
X = df[['skill_communication', 'skill_leadership', 'skill_design']]
y = df['match']

# Split the data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# Train the model
model = RandomForestClassifier()
model.fit(X_train, y_train)

# Save the trained model
joblib.dump(model, 'skill_match_model.pkl')

print("✅ Model trained and saved as skill_match_model.pkl")
