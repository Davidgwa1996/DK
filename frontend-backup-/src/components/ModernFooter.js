import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCar, faMobileAlt, faLaptop, faGamepad, 
  faGem, faChargingStation, faHeadset, faQuestionCircle,
  faShippingFast, faUndo, faShieldAlt, faLock,
  faFileContract, faInfoCircle, faBriefcase, faNewspaper,
  faBlog, faStore, faHandshake, faChartBar,
  faGlobeAmericas, faBuilding, faCreditCard
} from '@fortawesome/free-solid-svg-icons';
import { 
  faFacebook, faTwitter, faInstagram, 
  faYoutube, faLinkedin 
} from '@fortawesome/free-brands-svg-icons';
import './ModernFooter.css';

const ModernFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="modern-footer">
      <div className="footer-main">
        {/* Company Info */}
        <div className="footer-section">
          <div className="footer-brand">
            <FontAwesomeIcon icon={faGlobeAmericas} className="footer-logo-icon" />
            <div>
              <h3 className="footer-company-name">UniDigital</h3>
              <p className="footer-tagline">Global Marketplace for Cars & Electronics</p>
            </div>
          </div>
          <p className="footer-description">
            AI-powered global marketplace with focus on US, UK, China, and Japan markets.
            Real-time pricing and verified international sellers.
          </p>
          
          <div className="footer-stats">
            <div className="stat">
              <strong>10M+</strong>
              <span>Products</span>
            </div>
            <div className="stat">
              <strong>AI-Priced</strong>
              <span>Real-time</span>
            </div>
            <div className="stat">
              <strong>24/7</strong>
              <span>Support</span>
            </div>
          </div>
        </div>

        {/* Shop Categories */}
        <div className="footer-section">
          <h4 className="footer-section-title">SHOP CATEGORIES</h4>
          <ul className="footer-links">
            <li>
              <Link to="/category/cars">
                <FontAwesomeIcon icon={faCar} className="footer-link-icon" />
                Cars
              </Link>
            </li>
            <li>
              <Link to="/category/electronics">
                <FontAwesomeIcon icon={faMobileAlt} className="footer-link-icon" />
                Electronics
              </Link>
            </li>
            <li>
              <Link to="/category/auto-parts">
                <FontAwesomeIcon icon={faCar} className="footer-link-icon" />
                Auto Parts
              </Link>
            </li>
            <li>
              <Link to="/category/smartphones">
                <FontAwesomeIcon icon={faMobileAlt} className="footer-link-icon" />
                Smartphones
              </Link>
            </li>
            <li>
              <Link to="/category/laptops">
                <FontAwesomeIcon icon={faLaptop} className="footer-link-icon" />
                Laptops
              </Link>
            </li>
            <li>
              <Link to="/category/gaming">
                <FontAwesomeIcon icon={faGamepad} className="footer-link-icon" />
                Gaming
              </Link>
            </li>
            <li>
              <Link to="/category/luxury-cars">
                <FontAwesomeIcon icon={faGem} className="footer-link-icon" />
                Luxury Cars
              </Link>
            </li>
            <li>
              <Link to="/category/electric-cars">
                <FontAwesomeIcon icon={faChargingStation} className="footer-link-icon" />
                Electric Cars
              </Link>
            </li>
          </ul>
        </div>

        {/* Customer Service */}
        <div className="footer-section">
          <h4 className="footer-section-title">CUSTOMER SERVICE</h4>
          <ul className="footer-links">
            <li>
              <Link to="/contact">
                <FontAwesomeIcon icon={faHeadset} className="footer-link-icon" />
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="/faq">
                <FontAwesomeIcon icon={faQuestionCircle} className="footer-link-icon" />
                FAQ
              </Link>
            </li>
            <li>
              <Link to="/shipping">
                <FontAwesomeIcon icon={faShippingFast} className="footer-link-icon" />
                Shipping Info
              </Link>
            </li>
            <li>
              <Link to="/returns">
                <FontAwesomeIcon icon={faUndo} className="footer-link-icon" />
                Returns Policy
              </Link>
            </li>
            <li>
              <Link to="/warranty">
                <FontAwesomeIcon icon={faShieldAlt} className="footer-link-icon" />
                Warranty
              </Link>
            </li>
            <li>
              <Link to="/privacy">
                <FontAwesomeIcon icon={faLock} className="footer-link-icon" />
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms">
                <FontAwesomeIcon icon={faFileContract} className="footer-link-icon" />
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div className="footer-section">
          <h4 className="footer-section-title">COMPANY</h4>
          <ul className="footer-links">
            <li>
              <Link to="/about">
                <FontAwesomeIcon icon={faInfoCircle} className="footer-link-icon" />
                About Us
              </Link>
            </li>
            <li>
              <Link to="/careers">
                <FontAwesomeIcon icon={faBriefcase} className="footer-link-icon" />
                Careers
              </Link>
            </li>
            <li>
              <Link to="/press">
                <FontAwesomeIcon icon={faNewspaper} className="footer-link-icon" />
                Press
              </Link>
            </li>
            <li>
              <Link to="/blog">
                <FontAwesomeIcon icon={faBlog} className="footer-link-icon" />
                Blog
              </Link>
            </li>
            <li>
              <Link to="/sellers">
                <FontAwesomeIcon icon={faStore} className="footer-link-icon" />
                Sell on UniDigital
              </Link>
            </li>
            <li>
              <Link to="/affiliates">
                <FontAwesomeIcon icon={faHandshake} className="footer-link-icon" />
                Affiliate Program
              </Link>
            </li>
            <li>
              <Link to="/market-analysis">
                <FontAwesomeIcon icon={faChartBar} className="footer-link-icon" />
                Market Analysis
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter & Markets */}
        <div className="footer-section newsletter-section">
          <h4 className="footer-section-title">STAY UPDATED</h4>
          <p className="newsletter-description">Get AI-priced deals and market insights from global markets</p>
          
          <div className="newsletter-form">
            <input 
              type="email" 
              placeholder="Your email" 
              className="newsletter-input"
            />
            <button className="newsletter-button">Subscribe</button>
          </div>
          
          <div className="market-flags">
            <div className="market-flag">
              <span className="flag-code">US</span>
              <span className="flag-name">United States</span>
            </div>
            <div className="market-flag">
              <span className="flag-code">UK</span>
              <span className="flag-name">United Kingdom</span>
            </div>
            <div className="market-flag">
              <span className="flag-code">CN</span>
              <span className="flag-name">China</span>
            </div>
            <div className="market-flag">
              <span className="flag-code">JP</span>
              <span className="flag-name">Japan</span>
            </div>
          </div>
          
          <div className="social-links">
            <a href="#" className="social-icon">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a href="#" className="social-icon">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="#" className="social-icon">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="#" className="social-icon">
              <FontAwesomeIcon icon={faYoutube} />
            </a>
            <a href="#" className="social-icon">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <div className="copyright">
            © {currentYear} UniDigital Marketplace. Global reach with focus on US, UK, China, and Japan markets.
          </div>
          
          <div className="payment-security">
            <div className="payment-methods">
              <FontAwesomeIcon icon={faCreditCard} className="payment-icon" />
              <span className="payment-text">Visa</span>
              <span className="payment-text">Mastercard</span>
              <span className="payment-text">PayPal</span>
              <span className="payment-text">Apple Pay</span>
              <span className="payment-text">Google Pay</span>
            </div>
            
            <div className="security-badges">
              <span className="security-badge">
                <FontAwesomeIcon icon={faShieldAlt} />
                SSL Secure
              </span>
              <span className="security-badge">
                <FontAwesomeIcon icon={faGlobeAmericas} />
                Global Shipping
              </span>
              <span className="security-badge">
                <FontAwesomeIcon icon={faBuilding} />
                UK Registered
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ModernFooter;