const Payment = require('../models/Payment');
const Order = require('../models/Order');

// @desc    Process payment
// @route   POST /api/payments/process
// @access  Private
const processPayment = async (req, res) => {
  try {
    const { orderId, paymentDetails } = req.body;

    // Get order
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Check if user owns the order
    if (order.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized'
      });
    }

    // Check if payment already exists
    let payment = await Payment.findOne({ order: orderId });

    if (!payment) {
      // Create new payment
      payment = await Payment.create({
        order: orderId,
        user: req.user.id,
        paymentMethod: order.paymentMethod,
        amount: order.total,
        status: 'processing',
        paymentDetails
      });
    } else {
      // Update existing payment
      payment.status = 'processing';
      payment.paymentDetails = paymentDetails;
      await payment.save();
    }

    // Simulate payment processing delay
    setTimeout(async () => {
      try {
        // Simulate successful payment 90% of the time
        const isSuccessful = Math.random() < 0.9;
        
        if (isSuccessful) {
          payment.status = 'completed';
          order.paymentStatus = 'completed';
          order.orderStatus = 'confirmed';
        } else {
          payment.status = 'failed';
          payment.failureReason = 'Simulated payment failure';
          order.paymentStatus = 'failed';
        }

        await payment.save();
        await order.save();
        
        console.log(`Payment ${isSuccessful ? 'completed' : 'failed'} for order ${orderId}`);
      } catch (error) {
        console.error('Payment simulation error:', error);
      }
    }, 2000);

    res.json({
      success: true,
      message: 'Payment processing started',
      paymentId: payment._id,
      status: 'processing'
    });
  } catch (error) {
    console.error('Process payment error:', error);
    res.status(500).json({
      success: false,
      message: 'Error processing payment',
      error: error.message
    });
  }
};

// @desc    Get payment status
// @route   GET /api/payments/:id/status
// @access  Private
const getPaymentStatus = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id)
      .populate('order')
      .populate('user', 'firstName lastName email');

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: 'Payment not found'
      });
    }

    // Check if user owns the payment
    if (payment.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        message: 'Not authorized'
      });
    }

    res.json({
      success: true,
      payment
    });
  } catch (error) {
    console.error('Get payment status error:', error);
    if (error.name === 'CastError') {
      return res.status(404).json({
        success: false,
        message: 'Payment not found'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get user payments
// @route   GET /api/payments
// @access  Private
const getMyPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .populate('order');

    res.json({
      success: true,
      count: payments.length,
      payments
    });
  } catch (error) {
    console.error('Get my payments error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching payments',
      error: error.message
    });
  }
};

// @desc    Initiate refund (Admin only)
// @route   POST /api/payments/:id/refund
// @access  Private/Admin
const initiateRefund = async (req, res) => {
  try {
    const { refundAmount, reason } = req.body;
    const payment = await Payment.findById(req.params.id).populate('order');

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: 'Payment not found'
      });
    }

    // Check if payment is refundable
    if (!payment.isRefundable()) {
      return res.status(400).json({
        success: false,
        message: 'Payment is not refundable'
      });
    }

    // Check refund amount
    const maxRefundable = payment.amount - payment.refundedAmount;
    const actualRefundAmount = Math.min(refundAmount || maxRefundable, maxRefundable);

    // Simulate refund processing
    payment.refundedAmount += actualRefundAmount;
    
    if (payment.refundedAmount >= payment.amount) {
      payment.status = 'refunded';
    }
    
    payment.refundedAt = new Date();
    await payment.save();

    // Update order status if fully refunded
    if (payment.status === 'refunded') {
      await Order.findByIdAndUpdate(payment.order._id, {
        orderStatus: 'cancelled',
        paymentStatus: 'refunded'
      });
    }

    res.json({
      success: true,
      message: `Refund of $${actualRefundAmount} initiated successfully`,
      payment
    });
  } catch (error) {
    console.error('Initiate refund error:', error);
    res.status(500).json({
      success: false,
      message: 'Error processing refund',
      error: error.message
    });
  }
};

// @desc    Get payment methods
// @route   GET /api/payments/methods
// @access  Public
const getPaymentMethods = async (req, res) => {
  try {
    const methods = [
      {
        id: 'credit_card',
        name: 'Credit Card',
        description: 'Pay with Visa, MasterCard, or American Express',
        icon: '💳',
        enabled: true
      },
      {
        id: 'debit_card',
        name: 'Debit Card',
        description: 'Pay with your debit card',
        icon: '🏦',
        enabled: true
      },
      {
        id: 'paypal',
        name: 'PayPal',
        description: 'Pay with your PayPal account',
        icon: '🔵',
        enabled: true
      },
      {
        id: 'bank_transfer',
        name: 'Bank Transfer',
        description: 'Direct bank transfer',
        icon: '💰',
        enabled: true
      },
      {
        id: 'cash_on_delivery',
        name: 'Cash on Delivery',
        description: 'Pay when you receive your order',
        icon: '💵',
        enabled: true
      }
    ];

    res.json({
      success: true,
      methods
    });
  } catch (error) {
    console.error('Get payment methods error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

module.exports = {
  processPayment,
  getPaymentStatus,
  getMyPayments,
  initiateRefund,
  getPaymentMethods
};