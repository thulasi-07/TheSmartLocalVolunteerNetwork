// Sample logic to determine which badge to award based on number of events attended

function getBadgeForVolunteer(eventCount) {
  if (eventCount >= 10) return 'Gold Volunteer';
  if (eventCount >= 5) return 'Silver Volunteer';
  if (eventCount >= 1) return 'Bronze Volunteer';
  return null;
}

module.exports = { getBadgeForVolunteer };
