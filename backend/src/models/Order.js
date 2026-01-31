const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  price: {
    type: Number,
    required: true
  },
  imageUrl: {
    type: String
  },
  sku: {
    type: String,
    required: true
  }
});

const shippingAddressSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  street: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  zipCode: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true,
    default: 'USA'
  },
  phone: {
    type: String,
    required: true
  }
});

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    required: true,
    unique: true,
    default: function() {
      return 'ORD-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
    }
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [orderItemSchema],
  shippingAddress: shippingAddressSchema,
  billingAddress: {
    type: shippingAddressSchema,
    required: true
  },
  subtotal: {
    type: Number,
    required: true
  },
  tax: {
    type: Number,
    required: true
  },
  shippingCost: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: 'USD',
    enum: ['USD', 'EUR', 'GBP', 'CAD', 'AUD']
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ['credit_card', 'paypal', 'bank_transfer', 'cash_on_delivery']
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  orderStatus: {
    type: String,
    enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  trackingNumber: {
    type: String
  },
  shippingCarrier: {
    type: String,
    enum: ['fedex', 'ups', 'usps', 'dhl', null],
    default: null
  },
  estimatedDelivery: {
    type: Date
  },
  notes: {
    type: String
  },
  isGift: {
    type: Boolean,
    default: false
  },
  giftMessage: {
    type: String
  }
}, {
  timestamps: true
});

// Virtual for formatted order date
orderSchema.virtual('formattedDate').get(function() {
  return this.createdAt.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
});

// Check if order is cancellable (only if not shipped or delivered)
orderSchema.methods.isCancellable = function() {
  return !['shipped', 'delivered', 'cancelled'].includes(this.orderStatus);
};

// Get order summary
orderSchema.methods.getSummary = function() {
  return {
    orderNumber: this.orderNumber,
    total: this.total,
    status: this.orderStatus,
    itemCount: this.items.reduce((sum, item) => sum + item.quantity, 0),
    createdAt: this.createdAt
  };
};

// Index for efficient queries
orderSchema.index({ user: 1, createdAt: -1 });
orderSchema.index({ orderNumber: 1 });
orderSchema.index({ orderStatus: 1 });

module.exports = mongoose.model('Order', orderSchema);