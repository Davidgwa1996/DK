const express = require('express');
const router = express.Router();
const {
  processPayment,
  getPaymentStatus,
  getMyPayments,
  initiateRefund,
  getPaymentMethods
} = require('../controllers/paymentController');
const { protect, admin } = require('../middleware/authMiddleware');

// Public routes
router.get('/methods', getPaymentMethods);

// User routes
router.post('/process', protect, processPayment);
router.get('/', protect, getMyPayments);
router.get('/:id/status', protect, getPaymentStatus);

// Admin routes
router.post('/:id/refund', protect, admin, initiateRefund);

module.exports = router;