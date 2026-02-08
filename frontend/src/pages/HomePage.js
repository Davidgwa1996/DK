import React, { useState, useEffect } from 'react';
// REMOVE THESE IMPORTS:
// import ModernHeader from './ModernHeader';
// import ModernFooter from './ModernFooter';
import ProductGrid from '../components/ProductGrid'; // FIXED PATH: Add '../' to go up one level
import { api } from '../services/api';
import './HomePage.css';

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [marketData, setMarketData] = useState({
    carIndex: '+2.2%',
    electronics: '+1.5%',
    evDemand: '+20%',
    lastUpdate: '23:08'
  });

  useEffect(() => {
    fetchFeaturedProducts();
    updateMarketTime();
    
    // Update time every minute
    const timeInterval = setInterval(updateMarketTime, 60000);
    
    // Simulate market updates
    const marketInterval = setInterval(simulateMarketUpdates, 15000);
    
    return () => {
      clearInterval(timeInterval);
      clearInterval(marketInterval);
    };
  }, []);

  const updateMarketTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    setMarketData(prev => ({
      ...prev,
      lastUpdate: `${hours}:${minutes}`
    }));
  };

  const simulateMarketUpdates = () => {
    const carChange = (Math.random() * 0.4 - 0.2).toFixed(1);
    const electronicsChange = (Math.random() * 0.3 - 0.15).toFixed(1);
    
    setMarketData(prev => ({
      ...prev,
      carIndex: (parseFloat(prev.carIndex) + parseFloat(carChange)).toFixed(1) + '%',
      electronics: (parseFloat(prev.electronics) + parseFloat(electronicsChange)).toFixed(1) + '%'
    }));
  };

  const fetchFeaturedProducts = async () => {
    setLoading(true);
    try {
      const data = await api.getProducts({ featured: true, limit: 6 });
      setFeaturedProducts(data?.products || data || getSampleProducts());
    } catch (error) {
      console.error('Error fetching featured products:', error);
      setFeaturedProducts(getSampleProducts());
    } finally {
      setLoading(false);
    }
  };

  const getSampleProducts = () => {
    return [
      {
        id: 1,
        name: 'MacBook Pro 16" M3 Pro',
        category: 'Laptops',
        price: 2499,
        originalPrice: 2799,
        rating: 4.9,
        description: '12-core CPU, 36GB RAM, 1TB SSD. AI-calculated based on tech demand...',
        stock: 29,
        location: 'UK Stock',
        isNew: true,
        isAiPriced: true,
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop'
      },
      {
        id: 2,
        name: 'Sony PlayStation 5',
        category: 'Gaming',
        price: 449,
        rating: 4.8,
        description: 'Disc Edition, 4K/120Hz. Dynamic pricing based on gaming season...',
        stock: 16,
        location: 'Manchester',
        isAiPriced: true,
        image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w-400&h=300&fit=crop'
      },
      {
        id: 3,
        name: 'Bose QuietComfort Ultra',
        category: 'Audio',
        price: 429,
        rating: 4.7,
        description: 'Noise cancelling, Spatial Audio, Price optimized using competitor analysis...',
        stock: 36,
        location: 'London',
        isAiPriced: true,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop'
      },
      {
        id: 4,
        name: 'Tesla Model 3',
        category: 'Electric Cars',
        price: 42999,
        rating: 4.9,
        description: 'Long Range AWD, 374 miles range. AI-priced based on EV demand...',
        stock: 8,
        location: 'Birmingham',
        isRefurbished: true,
        isAiPriced: true,
        image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&h=300&fit=crop'
      },
      {
        id: 5,
        name: 'Samsung QLED 4K TV',
        category: 'TVs',
        price: 1299,
        originalPrice: 1599,
        rating: 4.5,
        description: '75" Smart TV with Quantum HDR. Price tracking shows 23.1% drop...',
        stock: 42,
        location: 'Liverpool',
        discount: 23,
        isAiPriced: true,
        image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=300&fit=crop'
      },
      {
        id: 6,
        name: 'iPhone 15 Pro Max',
        category: 'Smartphones',
        price: 1199,
        rating: 4.8,
        description: 'Titanium design, A17 Pro chip. Market analysis shows stable pricing...',
        stock: 57,
        location: 'Edinburgh',
        isNew: true,
        image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=300&fit=crop'
      }
    ];
  };

  const promoCards = [
    {
      badge: 'AI-PRICED',
      title: 'AI-Priced Deals',
      description: 'Exclusive deals priced by our AI algorithms for maximum value.'
    },
    {
      badge: 'TRENDING',
      title: 'Trending Now',
      description: 'See what\'s hot in the market right now based on real-time data.'
    },
    {
      badge: 'FLASH SALE',
      title: 'Flash Deals',
      description: 'Limited-time offers with the best discounts available.'
    },
    {
      badge: 'SEASONAL',
      title: 'Summer Sale',
      description: 'Special summer discounts across all product categories.'
    }
  ];

  const handlePromoClick = (title) => {
    alert(`Navigating to: ${title}`);
  };

  return (
    <div className="home-page">
      {/* Market Data Section */}
      <div className="market-data">
        <div className="data-item">
          <span className="data-label">Car Index</span>
          <span className={`data-value ${marketData.carIndex.includes('+') ? 'positive' : 'negative'}`}>
            {marketData.carIndex}
          </span>
        </div>
        <div className="data-item">
          <span className="data-label">Electronics</span>
          <span className={`data-value ${marketData.electronics.includes('+') ? 'positive' : 'negative'}`}>
            {marketData.electronics}
          </span>
        </div>
        <div className="data-item">
          <span className="data-label">EV Demand</span>
          <span className="data-value positive">
            {marketData.evDemand}
          </span>
        </div>
        <div className="update-time">
          Last Update: {marketData.lastUpdate}
        </div>
      </div>

      <main className="main-content">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <h1 className="page-title">AI-Priced Classic Cars</h1>
            <p className="hero-description">
              Discover the world's largest marketplace powered by AI-driven pricing algorithms. 
              Get real-time market data and the best deals on classic cars, electronics, auto parts, and more.
            </p>
            <div className="hero-buttons">
              <button className="primary-btn">Browse All Products →</button>
              <button className="secondary-btn">Sell Your Item</button>
            </div>
          </div>
        </section>

        {/* Promo Cards Section */}
        <section className="promo-section">
          <h2 className="section-title">Featured Deals</h2>
          <div className="promo-grid">
            {promoCards.map((card, index) => (
              <div 
                key={index} 
                className="promo-card" 
                onClick={() => handlePromoClick(card.title)}
              >
                <span className="badge">{card.badge}</span>
                <h3 className="promo-title">{card.title}</h3>
                <p className="promo-desc">{card.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* AI Stats Section */}
        <section className="ai-stats-section">
          <div className="stats-header">
            <h2>Real-Time UK Market Prices</h2>
            <p className="stats-subtitle">
              Prices calculated using AI algorithms analyzing Auto Trader, eBay, 
              Currys, and major UK retailer data. Updated every 5 minutes.
            </p>
          </div>
          
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-value">98.7%</div>
              <div className="stat-label">AI prediction rate</div>
            </div>
            <div className="stat-card">
              <div className="stat-value trending-up">+4.6%</div>
              <div className="stat-label">Car Market Index</div>
            </div>
            <div className="stat-card">
              <div className="stat-value trending-up">+1.1%</div>
              <div className="stat-label">Electronics Index</div>
            </div>
            <div className="stat-card">
              <div className="stat-value trending-up">+20%</div>
              <div className="stat-label">EV Demand</div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section">
          <div className="feature-card">
            <div className="feature-icon">🤖</div>
            <h3>Real-Time AI Pricing</h3>
            <p>Prices updated every 5 minutes based on market trends</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">✅</div>
            <h3>Verified Sellers</h3>
            <p>All sellers are verified with background checks</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🚚</div>
            <h3>Instant Delivery</h3>
            <p>Fast shipping across the UK with tracking</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💯</div>
            <h3>Money Back Guarantee</h3>
            <p>30-day return policy on all purchases</p>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="ai-products-section">
          <div className="section-header">
            <h2>AI-PRICED DEALS</h2>
            <span className="update-badge">Updated 3m ago</span>
          </div>
          
          {loading ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>Loading featured products...</p>
            </div>
          ) : (
            <ProductGrid products={featuredProducts} columns={3} />
          )}
        </section>
      </main>
    </div>
  );
};

export default HomePage;