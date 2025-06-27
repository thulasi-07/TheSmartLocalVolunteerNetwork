// // models/Event.js
// models/Event.js
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },

  date: { type: String, required: true },
  time: { type: String, required: true },
  location: { type: String, required: true },
  volunteersNeeded: { type: Number, required: true },

  // ✅ Organizer who created the event
  organizerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  // ✅ All registered volunteers
  volunteers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: []
  }],

  // ✅ Volunteers who agreed to participate
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: []
  }],

  // ✅ Users who opted out or marked not interested
  notInterested: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: []
  }],

  // ✅ Only these volunteers are eligible for badges and certificates
  completedVolunteers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: []
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Event', eventSchema);




// models/Event.js
// const mongoose = require('mongoose');

// const eventSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: true,
//       trim: true
//     },
//     description: {
//       type: String,
//       required: true,
//     },
//     date: {
//       type: String,
//       required: true,
//     },
//     time: {
//       type: String,
//       required: true,
//     },
//     location: {
//       type: String,
//       required: true,
//     },
//     volunteersNeeded: {
//       type: Number,
//       default: 0,
//     },

//     // Organizer who created the event
//     organizerId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Organizer',
//       required: true,
//     },

//     // Volunteers who showed interest or signed up
//     volunteers: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Volunteer',
//       },
//     ],

//     // Volunteers who actually participated
//     participants: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Volunteer',
//       },
//     ],

//     // Volunteers who marked "Not Interested"
//     notInterested: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Volunteer',
//       },
//     ],

//     // Volunteers who completed the task (used in profile stats)
//     completedVolunteers: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Volunteer',
//       },
//     ],
//   },
//   {
//     timestamps: true, // adds createdAt and updatedAt automatically
//   }
// );

// module.exports = mongoose.model('Event', eventSchema);
