// const express = require('express');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const path = require('path');

// // ✅ Swagger setup
// const swaggerUi = require('swagger-ui-express');
// const swaggerJsdoc = require('swagger-jsdoc');

// const connectDB = require('./config/db');
// const authRoutes = require('./routes/authRoutes');
// const eventRoutes = require('./routes/eventRoutes');
// const feedbackRoutes = require('./routes/feedbackRoutes');
// const certificateRoutes = require('./routes/certificateRoutes');
// const badgeRoutes = require('./routes/badgeRoutes');
// const volunteerMatchRoutes = require('./routes/volunteerMatchRoutes');

// const authMiddleware = require('./middleware/authMiddleware');
// const errorHandler = require('./middleware/errorHandler');

// // Load environment variables
// dotenv.config();

// // Connect to MongoDB
// connectDB();

// // Initialize Express
// const app = express();

// // Serve certificates folder statically (for downloads)
// app.use('/certificates', express.static(path.join(__dirname, 'certificates')));

// // Middleware
// app.use(cors({
//   origin: 'http://localhost:3000', // your frontend origin
//   credentials: true,
// }));
// app.use(express.json());

// // ✅ Swagger definition and setup
// const swaggerDefinition = {
//   openapi: '3.0.0',
//   info: {
//     title: 'Smart Local Volunteer Network API',
//     version: '1.0.0',
//     description: 'API documentation for the Smart Local Volunteer Network',
//   },
//   servers: [
//     {
//       url: 'http://localhost:5000',
//     },
//   ],
// };

// const options = {
//   swaggerDefinition,
//   apis: ['./routes/*.js'], // auto-load from route files
// };

// const swaggerSpec = swaggerJsdoc(options);
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// // Public routes
// app.use('/api/auth', authRoutes);

// // Protected routes (require authMiddleware)
// app.use('/api/events', authMiddleware, eventRoutes);
// app.use('/api/feedback', authMiddleware, feedbackRoutes);
// app.use('/api/certificates', authMiddleware, certificateRoutes);
// app.use('/api/badges', authMiddleware, badgeRoutes);
// app.use('/api/match', authMiddleware, volunteerMatchRoutes);

// // Error handling middleware (must be last)
// app.use(errorHandler);

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
//   console.log(`API Docs available at http://localhost:${PORT}/api-docs`);
// });


// backend/server.js
// backend/server.js

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const organizerRoutes = require('./routes/organizerRoutes');
const volunteerRoutes = require('./routes/volunteerRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const badgeRoutes = require('./routes/badgeRoutes');
const userRoutes = require('./routes/userRoutes');
const certificateRoutes = require('./routes/certificateRoutes');
const aiRoutes = require("./routes/aiRoutes");

// const badgeRoutes = require('./routes/badgeRoutes');
// const certificateRoutes = require('./routes/certificateRoutes');
// const feedbackRoutes = require('./routes/feedbackRoutes');



const errorHandler = require('./middleware/errorMiddleware');


dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/organizers', organizerRoutes);
app.use('/api/volunteers', volunteerRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/badges', badgeRoutes);
app.use('/api/users', userRoutes);
app.use('/api/certificates', certificateRoutes);
app.use("/api/ai", aiRoutes);
// app.use('/api/badges', badgeRoutes);           
// app.use('/api/certificates', certificateRoutes); 
// app.use('/api/feedbacks', feedbackRoutes);


 // Make sure frontend baseURL matches

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
