import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate, Link } from 'react-router-dom';
import { 
  CreditCard, Globe, Smartphone, Bitcoin, Building, Send,
  Lock, Shield, Truck, CheckCircle, Wallet,
  Zap, Banknote, QrCode, ArrowLeft, ShieldCheck,
  Gift, Package, Globe as GlobeIcon
} from 'lucide-react';

function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, cartTotal, taxAmount, shippingAmount, grandTotal, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [selectedCountry, setSelectedCountry] = useState('US');
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [isProcessing, setIsProcessing] = useState(false);
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    address: '',
    phone: '',
    email: ''
  });

  // Currency exchange rates - matching GlobalPaymentsPage regions
  const exchangeRates = {
    USD: 1,      // USA
    EUR: 0.92,   // European Union
    GBP: 0.79,   // UK
    CAD: 1.36,   // Canada
    AUD: 1.51,   // Australia
    JPY: 147.5,  // Japan
    CNY: 7.18,   // China
    INR: 83.2,   // India
    NGN: 1260.5, // Nigeria
    ZAR: 18.7,   // South Africa
    KES: 157.2,  // Kenya
    GHS: 12.5,   // Ghana
    BRL: 4.96,   // Brazil
    MXN: 16.85   // Mexico
  };

  // Countries for selection - matching GlobalPaymentsPage
  const countries = [
    { code: 'US', name: 'United States', currency: 'USD', region: 'North America', flag: '🇺🇸' },
    { code: 'GB', name: 'United Kingdom', currency: 'GBP', region: 'Europe', flag: '🇬🇧' },
    { code: 'EU', name: 'European Union', currency: 'EUR', region: 'Europe', flag: '🇪🇺' },
    { code: 'CA', name: 'Canada', currency: 'CAD', region: 'North America', flag: '🇨🇦' },
    { code: 'AU', name: 'Australia', currency: 'AUD', region: 'Asia Pacific', flag: '🇦🇺' },
    { code: 'JP', name: 'Japan', currency: 'JPY', region: 'Asia', flag: '🇯🇵' },
    { code: 'CN', name: 'China', currency: 'CNY', region: 'Asia', flag: '🇨🇳' },
    { code: 'IN', name: 'India', currency: 'INR', region: 'Asia', flag: '🇮🇳' },
    { code: 'NG', name: 'Nigeria', currency: 'NGN', region: 'Africa', flag: '🇳🇬' },
    { code: 'ZA', name: 'South Africa', currency: 'ZAR', region: 'Africa', flag: '🇿🇦' },
    { code: 'KE', name: 'Kenya', currency: 'KES', region: 'Africa', flag: '🇰🇪' },
    { code: 'GH', name: 'Ghana', currency: 'GHS', region: 'Africa', flag: '🇬🇭' },
    { code: 'BR', name: 'Brazil', currency: 'BRL', region: 'South America', flag: '🇧🇷' },
    { code: 'MX', name: 'Mexico', currency: 'MXN', region: 'North America', flag: '🇲🇽' },
  ];

  // Universal payment methods - matching GlobalPaymentsPage
  const paymentMethods = [
    {
      id: 'card',
      name: 'Credit/Debit Cards',
      icon: <CreditCard size={24} />,
      desc: 'Visa, MasterCard, Amex, Discover, UnionPay',
      global: true,
      color: 'from-blue-500 to-indigo-600'
    },
    {
      id: 'digital',
      name: 'Digital Wallets',
      icon: <Smartphone size={24} />,
      desc: 'Apple Pay, Google Pay, PayPal, Alipay, WeChat Pay',
      global: true,
      color: 'from-purple-500 to-pink-600'
    },
    {
      id: 'bank',
      name: 'Bank Transfer',
      icon: <Building size={24} />,
      desc: 'SEPA, SWIFT, ACH, Local Bank Transfers',
      global: true,
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: 'crypto',
      name: 'Cryptocurrency',
      icon: <Bitcoin size={24} />,
      desc: 'Bitcoin, Ethereum, USDT, USDC, BNB',
      global: true,
      color: 'from-gray-700 to-black'
    },
    {
      id: 'mobile',
      name: 'Mobile Money',
      icon: <QrCode size={24} />,
      desc: 'M-Pesa, Orange Money, Airtel Money, PayTM',
      global: true,
      color: 'from-yellow-500 to-orange-600'
    },
    {
      id: 'remittance',
      name: 'Remittance',
      icon: <Send size={24} />,
      desc: 'Western Union, MoneyGram, WorldRemit',
      global: true,
      color: 'from-red-500 to-pink-600'
    }
  ];

  // Features matching GlobalPaymentsPage
  const features = [
    { icon: <Shield />, title: 'Bank-Level Security', desc: '256-bit encryption' },
    { icon: <Zap />, title: 'Instant Processing', desc: 'Real-time confirmation' },
    { icon: <GlobeIcon />, title: '150+ Currencies', desc: 'Global transactions' },
    { icon: <Lock />, title: 'PCI DSS Compliant', desc: 'Highest standards' },
  ];

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCompleteOrder = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    
    // Show success message
    window.showToast?.('Payment successful! Order confirmed.', 'success');
    
    // Clear cart and redirect
    clearCart();
    navigate('/checkout-success');
  };

  const formatCurrency = (amount, currency) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2
    }).format(amount);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-2xl shadow-lg p-12">
              <div className="w-20 h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <Package className="h-10 w-10 text-gray-400" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
              <p className="text-gray-600 mb-8">Add some products to your cart before checkout</p>
              <Link 
                to="/" 
                className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 transition-all"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => navigate('/cart')}
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
            >
              <ArrowLeft size={20} />
              Back to Cart
            </button>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Complete Your Order</h1>
            <p className="text-gray-600">Secure checkout with global payment options</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Checkout Steps */}
            <div className="lg:col-span-2 space-y-8">
              {/* Global Features */}
              <div className="bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 text-white rounded-2xl p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {features.map((feature, idx) => (
                    <div key={idx} className="text-center">
                      <div className="inline-block p-3 bg-white/10 rounded-xl backdrop-blur-sm mb-2">
                        {feature.icon}
                      </div>
                      <div className="text-sm font-medium">{feature.title}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping Information */}
              <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Truck className="h-6 w-6 text-blue-600" />
                  Shipping Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="John Doe"
                      value={shippingInfo.name}
                      onChange={handleShippingChange}
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="john@example.com"
                      value={shippingInfo.email}
                      onChange={handleShippingChange}
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Address</label>
                    <input
                      type="text"
                      name="address"
                      placeholder="123 Main Street"
                      value={shippingInfo.address}
                      onChange={handleShippingChange}
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+1 (555) 123-4567"
                      value={shippingInfo.phone}
                      onChange={handleShippingChange}
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Region & Currency Selection */}
              <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Globe className="h-6 w-6 text-green-600" />
                  Select Region & Currency
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 mb-2">Country / Region</label>
                    <div className="relative">
                      <select
                        value={selectedCountry}
                        onChange={(e) => {
                          setSelectedCountry(e.target.value);
                          const country = countries.find(c => c.code === e.target.value);
                          if (country) setSelectedCurrency(country.currency);
                        }}
                        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all appearance-none"
                      >
                        {countries.map(country => (
                          <option key={country.code} value={country.code}>
                            {country.flag} {country.name} • {country.region}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <Globe className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Currency</label>
                    <div className="relative">
                      <select
                        value={selectedCurrency}
                        onChange={(e) => setSelectedCurrency(e.target.value)}
                        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all appearance-none"
                      >
                        {Object.keys(exchangeRates).map(currency => (
                          <option key={currency} value={currency}>
                            {currency} • {exchangeRates[currency] === 1 ? 'Base' : `${(1/exchangeRates[currency]).toFixed(2)} ${currency}/USD`}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <Banknote className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Methods - Matching GlobalPaymentsPage Style */}
              <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Select Payment Method</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                  {paymentMethods.map(method => (
                    <button
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`p-6 rounded-xl border-2 flex flex-col items-center justify-center transition-all duration-300 ${
                        paymentMethod === method.id
                          ? `border-blue-500 bg-gradient-to-br ${method.color} text-white shadow-lg scale-[1.02]`
                          : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                      }`}
                    >
                      <div className="mb-3">{method.icon}</div>
                      <div className="font-bold text-center mb-1">{method.name}</div>
                      <div className={`text-xs text-center ${
                        paymentMethod === method.id ? 'text-white/90' : 'text-gray-600'
                      }`}>
                        {method.desc}
                      </div>
                      {method.global && (
                        <div className="mt-2 text-xs flex items-center gap-1">
                          <Globe size={12} />
                          Global
                        </div>
                      )}
                    </button>
                  ))}
                </div>

                {/* Selected Payment Method Details */}
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    {paymentMethods.find(m => m.id === paymentMethod)?.icon}
                    {paymentMethods.find(m => m.id === paymentMethod)?.name} Details
                  </h4>
                  
                  {paymentMethod === 'card' && (
                    <div className="space-y-4">
                      <input
                        type="text"
                        placeholder="Card Number"
                        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                        />
                        <input
                          type="text"
                          placeholder="CVV"
                          className="p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                        />
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'digital' && (
                    <div className="text-center py-6">
                      <div className="text-4xl mb-4">📱</div>
                      <p className="text-gray-600">
                        Select your preferred digital wallet during payment
                      </p>
                    </div>
                  )}

                  {/* Security Badges */}
                  <div className="mt-8 pt-6 border-t">
                    <div className="flex flex-wrap items-center justify-center gap-6">
                      <div className="flex items-center gap-2 text-sm">
                        <ShieldCheck className="h-5 w-5 text-green-600" />
                        <span className="font-medium">No OTP Verification</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Zap className="h-5 w-5 text-yellow-600" />
                        <span className="font-medium">Instant Processing</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Lock className="h-5 w-5 text-blue-600" />
                        <span className="font-medium">256-bit Encryption</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Order Summary */}
            <div className="space-y-8">
              {/* Order Summary */}
              <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 sticky top-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h3>
                
                {/* Currency Display */}
                <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-sm text-gray-600">Selected Currency</div>
                      <div className="text-xl font-bold text-gray-900">
                        {selectedCurrency}
                        <span className="text-sm font-normal text-gray-600 ml-2">
                          {exchangeRates[selectedCurrency] === 1 ? 'Base Currency' : `${exchangeRates[selectedCurrency].toFixed(2)} per USD`}
                        </span>
                      </div>
                    </div>
                    <div className="text-2xl">{countries.find(c => c.currency === selectedCurrency)?.flag || '🌐'}</div>
                  </div>
                </div>

                {/* Items List */}
                <div className="space-y-4 mb-6 max-h-80 overflow-y-auto pr-2">
                  {cart.map(item => (
                    <div key={item.id} className="flex gap-4 p-3 bg-gray-50 rounded-lg">
                      <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                        {item.image ? (
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-lg" />
                        ) : (
                          <Package className="h-8 w-8 text-gray-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{item.name}</div>
                        <div className="text-sm text-gray-600">Qty: {item.quantity}</div>
                        <div className="text-sm font-bold text-gray-900">
                          {formatCurrency(item.price * item.quantity * (exchangeRates[selectedCurrency] || 1), selectedCurrency)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">{formatCurrency(cartTotal * (exchangeRates[selectedCurrency] || 1), selectedCurrency)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax (10%)</span>
                    <span className="font-medium">{formatCurrency(taxAmount * (exchangeRates[selectedCurrency] || 1), selectedCurrency)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">
                      {shippingAmount === 0 ? 'FREE' : formatCurrency(shippingAmount * (exchangeRates[selectedCurrency] || 1), selectedCurrency)}
                    </span>
                  </div>
                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>{formatCurrency(grandTotal * (exchangeRates[selectedCurrency] || 1), selectedCurrency)}</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1 text-right">
                      ≈ {formatCurrency(grandTotal, 'USD')} USD
                    </div>
                  </div>
                </div>

                {/* Complete Order Button */}
                <button
                  onClick={handleCompleteOrder}
                  disabled={isProcessing}
                  className={`w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-xl font-bold text-lg mb-4 transition-all duration-300 ${
                    isProcessing ? 'opacity-50 cursor-not-allowed' : 'hover:from-green-600 hover:to-emerald-700 hover:shadow-lg'
                  }`}
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3 inline-block"></div>
                      Processing Payment...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="inline-block mr-3 h-6 w-6" />
                      Complete Order
                    </>
                  )}
                </button>

                {/* Global Payment Providers */}
                <div className="mt-6 pt-6 border-t">
                  <h4 className="font-bold text-gray-900 mb-3 text-center">Supported Globally</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {['Visa', 'MasterCard', 'PayPal', 'Bitcoin', 'M-Pesa', 'Alipay'].map(provider => (
                      <div key={provider} className="p-2 bg-gray-100 rounded-lg text-center text-xs font-medium">
                        {provider}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Security & Support */}
              <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
                <h4 className="font-bold text-gray-900 mb-4">Need Help?</h4>
                <div className="space-y-3">
                  <Link 
                    to="/global-payments"
                    className="flex items-center gap-3 text-blue-600 hover:text-blue-800"
                  >
                    <Globe className="h-5 w-5" />
                    <span>View All Payment Methods</span>
                  </Link>
                  <Link 
                    to="/contact"
                    className="flex items-center gap-3 text-blue-600 hover:text-blue-800"
                  >
                    <Shield className="h-5 w-5" />
                    <span>24/7 Support</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;