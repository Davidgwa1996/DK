import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  CreditCard, Globe, Smartphone, Bitcoin, Building, Send,
  Lock, Shield, Truck, CheckCircle, AlertCircle,
  Zap, Wallet, Banknote, QrCode
} from 'lucide-react';
import { toast } from 'react-hot-toast';

function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [selectedCountry, setSelectedCountry] = useState('GB');
  const [selectedCurrency, setSelectedCurrency] = useState('GBP');
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock order data
  const order = location.state?.items || [
    { id: 1, name: 'Tesla Model 3', price: 48999, quantity: 1 },
    { id: 2, name: 'iPhone 15 Pro', price: 1199, quantity: 1 }
  ];

  // Currency exchange rates
  const exchangeRates = {
    GBP: 1,
    USD: 1.27,
    EUR: 1.17,
    CAD: 1.71,
    AUD: 1.92,
    JPY: 186.5,
    CNY: 9.12,
    INR: 105.8,
    NGN: 1602.3,
    ZAR: 23.8,
    BRL: 6.31,
    MXN: 21.4
  };

  const subtotal = order.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const delivery = 99;
  const totalGBP = subtotal + delivery;
  const total = totalGBP * (exchangeRates[selectedCurrency] || 1);

  // Countries for selection
  const countries = [
    { code: 'GB', name: 'United Kingdom', currency: 'GBP' },
    { code: 'US', name: 'United States', currency: 'USD' },
    { code: 'CA', name: 'Canada', currency: 'CAD' },
    { code: 'AU', name: 'Australia', currency: 'AUD' },
    { code: 'EU', name: 'European Union', currency: 'EUR' },
    { code: 'JP', name: 'Japan', currency: 'JPY' },
    { code: 'CN', name: 'China', currency: 'CNY' },
    { code: 'IN', name: 'India', currency: 'INR' },
    { code: 'NG', name: 'Nigeria', currency: 'NGN' },
    { code: 'ZA', name: 'South Africa', currency: 'ZAR' },
    { code: 'BR', name: 'Brazil', currency: 'BRL' },
    { code: 'MX', name: 'Mexico', currency: 'MXN' },
  ];

  // Universal payment methods
  const paymentMethods = [
    {
      id: 'card',
      name: 'Any Card Worldwide',
      icon: <CreditCard size={24} />,
      desc: 'All cards accepted - Visa, MasterCard, Amex, UnionPay, Discover',
      global: true
    },
    {
      id: 'bank',
      name: 'Any Bank Transfer',
      icon: <Building size={24} />,
      desc: 'Transfer from any bank in any country',
      global: true
    },
    {
      id: 'digital',
      name: 'Digital Wallets',
      icon: <Smartphone size={24} />,
      desc: 'PayPal, Apple Pay, Google Pay, AliPay, WeChat Pay',
      global: true
    },
    {
      id: 'crypto',
      name: 'Cryptocurrency',
      icon: <Bitcoin size={24} />,
      desc: 'Bitcoin, Ethereum, USDT, USDC, BNB, Solana',
      global: true
    },
    {
      id: 'remittance',
      name: 'Remittance Services',
      icon: <Send size={24} />,
      desc: 'Western Union, MoneyGram, WorldRemit, Ria',
      global: true
    },
    {
      id: 'local',
      name: 'Local Payment Methods',
      icon: <Wallet size={24} />,
      desc: 'Mobile Money, Cash, Vouchers, Gift Cards',
      global: true
    }
  ];

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    toast.success('Payment processed successfully!');
    navigate('/order-success');
  };

  const formatCurrency = (amount, currency) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Global Header */}
          <div className="mb-8 p-6 bg-gradient-to-r from-primary to-blue-800 text-white rounded-2xl">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold mb-2">Universal Checkout</h1>
                <p className="opacity-90">Pay from anywhere with any payment method</p>
              </div>
              <div className="flex space-x-4 mt-4 md:mt-0">
                <select
                  value={selectedCountry}
                  onChange={(e) => {
                    setSelectedCountry(e.target.value);
                    const country = countries.find(c => c.code === e.target.value);
                    if (country) setSelectedCurrency(country.currency);
                  }}
                  className="bg-white/20 text-white border border-white/30 rounded-lg px-4 py-2"
                >
                  <option value="">Select Country</option>
                  {countries.map(country => (
                    <option key={country.code} value={country.code}>
                      {country.name}
                    </option>
                  ))}
                </select>
                <select
                  value={selectedCurrency}
                  onChange={(e) => setSelectedCurrency(e.target.value)}
                  className="bg-white/20 text-white border border-white/30 rounded-lg px-4 py-2"
                >
                  {Object.keys(exchangeRates).map(currency => (
                    <option key={currency} value={currency}>{currency}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column - Payment Methods */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Payment Method</h2>
                
                {/* Universal Payment Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                  {paymentMethods.map(method => (
                    <button
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`p-4 rounded-xl border-2 flex flex-col items-center justify-center h-40 ${
                        paymentMethod === method.id
                          ? 'border-primary bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="mb-3">{method.icon}</div>
                      <div className="font-medium text-center text-sm mb-1">{method.name}</div>
                      <div className="text-xs text-gray-600 text-center">{method.desc}</div>
                      {method.global && (
                        <div className="mt-2 flex items-center text-xs text-green-600">
                          <Globe size={12} className="mr-1" />
                          Global
                        </div>
                      )}
                    </button>
                  ))}
                </div>

                {/* Payment Method Forms */}
                {paymentMethod === 'card' && (
                  <div className="space-y-6">
                    <div className="p-4 bg-blue-50 rounded-lg mb-4">
                      <div className="font-medium text-blue-900 mb-2">💳 Accepting All Cards Worldwide</div>
                      <p className="text-sm text-blue-800">
                        We accept Visa, MasterCard, American Express, UnionPay, Discover, JCB,
                        and all regional card networks from any country.
                      </p>
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-2">Card Number</label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        className="w-full p-4 border border-gray-300 rounded-xl"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 mb-2">Expiry Date</label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="w-full p-4 border border-gray-300 rounded-xl"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2">CVV</label>
                        <input
                          type="text"
                          placeholder="123"
                          className="w-full p-4 border border-gray-300 rounded-xl"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-2">Cardholder Name</label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        className="w-full p-4 border border-gray-300 rounded-xl"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-2">Card Issuer Country</label>
                      <select className="w-full p-4 border border-gray-300 rounded-xl">
                        <option value="">Any Country</option>
                        {countries.map(country => (
                          <option key={country.code} value={country.code}>{country.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                {paymentMethod === 'bank' && (
                  <div>
                    <div className="p-4 bg-green-50 rounded-lg mb-6">
                      <div className="font-medium text-green-900 mb-2">🏦 Any Bank Worldwide Accepted</div>
                      <p className="text-sm text-green-800">
                        Transfer from any bank in any country. We accept SWIFT, SEPA, ACH, Faster Payments,
                        and all local banking networks.
                      </p>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-gray-700 mb-2">Your Bank Name (Any Bank)</label>
                        <input
                          type="text"
                          placeholder="Enter your bank name"
                          className="w-full p-4 border border-gray-300 rounded-xl"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 mb-2">Bank Account Number</label>
                        <input
                          type="text"
                          placeholder="Your account number"
                          className="w-full p-4 border border-gray-300 rounded-xl"
                        />
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-xl">
                        <div className="font-medium text-gray-900 mb-2">Our Bank Details</div>
                        <div className="space-y-2 text-sm">
                          <div><span className="font-medium">Bank:</span> Global Payment Network</div>
                          <div><span className="font-medium">Account:</span> 1234567890</div>
                          <div><span className="font-medium">SWIFT/BIC:</span> UNIDGB2L</div>
                          <div><span className="font-medium">Reference:</span> UD-{Date.now()}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Other payment methods... */}
              </div>

              {/* Security Badges */}
              <div className="mt-8 p-6 bg-gray-50 rounded-xl">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <div className="flex items-center">
                    <Lock size={20} className="text-green-600 mr-3" />
                    <span className="font-medium">256-bit SSL Encryption</span>
                  </div>
                  <div className="flex items-center">
                    <Shield size={20} className="text-blue-600 mr-3" />
                    <span className="font-medium">PCI DSS Compliant</span>
                  </div>
                  <div className="flex items-center">
                    <Globe size={20} className="text-purple-600 mr-3" />
                    <span className="font-medium">Global Compliance</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Your payment is secure and encrypted. We comply with international payment regulations
                  including GDPR, PSD2, and local financial regulations worldwide.
                </p>
              </div>
            </div>

            {/* Right Column - Order Summary */}
            <div>
              <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-24">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h3>
                
                {/* Currency Display */}
                <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">Paying in</div>
                      <div className="text-2xl font-bold">{selectedCurrency}</div>
                    </div>
                    <Globe size={24} className="text-primary" />
                  </div>
                </div>

                {/* Items */}
                <div className="space-y-4 mb-6">
                  {order.map(item => (
                    <div key={item.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-gray-600">Qty: {item.quantity}</div>
                      </div>
                      <div className="font-bold">
                        {formatCurrency(item.price * item.quantity * (exchangeRates[selectedCurrency] || 1), selectedCurrency)}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{formatCurrency(subtotal * (exchangeRates[selectedCurrency] || 1), selectedCurrency)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery</span>
                    <span>{formatCurrency(delivery * (exchangeRates[selectedCurrency] || 1), selectedCurrency)}</span>
                  </div>
                  <div className="border-t pt-4 flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span>{formatCurrency(total, selectedCurrency)}</span>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className={`w-full bg-gradient-to-r from-primary to-blue-700 text-white py-4 rounded-xl font-bold text-lg mb-4 flex items-center justify-center ${
                    isProcessing ? 'opacity-50 cursor-not-allowed' : 'hover:from-blue-800 hover:to-primary'
                  }`}
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Lock size={20} className="mr-2" />
                      Pay Securely {formatCurrency(total, selectedCurrency)}
                    </>
                  )}
                </button>

                {/* Guarantees */}
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-center">
                    <CheckCircle size={16} className="text-green-500 mr-2" />
                    <span>Money-back guarantee worldwide</span>
                  </div>
                  <div className="flex items-center">
                    <Shield size={16} className="text-blue-500 mr-2" />
                    <span>Buyer protection included</span>
                  </div>
                  <div className="flex items-center">
                    <Zap size={16} className="text-yellow-500 mr-2" />
                    <span>Instant payment confirmation</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method Logos */}
          <div className="mt-12 p-6 bg-white rounded-2xl">
            <div className="text-center mb-6">
              <div className="font-bold text-gray-900 mb-2">Supported Worldwide</div>
              <p className="text-gray-600">We work with payment providers across the globe</p>
            </div>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4 text-center">
              {['Visa', 'MasterCard', 'PayPal', 'Bitcoin', 'Western Union', 'Mobile Money'].map(provider => (
                <div key={provider} className="p-4 border rounded-lg">
                  <div className="font-medium text-gray-700">{provider}</div>
                  <div className="text-xs text-gray-500 mt-1">Global</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;