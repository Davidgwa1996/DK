const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ['credit_card', 'debit_card', 'paypal', 'bank_transfer', 'cash_on_delivery']
  },
  amount: {
    type: Number,
    required: true,
    min: [0, 'Amount cannot be negative']
  },
  currency: {
    type: String,
    default: 'USD',
    enum: ['USD', 'EUR', 'GBP', 'CAD', 'AUD']
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'failed', 'refunded', 'cancelled'],
    default: 'pending'
  },
  transactionId: {
    type: String,
    unique: true,
    sparse: true
  },
  paymentDetails: {
    // For credit/debit card (masked)
    lastFourDigits: String,
    cardType: String,
    expiryMonth: Number,
    expiryYear: Number,
    
    // For PayPal
    paypalEmail: String,
    paypalTransactionId: String,
    
    // For bank transfer
    bankName: String,
    accountLastFour: String,
    referenceNumber: String
  },
  billingAddress: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  notes: {
    type: String
  },
  failureReason: {
    type: String
  },
  refundedAmount: {
    type: Number,
    default: 0
  },
  refundedAt: {
    type: Date
  }
}, {
  timestamps: true
});

// Generate transaction ID
paymentSchema.pre('save', function(next) {
  if (!this.transactionId && this.status === 'completed') {
    this.transactionId = 'TXN-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9).toUpperCase();
  }
  next();
});

// Check if payment is refundable
paymentSchema.methods.isRefundable = function() {
  return this.status === 'completed' && this.refundedAmount < this.amount;
};

// Get payment summary
paymentSchema.methods.getSummary = function() {
  return {
    paymentId: this._id,
    transactionId: this.transactionId,
    amount: this.amount,
    status: this.status,
    paymentMethod: this.paymentMethod,
    createdAt: this.createdAt
  };
};

// Index for efficient queries
paymentSchema.index({ user: 1, createdAt: -1 });
paymentSchema.index({ order: 1 });
paymentSchema.index({ transactionId: 1 }, { unique: true, sparse: true });
paymentSchema.index({ status: 1 });

module.exports = mongoose.model('Payment', paymentSchema);