/**
 * Match volunteers to an event based on skills, interests, and availability.
 * @param {Object} event - Event object containing requiredSkills, date, category, etc.
 * @param {Array} volunteers - Array of volunteer objects with skills, interests, availability
 * @returns {Array} Matched volunteers sorted by match score (best match first)
 */
export function matchVolunteers(event, volunteers) {
  // Helper to calculate match score
  function calculateMatchScore(volunteer) {
    let score = 0;

    // Match skills
    if (event.requiredSkills && volunteer.skills) {
      const matchingSkills = volunteer.skills.filter(skill =>
        event.requiredSkills.includes(skill)
      );
      score += matchingSkills.length * 3; // weight skills higher
    }

    // Match interests/category
    if (event.category && volunteer.interests) {
      if (volunteer.interests.includes(event.category)) {
        score += 2;
      }
    }

    // Check availability on event date
    if (event.date && volunteer.availability) {
      const availableOnEventDate = volunteer.availability.some(date =>
        isSameDay(date, event.date)
      );
      if (availableOnEventDate) {
        score += 5;
      }
    }

    return score;
  }

  // Use the isSameDay from dateUtils, so import it
  // Assuming both utils are in the same folder
  // If in different folder, adjust import path accordingly
  // import { isSameDay } from './dateUtils';

  // For standalone snippet, we redefine isSameDay here:
  function isSameDay(date1, date2) {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  }

  // Calculate scores for each volunteer
  const scoredVolunteers = volunteers.map(volunteer => ({
    volunteer,
    score: calculateMatchScore(volunteer),
  }));

  // Filter only volunteers with score > 0 and sort descending
  const matched = scoredVolunteers
    .filter(v => v.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(v => v.volunteer);

  return matched;
}
