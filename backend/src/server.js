const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const Logger = require('./utils/logger');
-
// Load environment variables
dotenv.config();

// Import routes
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

// Import middleware
const { errorHandler, notFound } = require('./middleware/errorMiddleware');

// Initialize express
const app = express();

// Connect to database
connectDB();

// Middleware
app.use(helmet()); // Security headers
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(morgan('dev')); // HTTP request logger
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Custom request logging
app.use(Logger.request);

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    service: 'Unidigitalcom Backend API',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    environment: process.env.NODE_ENV,
    uptime: process.uptime()
  });
});

// Welcome endpoint
app.get('/api', (req, res) => {
  res.json({
    message: 'Welcome to Unidigitalcom API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      products: '/api/products',
      cart: '/api/cart',
      orders: '/api/orders',
      payments: '/api/payments',
      health: '/api/health'
    },
    documentation: 'Coming soon...'
  });
});
// === ADD THESE 3 ROUTES === //

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: '🚀 UniDigital Backend API Server',
    version: '1.0.0',
    status: 'operational',
    timestamp: new Date().toISOString(),
    documentation: 'https://unidigitalcom-backend1.onrender.com/api',
    health: 'https://unidigitalcom-backend1.onrender.com/health',
    endpoints: {
      root: '/',
      api: '/api',
      health: '/health',
      auth: '/api/auth',
      products: '/api/products',
      cart: '/api/cart',
      orders: '/api/orders',
      payments: '/api/payments'
    }
  });
});

// Health endpoint (simple, for load balancers)
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

// API welcome endpoint (already exists, but keep it)
app.get('/api', (req, res) => {
  res.json({
    message: 'Welcome to Unidigitalcom API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      products: '/api/products',
      cart: '/api/cart',
      orders: '/api/orders',
      payments: '/api/payments',
      health: '/api/health'
    },
    documentation: 'Coming soon...'
  });
});

// === END OF ADDED ROUTES === //

// 404 handler
app.use(notFound);

// Error handler (must be last middleware)
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  Logger.api(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  Logger.api(`Health check: http://localhost:${PORT}/api/health`);
  Logger.api(`API Base URL: http://localhost:${PORT}/api`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  Logger.error(`Unhandled Rejection: ${err.message}`);
  Logger.error(err.stack);
  // Close server & exit process
  server.close(() => process.exit(1));
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  Logger.error(`Uncaught Exception: ${err.message}`);
  Logger.error(err.stack);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  Logger.warn('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    Logger.info('Server closed. Process terminated.');
    process.exit(0);
  });
});

module.exports = app;