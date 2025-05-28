// Example badge awarding logic

/**
 * Determine which badges a user earns based on their stats.
 * @param {Object} userStats - e.g. { eventsParticipated: 5, hoursVolunteered: 20, feedbacksGiven: 3 }
 * @returns {Array} List of badge IDs or objects the user qualifies for.
 */
export function getEarnedBadges(userStats) {
  const badges = [];

  if (userStats.eventsParticipated >= 1) {
    badges.push({ id: 'first_event', name: 'First Event' });
  }
  if (userStats.eventsParticipated >= 5) {
    badges.push({ id: 'event_master', name: 'Event Master' });
  }
  if (userStats.hoursVolunteered >= 10) {
    badges.push({ id: 'hours_contributor', name: '10+ Hours Volunteered' });
  }
  if (userStats.feedbacksGiven >= 3) {
    badges.push({ id: 'feedback_hero', name: 'Feedback Hero' });
  }

  // Add more badge logic as needed

  return badges;
}
