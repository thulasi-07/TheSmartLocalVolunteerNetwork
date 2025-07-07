// // utils/recommenderModel.js
// const similarity = require('compute-cosine-similarity');

// function vectorize(user, event) {
//   // Sample: [skillMatch, interestMatch, distanceMatch]
//   return [
//     user.skills.includes(event.skillRequired) ? 1 : 0,
//     user.interests.includes(event.category) ? 1 : 0,
//     user.location === event.location ? 1 : 0,
//   ];
// }

// function getRecommendedEvents(user, allEvents) {
//   const scoredEvents = allEvents.map(event => {
//     const userVec = [1, 1, 1]; // Ideal vector
//     const eventVec = vectorize(user, event);
//     const score = similarity(userVec, eventVec);
//     return { ...event, score };
//   });

//   return scoredEvents
//     .sort((a, b) => b.score - a.score)
//     .slice(0, 5); // Top 5 events
// }

// module.exports = { getRecommendedEvents };
