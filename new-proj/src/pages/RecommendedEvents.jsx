// src/pages/RecommendedEvents.jsx

import React, { useEffect, useState } from "react";
import { getRecommendedEvents } from "../services/aiApi";

const RecommendedEvents = () => {
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendation = async () => {
      const input = {
        volunteer_skill_score: 8.0,
        volunteer_experience_years: 2,
        event_difficulty_level: 5,
        distance_km: 3,
        availability_hours: 4
      };

      try {
        const result = await getRecommendedEvents(input);
        setRecommendation(result);
      } catch (error) {
        console.error("Failed to fetch AI recommendation:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendation();
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-600">Loading recommendations...</div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-xl shadow-lg space-y-6">
      <h2 className="text-3xl font-bold text-indigo-700 text-center">
        🎯 Personalized Event Recommendations
      </h2>

      {recommendation?.match ? (
        <div className="space-y-4">
          <p className="text-green-700 font-medium text-center">
            ✅ AI matched events based on your profile
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {recommendation.recommendedEvents.map((eventId, idx) => (
              <div
                key={idx}
                className="p-4 bg-green-100 border border-green-300 rounded-lg shadow-sm"
              >
                <h3 className="text-lg font-semibold text-green-800">
                  📌 Event Code: {eventId}
                </h3>
                <p className="text-sm text-green-700">
                  This event matches your skill level, experience, and availability.
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center text-red-500 font-semibold">
          ❌ No suitable events found for your current profile.
        </div>
      )}

      <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600 border border-gray-200">
        <p className="font-semibold text-gray-700 mb-2">📥 Model Input:</p>
        <pre className="bg-white p-3 rounded text-gray-800 overflow-x-auto">
          {JSON.stringify(recommendation.input || {}, null, 2)}
        </pre>

        <p className="font-semibold text-gray-700 mt-4 mb-2">📤 Model Output:</p>
        <pre className="bg-white p-3 rounded text-gray-800 overflow-x-auto">
          {JSON.stringify(recommendation, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default RecommendedEvents;
