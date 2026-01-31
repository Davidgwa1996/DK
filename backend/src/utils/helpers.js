/**
 * Format currency
 */
const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  }).format(amount);
};

/**
 * Generate random string
 */
const generateRandomString = (length = 10) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

/**
 * Generate order number
 */
const generateOrderNumber = () => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `ORD-${timestamp}-${random}`;
};

/**
 * Calculate tax
 */
const calculateTax = (subtotal, taxRate = 0.085) => {
  return parseFloat((subtotal * taxRate).toFixed(2));
};

/**
 * Calculate shipping
 */
const calculateShipping = (subtotal, freeShippingThreshold = 50, shippingCost = 5.99) => {
  return subtotal >= freeShippingThreshold ? 0 : shippingCost;
};

/**
 * Validate email
 */
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Slugify string
 */
const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};

/**
 * Truncate string
 */
const truncate = (str, length = 100) => {
  if (str.length <= length) return str;
  return str.substr(0, length) + '...';
};

/**
 * Delay helper
 */
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Sanitize object (remove undefined/null values)
 */
const sanitizeObject = (obj) => {
  const sanitized = {};
  Object.keys(obj).forEach(key => {
    if (obj[key] !== undefined && obj[key] !== null) {
      sanitized[key] = obj[key];
    }
  });
  return sanitized;
};

module.exports = {
  formatCurrency,
  generateRandomString,
  generateOrderNumber,
  calculateTax,
  calculateShipping,
  isValidEmail,
  slugify,
  truncate,
  delay,
  sanitizeObject
};