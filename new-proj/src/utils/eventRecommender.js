/**
 * Recommend events to a user based on their interests and past events.
 * @param {Array} allEvents - List of all events [{ id, category, date, ... }]
 * @param {Object} userProfile - User data including interests and past events
 * @returns {Array} Filtered and sorted list of recommended events
 */
export function recommendEvents(allEvents, userProfile) {
  // Simple rule-based filtering example:

  // Filter events by categories matching user interests
  const filtered = allEvents.filter(event =>
    userProfile.interests.includes(event.category)
  );

  // Sort by date ascending (upcoming first)
  filtered.sort((a, b) => new Date(a.date) - new Date(b.date));

  // Optionally add other ranking or scoring logic here

  return filtered;
}
