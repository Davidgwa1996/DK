import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './ModernHeader.css';

const ModernHeader = () => {
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const [liveData, setLiveData] = useState({
    carIndex: '+2.2%',
    electronics: '+1.5%',
    evDemand: '+20%',
    time: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
  });

  const [userLocation, setUserLocation] = useState('GB');
  const [currency, setCurrency] = useState('GBP');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Update live data every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveData(prev => ({
        ...prev,
        time: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  // Detect user location
  useEffect(() => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (timezone.includes('America')) setUserLocation('US');
    else if (timezone.includes('Europe')) setUserLocation('EU');
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      alert(`Searching for: "${searchQuery}"`);
      setSearchQuery('');
    }
  };

  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const countries = {
    'GB': 'UK',
    'US': 'US',
    'EU': 'EU',
    'AU': 'AU',
    'AE': 'UAE'
  };

  const currencies = {
    'GBP': '£ GBP',
    'USD': '$ USD',
    'EUR': '€ EUR',
    'AED': 'AED'
  };

  return (
    <header className="modern-header">
      {/* Single Header with no duplicate sections */}
      <div className="header-main">
        {/* Logo and Mobile Menu Toggle */}
        <div className="logo-section">
          <div className="logo" onClick={() => navigate('/')}>
            <span className="logo-icon">U</span>
            <span className="logo-text">UniDigital</span>
          </div>
          <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
            <span className="menu-icon">☰</span>
          </button>
        </div>

        {/* Search Section */}
        <div className="search-section">
          <div className="search-container">
            <input 
              type="text" 
              placeholder="Search 10M+ products, categories, or AI insights..." 
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleSearchKeyPress}
            />
            <button className="search-btn" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>

        {/* User Actions - Clean without symbols */}
        <div className="user-actions">
          <div className="region-selector">
            <select 
              value={userLocation}
              onChange={(e) => setUserLocation(e.target.value)}
              className="location-dropdown"
            >
              {Object.entries(countries).map(([code, name]) => (
                <option key={code} value={code}>{name}</option>
              ))}
            </select>
          </div>

          <div className="currency-selector">
            <select 
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="currency-dropdown"
            >
              {Object.entries(currencies).map(([code, symbol]) => (
                <option key={code} value={code}>{symbol}</option>
              ))}
            </select>
          </div>

          <button className="auth-btn signin-btn" onClick={() => navigate('/auth')}>
            Sign In
          </button>

          <button className="auth-btn register-btn" onClick={() => navigate('/register')}>
            Register
          </button>

          <Link to="/cart" className="cart-btn">
            <span className="cart-icon">Cart</span>
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </Link>
        </div>
      </div>

      {/* Main Navigation - No symbols */}
      <nav className="main-nav">
        <div className="nav-container">
          <Link to="/" className="nav-link active">Home</Link>
          <Link to="/category/cars" className="nav-link">Cars</Link>
          <Link to="/category/electronics" className="nav-link">Electronics</Link>
          <Link to="/category/auto-parts" className="nav-link">Auto Parts</Link>
          <Link to="/category/smartphones" className="nav-link">Smartphones</Link>
          <Link to="/category/laptops" className="nav-link">Laptops</Link>
          <Link to="/category/gaming" className="nav-link">Gaming</Link>
          <Link to="/category/luxury-cars" className="nav-link">Luxury Cars</Link>
          <Link to="/category/electric-cars" className="nav-link">Electric Cars</Link>
          <Link to="/market-analysis" className="nav-link">Market Analysis</Link>
          <Link to="/payment" className="nav-link">Global Payments</Link>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'active' : ''}`} onClick={toggleMobileMenu}></div>
      <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
        <div className="mobile-menu-header">
          <h3>Menu</h3>
          <button className="close-menu" onClick={toggleMobileMenu}>×</button>
        </div>
        <div className="mobile-nav">
          <Link to="/" className="mobile-nav-link" onClick={toggleMobileMenu}>Home</Link>
          <Link to="/category/cars" className="mobile-nav-link" onClick={toggleMobileMenu}>Cars</Link>
          <Link to="/category/electronics" className="mobile-nav-link" onClick={toggleMobileMenu}>Electronics</Link>
          <Link to="/category/auto-parts" className="mobile-nav-link" onClick={toggleMobileMenu}>Auto Parts</Link>
          <Link to="/category/smartphones" className="mobile-nav-link" onClick={toggleMobileMenu}>Smartphones</Link>
          <Link to="/category/laptops" className="mobile-nav-link" onClick={toggleMobileMenu}>Laptops</Link>
          <Link to="/category/gaming" className="mobile-nav-link" onClick={toggleMobileMenu}>Gaming</Link>
          <Link to="/category/luxury-cars" className="mobile-nav-link" onClick={toggleMobileMenu}>Luxury Cars</Link>
          <Link to="/category/electric-cars" className="mobile-nav-link" onClick={toggleMobileMenu}>Electric Cars</Link>
          <Link to="/market-analysis" className="mobile-nav-link" onClick={toggleMobileMenu}>Market Analysis</Link>
          <Link to="/payment" className="mobile-nav-link" onClick={toggleMobileMenu}>Global Payments</Link>
        </div>
        <div className="mobile-auth">
          <button className="auth-btn register-btn">Register</button>
          <button className="auth-btn signin-btn">Sign In</button>
        </div>
      </div>
    </header>
  );
};

export default ModernHeader;