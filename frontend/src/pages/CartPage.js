import React from 'react';
import Header from '../components/ModernHeader';
import Footer from '../components/ModernFooter';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, Shield, Truck, CreditCard } from 'lucide-react';

function CartPage() {
  const navigate = useNavigate();
  const { 
    cart, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    cartTotal, 
    getCartCount,
    taxAmount,
    shippingAmount,
    grandTotal,
    isCartEmpty
  } = useCart();

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity >= 1) {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const handleContinueShopping = () => {
    navigate('/products');
  };

  if (isCartEmpty) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
              
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-6">
                  <ShoppingBag className="h-12 w-12 text-gray-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  Looks like you haven't added any items to your cart yet. Start shopping to find amazing products!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button 
                    onClick={() => navigate('/')}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 transition-all"
                  >
                    Continue Shopping
                  </button>
                  <button 
                    onClick={() => navigate('/products')}
                    className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-xl font-medium hover:bg-gray-50 transition-all"
                  >
                    Browse Products
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-4xl font-bold text-gray-900">Shopping Cart</h1>
                <p className="text-gray-600 mt-2">{getCartCount()} items in your cart</p>
              </div>
              <button 
                onClick={clearCart}
                className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium"
              >
                <Trash2 className="h-5 w-5" />
                Clear Cart
              </button>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                  {cart.map((item) => (
                    <div key={item.id} className="flex flex-col sm:flex-row gap-6 py-6 border-b border-gray-200 last:border-0">
                      {/* Product Image */}
                      <div className="sm:w-32 sm:h-32 w-full h-48 bg-gray-100 rounded-xl overflow-hidden">
                        {item.image ? (
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
                            <ShoppingBag className="h-12 w-12 text-gray-400" />
                          </div>
                        )}
                      </div>

                      {/* Product Details */}
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.name}</h3>
                            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description || 'No description available'}</p>
                            <div className="flex items-center gap-4">
                              <span className="text-2xl font-bold text-gray-900">
                                ${item.price.toFixed(2)}
                              </span>
                              {item.originalPrice && (
                                <span className="text-lg text-gray-400 line-through">
                                  ${item.originalPrice.toFixed(2)}
                                </span>
                              )}
                            </div>
                          </div>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="h-8 w-8 flex items-center justify-center text-gray-400 hover:text-red-500"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between mt-6">
                          <div className="flex items-center gap-3">
                            <button 
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300 hover:bg-gray-50"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="w-16 text-center font-medium">{item.quantity}</span>
                            <button 
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300 hover:bg-gray-50"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-gray-900">
                              ${(item.price * item.quantity).toFixed(2)}
                            </div>
                            <div className="text-sm text-gray-500">
                              ${item.price.toFixed(2)} each
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Continue Shopping */}
                <div className="flex items-center justify-between">
                  <button 
                    onClick={handleContinueShopping}
                    className="flex items-center gap-2 text-gray-700 hover:text-gray-900 font-medium"
                  >
                    <ArrowLeft className="h-5 w-5" />
                    Continue Shopping
                  </button>
                  <div className="text-lg">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="ml-2 text-2xl font-bold text-gray-900">${cartTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-medium">
                        {shippingAmount === 0 ? 'FREE' : `$${shippingAmount.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax</span>
                      <span className="font-medium">${taxAmount.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4 mb-6">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-2xl">${grandTotal.toFixed(2)}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">Including all taxes and fees</p>
                  </div>

                  <button 
                    onClick={handleCheckout}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-xl font-bold text-lg mb-4 hover:from-green-600 hover:to-emerald-700 transition-all"
                  >
                    Proceed to Checkout
                  </button>

                  <div className="space-y-4 mt-6">
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                      <Shield className="h-5 w-5 text-blue-600" />
                      <span className="text-sm text-blue-700">Secure payment • 256-bit encryption</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <Truck className="h-5 w-5 text-green-600" />
                      <span className="text-sm text-green-700">Free shipping on orders over $50</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                      <CreditCard className="h-5 w-5 text-purple-600" />
                      <span className="text-sm text-purple-700">Multiple payment methods available</span>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <h3 className="font-medium text-gray-900 mb-3">Need help?</h3>
                    <div className="space-y-2">
                      <button 
                        onClick={() => navigate('/contact')}
                        className="text-blue-600 hover:text-blue-700 text-sm block w-full text-left"
                      >
                        Contact Support
                      </button>
                      <button 
                        onClick={() => navigate('/global-payments')}
                        className="text-blue-600 hover:text-blue-700 text-sm block w-full text-left"
                      >
                        View Payment Options
                      </button>
                      <button 
                        onClick={() => navigate('/checkout')}
                        className="text-blue-600 hover:text-blue-700 text-sm block w-full text-left"
                      >
                        Return Policy
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recently Viewed / Recommendations */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">You Might Also Like</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* These would be dynamic recommendations */}
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="h-32 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg mb-3"></div>
                    <h3 className="font-medium text-gray-900">Product {i}</h3>
                    <p className="text-sm text-gray-600">${(i * 29.99).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default CartPage;