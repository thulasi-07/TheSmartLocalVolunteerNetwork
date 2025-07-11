// backend/controllers/authController.js

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');

exports.registerOrganizer = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already in use' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: 'organizer'
    });

    await newUser.save();

    res.status(201).json({ message: 'Organizer registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.registerVolunteer = async (req, res) => {
  try {
    const { name, email, password, skills, location, availability } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already in use' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: 'volunteer',
      skills,
      location,
      availability
    });

    await newUser.save();

    res.status(201).json({ message: 'Volunteer registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = generateToken(user._id);

   res.status(200).json({
  token,
  role: user.role,      // "organizer" or "volunteer"
  user: {
    _id: user._id,
    name: user.name,
    email: user.email
    // any other info you want to send
  }
});

  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};






// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');
// const generateToken = require('../utils/generateToken');

// exports.registerOrganizer = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     if (password.length > 10) {
//       return res.status(400).json({ message: 'Password must be 10 characters or less' });
//     }

//     const existing = await User.findOne({ email });
//     if (existing) return res.status(400).json({ message: 'Email already in use' });

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = new User({
//       name,
//       email,
//       password: hashedPassword,
//       role: 'organizer'
//     });

//     await newUser.save();

//     res.status(201).json({ message: 'Organizer registered successfully' });
//   } catch (err) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// exports.registerVolunteer = async (req, res) => {
//   try {
//     const { name, email, password, skills, location, availability } = req.body;

//     if (password.length > 10) {
//       return res.status(400).json({ message: 'Password must be 10 characters or less' });
//     }

//     const existing = await User.findOne({ email });
//     if (existing) return res.status(400).json({ message: 'Email already in use' });

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = new User({
//       name,
//       email,
//       password: hashedPassword,
//       role: 'volunteer',
//       skills,
//       location,
//       availability
//     });

//     await newUser.save();

//     res.status(201).json({ message: 'Volunteer registered successfully' });
//   } catch (err) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// exports.loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) return res.status(401).json({ message: 'Invalid credentials' });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

//     const token = generateToken(user._id);

//     res.status(200).json({
//       token,
//       role: user.role,
//       user: {
//         _id: user._id,
//         name: user.name,
//         email: user.email
//       }
//     });
//   } catch (err) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };
