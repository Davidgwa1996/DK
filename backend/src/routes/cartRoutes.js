const express = require('express');
const router = express.Router();
const {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
  toggleItemSelection
} = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware');

// All cart routes require authentication
router.use(protect);

router.get('/', getCart);
router.post('/items', addToCart);
router.put('/items/:itemId', updateCartItem);
router.put('/items/:itemId/toggle', toggleItemSelection);
router.delete('/items/:itemId', removeFromCart);
router.delete('/', clearCart);

module.exports = router;