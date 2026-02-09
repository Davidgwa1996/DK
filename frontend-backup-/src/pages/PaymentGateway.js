import React, { useState } from 'react';
import ModernHeader from '../components/ModernHeader';
import ModernFooter from '../components/ModernFooter';
import { useCart } from '../context/CartContext';
import './PaymentGateway.css';

const PaymentGateway = () => {
  const { cartTotal, items } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [country, setCountry] = useState('GB');
  const [currency, setCurrency] = useState('GBP');

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: '💳', description: 'Visa, Mastercard, American Express' },
    { id: 'paypal', name: 'PayPal', icon: '👤', description: 'Pay with your PayPal account' },
    { id: 'applepay', name: 'Apple Pay', icon: '🍎', description: 'Fast and secure Apple Pay' },
    { id: 'googlepay', name: 'Google Pay', icon: '🇬', description: 'Google Pay for Android users' },
    { id: 'bank', name: 'Bank Transfer', icon: '🏦', description: 'Direct bank transfer' },
    { id: 'crypto', name: 'Cryptocurrency', icon: '₿', description: 'Bitcoin, Ethereum, USDC' },
    { id: 'klarna', name: 'Klarna', icon: '🎯', description: 'Buy now, pay later' },
    { id: 'alipay', name: 'Alipay', icon: '💰', description: 'Popular in China & Asia' },
  ];

  const countries = [
    { code: 'GB', name: 'United Kingdom', currency: 'GBP', flag: '🇬🇧' },
    { code: 'US', name: 'United States', currency: 'USD', flag: '🇺🇸' },
    { code: 'EU', name: 'European Union', currency: 'EUR', flag: '🇪🇺' },
    { code: 'AE', name: 'UAE', currency: 'AED', flag: '🇦🇪' },
    { code: 'AU', name: 'Australia', currency: 'AUD', flag: '🇦🇺' },
    { code: 'CA', name: 'Canada', currency: 'CAD', flag: '🇨🇦' },
    { code: 'JP', name: 'Japan', currency: 'JPY', flag: '🇯🇵' },
    { code: 'CN', name: 'China', currency: 'CNY', flag: '🇨🇳' },
  ];

  const formatCurrency = (amount, currencyCode) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: currencyCode,
    }).format(amount);
  };

  const calculateExchange = (amount, fromCurrency, toCurrency) => {
    // Simple exchange rates (in real app, use API)
    const rates = {
      'GBP': { 'USD': 1.27, 'EUR': 1.17, 'AED': 4.67, 'AUD': 1.92, 'CAD': 1.70, 'JPY': 187, 'CNY': 9.1 },
      'USD': { 'GBP': 0.79, 'EUR': 0.92, 'AED': 3.67 },
      'EUR': { 'GBP': 0.85, 'USD': 1.09, 'AED': 4.00 },
    };
    
    if (fromCurrency === toCurrency) return amount;
    return amount * (rates[fromCurrency]?.[toCurrency] || amount);
  };

  const exchangeAmount = calculateExchange(cartTotal, 'GBP', currency);

  return (
    <div className="payment-gateway-page">
      <ModernHeader />
      
      <main className="payment-content">
        <div className="payment-container">
          {/* Header */}
          <div className="payment-header">
            <h1>🌍 Global Payments</h1>
            <p className="payment-subtitle">
              Secure payment processing with support for 150+ countries and 50+ currencies
            </p>
          </div>

          <div className="payment-layout">
            {/* Left Column: Payment Details */}
            <div className="payment-details">
              {/* Country & Currency Selector */}
              <div className="location-selector">
                <h3>Location & Currency</h3>
                <div className="selector-grid">
                  <div className="selector-group">
                    <label>Country</label>
                    <select value={country} onChange={(e) => setCountry(e.target.value)}>
                      {countries.map(c => (
                        <option key={c.code} value={c.code}>
                          {c.flag} {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="selector-group">
                    <label>Currency</label>
                    <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
                      {countries.map(c => (
                        <option key={c.currency} value={c.currency}>
                          {c.currency} - {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="exchange-info">
                  <span>Original: {formatCurrency(cartTotal, 'GBP')}</span>
                  <span>→</span>
                  <span className="exchanged-amount">{formatCurrency(exchangeAmount, currency)}</span>
                </div>
              </div>

              {/* Payment Method Selection */}
              <div className="payment-methods-section">
                <h3>Select Payment Method</h3>
                <div className="payment-methods-grid">
                  {paymentMethods.map(method => (
                    <button
                      key={method.id}
                      className={`payment-method-btn ${paymentMethod === method.id ? 'active' : ''}`}
                      onClick={() => setPaymentMethod(method.id)}
                    >
                      <span className="method-icon">{method.icon}</span>
                      <div className="method-info">
                        <strong>{method.name}</strong>
                        <small>{method.description}</small>
                      </div>
                      {paymentMethod === method.id && <span className="check">✓</span>}
                    </button>
                  ))}
                </div>
              </div>

              {/* Payment Form (Dynamic based on method) */}
              <div className="payment-form-section">
                <h3>Payment Details</h3>
                {paymentMethod === 'card' && (
                  <div className="card-form">
                    <div className="form-group">
                      <label>Card Number</label>
                      <input type="text" placeholder="1234 5678 9012 3456" />
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Expiry Date</label>
                        <input type="text" placeholder="MM/YY" />
                      </div>
                      <div className="form-group">
                        <label>CVV</label>
                        <input type="text" placeholder="123" />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Cardholder Name</label>
                      <input type="text" placeholder="John Doe" />
                    </div>
                  </div>
                )}

                {paymentMethod === 'paypal' && (
                  <div className="paypal-form">
                    <p>You will be redirected to PayPal to complete your payment securely.</p>
                    <button className="paypal-btn">Continue to PayPal</button>
                  </div>
                )}

                {paymentMethod === 'crypto' && (
                  <div className="crypto-form">
                    <p>Select cryptocurrency:</p>
                    <div className="crypto-options">
                      <button>Bitcoin (BTC)</button>
                      <button>Ethereum (ETH)</button>
                      <button>USDC</button>
                    </div>
                    <div className="crypto-address">
                      <p>Send payment to:</p>
                      <code>bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh</code>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Order Summary */}
            <div className="order-summary">
              <h3>Order Summary</h3>
              <div className="summary-items">
                {items.map(item => (
                  <div key={item.id} className="summary-item">
                    <span>{item.name} × {item.quantity}</span>
                    <span>{formatCurrency(item.price * item.quantity, currency)}</span>
                  </div>
                ))}
              </div>
              
              <div className="summary-totals">
                <div className="total-row">
                  <span>Subtotal</span>
                  <span>{formatCurrency(exchangeAmount, currency)}</span>
                </div>
                <div className="total-row">
                  <span>Shipping</span>
                  <span>{country === 'GB' ? 'FREE' : formatCurrency(calculateExchange(9.99, 'GBP', currency), currency)}</span>
                </div>
                <div className="total-row">
                  <span>Tax (VAT)</span>
                  <span>{formatCurrency(exchangeAmount * 0.2, currency)}</span>
                </div>
                <div className="total-row grand-total">
                  <span>Total</span>
                  <span>{formatCurrency(exchangeAmount * 1.2 + (country === 'GB' ? 0 : calculateExchange(9.99, 'GBP', currency)), currency)}</span>
                </div>
              </div>

              <div className="security-features">
                <h4>🔒 Secure Payment</h4>
                <ul>
                  <li>SSL Encrypted Connection</li>
                  <li>PCI DSS Compliant</li>
                  <li>3D Secure Authentication</li>
                  <li>Money-Back Guarantee</li>
                </ul>
              </div>

              <button className="pay-now-btn">
                Pay {formatCurrency(exchangeAmount * 1.2 + (country === 'GB' ? 0 : calculateExchange(9.99, 'GBP', currency)), currency)}
              </button>

              <div className="accepted-cards">
                <span>💳</span>
                <span>🅿️</span>
                <span>🍎</span>
                <span>👤</span>
                <span>🏦</span>
                <span>₿</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <ModernFooter />
    </div>
  );
};

export default PaymentGateway;