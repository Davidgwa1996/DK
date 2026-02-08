import React from 'react';
import { Link } from 'react-router-dom';
import './ModernFooter.css';

const ModernFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="modern-footer">
      <div className="footer-main">
        {/* Company Info */}
        <div className="footer-section">
          <div className="footer-logo">UD</div>
          <h3>UniDigital</h3>
          <p className="footer-tagline">Global Marketplace for Cars & Electronics</p>
          <p className="footer-description">
            UK's fastest-growing marketplace with AI-powered pricing, 
            verified sellers, and international shipping.
          </p>
          <div className="footer-stats">
            <div className="stat">
              <strong>98.7%</strong>
              <span>AI Accuracy</span>
            </div>
            <div className="stat">
              <strong>50K+</strong>
              <span>Products</span>
            </div>
            <div className="stat">
              <strong>24/7</strong>
              <span>Support</span>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h4>Shop Categories</h4>
          <ul className="footer-links">
            <li><Link to="/category/cars">🚗 Cars</Link></li>
            <li><Link to="/category/electronics">📱 Electronics</Link></li>
            <li><Link to="/category/auto-parts">🔧 Auto Parts</Link></li>
            <li><Link to="/category/smartphones">📱 Smartphones</Link></li>
            <li><Link to="/category/laptops">💻 Laptops</Link></li>
            <li><Link to="/category/gaming">🎮 Gaming</Link></li>
            <li><Link to="/category/luxury-cars">💎 Luxury Cars</Link></li>
            <li><Link to="/category/electric-cars">⚡ Electric Cars</Link></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div className="footer-section">
          <h4>Customer Service</h4>
          <ul className="footer-links">
            <li><Link to="/contact">📞 Contact Us</Link></li>
            <li><Link to="/faq">❓ FAQ</Link></li>
            <li><Link to="/shipping">🚚 Shipping Info</Link></li>
            <li><Link to="/returns">↩️ Returns Policy</Link></li>
            <li><Link to="/warranty">🛡️ Warranty</Link></li>
            <li><Link to="/privacy">🔒 Privacy Policy</Link></li>
            <li><Link to="/terms">📄 Terms of Service</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div className="footer-section">
          <h4>Company</h4>
          <ul className="footer-links">
            <li><Link to="/about">🏢 About Us</Link></li>
            <li><Link to="/careers">💼 Careers</Link></li>
            <li><Link to="/press">📰 Press</Link></li>
            <li><Link to="/blog">📝 Blog</Link></li>
            <li><Link to="/sellers">🤝 Sell on UniDigital</Link></li>
            <li><Link to="/affiliates">💰 Affiliate Program</Link></li>
            <li><Link to="/market-analysis">📊 Market Analysis</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="footer-section newsletter">
          <h4>Stay Updated</h4>
          <p>Get AI-priced deals and market insights</p>
          <div className="newsletter-form">
            <input type="email" placeholder="Your email" />
            <button>Subscribe</button>
          </div>
          <div className="social-links">
            <a href="#" className="social-icon">📘</a>
            <a href="#" className="social-icon">🐦</a>
            <a href="#" className="social-icon">📷</a>
            <a href="#" className="social-icon">🎬</a>
            <a href="#" className="social-icon">💼</a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="footer-bottom-left">
          <span>© {currentYear} UniDigital. All rights reserved.</span>
          <span className="divider">|</span>
          <span>VAT: GB 123 4567 89</span>
          <span className="divider">|</span>
          <span>Company: 12345678</span>
        </div>
        
        <div className="footer-bottom-right">
          <div className="payment-methods">
            <span>💳</span>
            <span>🅿️</span>
            <span>🍎</span>
            <span>👤</span>
            <span>🇦</span>
            <span>💲</span>
          </div>
          <div className="international-info">
            <span>🌍 International Shipping</span>
            <span>🏛️ UK Registered</span>
            <span>🛡️ Secure Payment</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ModernFooter;