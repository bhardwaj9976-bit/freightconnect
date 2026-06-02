const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const http = require('http');
const socketIo = require('socket.io');

// Load environment variables
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: { origin: '*', methods: ['GET', 'POST'] }
});

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Error:', err));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));
app.use('/api/trucks', require('./routes/truckRoutes'));
app.use('/api/payments', require('./routes/paymentRoutes'));
app.use('/api/tracking', require('./routes/trackingRoutes'));
app.use('/api/notifications', require('./routes/notificationRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/chat', require('./routes/chatRoutes'));
app.use('/api/analytics', require('./routes/analyticsRoutes'));

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'Server is running ✅', 
    timestamp: new Date(),
    uptime: process.uptime()
  });
});

// WebSocket for Real-time Tracking
io.on('connection', (socket) => {
  console.log('✅ User connected:', socket.id);

  socket.on('start_tracking', (data) => {
    console.log('📍 Tracking started for trip:', data.tripId);
    socket.join(`trip_${data.tripId}`);
  });

  socket.on('update_location', (data) => {
    io.to(`trip_${data.tripId}`).emit('location_update', {
      lat: data.lat,
      lng: data.lng,
      timestamp: new Date()
    });
  });

  socket.on('disconnect', () => {
    console.log('❌ User disconnected:', socket.id);
  });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Internal Server Error', 
    message: err.message 
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 API URL: ${process.env.API_URL}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV}`);
});

module.exports = app;
