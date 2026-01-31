const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, 'Quantity must be at least 1'],
    default: 1
  },
  price: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String
  },
  selected: {
    type: Boolean,
    default: true
  }
});

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  items: [cartItemSchema],
  totalItems: {
    type: Number,
    default: 0
  },
  subtotal: {
    type: Number,
    default: 0
  },
  tax: {
    type: Number,
    default: 0
  },
  shipping: {
    type: Number,
    default: 0
  },
  total: {
    type: Number,
    default: 0
  },
  currency: {
    type: String,
    default: 'USD',
    enum: ['USD', 'EUR', 'GBP', 'CAD', 'AUD']
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Calculate totals before saving
cartSchema.pre('save', function(next) {
  this.totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
  this.subtotal = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // Calculate tax (example: 8.5% tax rate)
  this.tax = parseFloat((this.subtotal * 0.085).toFixed(2));
  
  // Calculate shipping (example: free over $50, else $5.99)
  this.shipping = this.subtotal >= 50 ? 0 : 5.99;
  
  this.total = parseFloat((this.subtotal + this.tax + this.shipping).toFixed(2));
  this.lastUpdated = Date.now();
  
  next();
});

// Check if cart is empty
cartSchema.methods.isEmpty = function() {
  return this.items.length === 0;
};

// Get selected items only
cartSchema.methods.getSelectedItems = function() {
  return this.items.filter(item => item.selected);
};

// Calculate selected items total
cartSchema.methods.getSelectedTotal = function() {
  const selectedItems = this.getSelectedItems();
  return selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
};

module.exports = mongoose.model('Cart', cartSchema);