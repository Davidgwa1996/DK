import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import ModernHeader from '../components/ModernHeader';
import ModernFooter from '../components/ModernFooter';
import './CheckoutSuccessPage.css';

const CheckoutSuccessPage = () => {
  const { clearCart } = useCart();
  const location = useLocation();
  const orderId = location.state?.orderId || Math.random().toString(36).substr(2, 9).toUpperCase();

  useEffect(() => {
    // Clear cart on successful order
    clearCart();
    
    // Track conversion
    if (window.gtag) {
      window.gtag('event', 'purchase', {
        transaction_id: orderId,
        value: location.state?.total || 0,
        currency: 'GBP'
      });
    }
  }, [clearCart, orderId, location.state?.total]);

  return (
    <div className="checkout-success-page">
      <ModernHeader />
      
      <main className="success-content">
        <div className="success-card">
          <div className="success-icon">✅</div>
          
          <h1>Order Confirmed!</h1>
          <p className="success-message">
            Thank you for your purchase. Your order has been successfully placed and is being processed.
          </p>
          
          <div className="order-details">
            <div className="detail-item">
              <span className="detail-label">Order Number:</span>
              <span className="detail-value">{orderId}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Estimated Delivery:</span>
              <span className="detail-value">3-5 business days</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Payment Method:</span>
              <span className="detail-value">{location.state?.paymentMethod || 'Credit Card'}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Total Amount:</span>
              <span className="detail-value amount">
                {new Intl.NumberFormat('en-GB', {
                  style: 'currency',
                  currency: 'GBP'
                }).format(location.state?.total || 0)}
              </span>
            </div>
          </div>
          
          <div className="next-steps">
            <h3>What's Next?</h3>
            <div className="steps-grid">
              <div className="step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <strong>Order Processing</strong>
                  <p>Your order is being verified and prepared for shipping</p>
                </div>
              </div>
              <div className="step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <strong>Shipping</strong>
                  <p>You'll receive tracking information within 24 hours</p>
                </div>
              </div>
              <div className="step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <strong>Delivery</strong>
                  <p>Your order will arrive in 3-5 business days</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="success-actions">
            <Link to="/" className="continue-shopping">
              Continue Shopping
            </Link>
            <Link to="/contact" className="contact-support">
              Contact Support
            </Link>
          </div>
          
          <div className="success-note">
            <p>📧 A confirmation email has been sent to your registered email address.</p>
            <p>📱 You can track your order in the "My Orders" section of your account.</p>
          </div>
        </div>
      </main>
      
      <ModernFooter />
    </div>
  );
};

export default CheckoutSuccessPage;