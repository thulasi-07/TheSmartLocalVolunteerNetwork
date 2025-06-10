// Dummy AI-matching logic to recommend events to a volunteer

function matchEventsToVolunteer(volunteer, events) {
  const interests = volunteer.interests || [];

  // Prioritize events matching the user's interests
  const matched = events
    .filter(event =>
      interests.some(interest => event.tags?.includes(interest))
    )
    .sort((a, b) => new Date(a.date) - new Date(b.date)); // sort by nearest date

  return matched;
}

module.exports = { matchEventsToVolunteer };
