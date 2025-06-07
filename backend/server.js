const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const certificateRoutes = require('./routes/certificateRoutes');
const badgeRoutes = require('./routes/badgeRoutes');
const volunteerMatchRoutes = require('./routes/volunteerMatchRoutes');

const authMiddleware = require('./middleware/authMiddleware');
const errorHandler = require('./middleware/errorHandler');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express
const app = express();

// Serve certificates folder statically (for downloads)
app.use('/certificates', express.static(path.join(__dirname, 'certificates')));

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // your frontend origin
  credentials: true,
}));
app.use(express.json());

// Public routes
app.use('/api/auth', authRoutes);

// Protected routes (example: require authMiddleware)
app.use('/api/events', authMiddleware, eventRoutes);
app.use('/api/feedback', authMiddleware, feedbackRoutes);
app.use('/api/certificates', authMiddleware, certificateRoutes);
app.use('/api/badges', authMiddleware, badgeRoutes);
app.use('/api/match', authMiddleware, volunteerMatchRoutes);

// Error handling middleware (must be last)
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
