import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import ProductGrid from '../components/ProductGrid';
import { api } from '../services/api';
import { useCart } from '../context/CartContext';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [marketData, setMarketData] = useState({
    usIndex: '+3.2%',
    ukIndex: '+2.8%',
    chinaIndex: '+4.1%',
    japanIndex: '+1.9%',
    lastUpdate: '23:08'
  });

  // Global market products data with REAL IMAGES and AI PRICING (fallback)
  const globalProducts = [
    // ... (your existing globalProducts array – unchanged)
    // (I've omitted the long array here for brevity; keep it exactly as you have it)
  ];

  useEffect(() => {
    fetchFeaturedProducts();
    updateMarketTime();
    
    const timeInterval = setInterval(updateMarketTime, 60000);
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
    setMarketData(prev => ({ ...prev, lastUpdate: `${hours}:${minutes}` }));
  };

  const simulateMarketUpdates = () => {
    const changes = {
      usIndex: (Math.random() * 0.4 - 0.2).toFixed(1),
      ukIndex: (Math.random() * 0.4 - 0.2).toFixed(1),
      chinaIndex: (Math.random() * 0.5 - 0.25).toFixed(1),
      japanIndex: (Math.random() * 0.3 - 0.15).toFixed(1)
    };
    
    setMarketData(prev => ({
      ...prev,
      usIndex: (parseFloat(prev.usIndex) + parseFloat(changes.usIndex)).toFixed(1) + '%',
      ukIndex: (parseFloat(prev.ukIndex) + parseFloat(changes.ukIndex)).toFixed(1) + '%',
      chinaIndex: (parseFloat(prev.chinaIndex) + parseFloat(changes.chinaIndex)).toFixed(1) + '%',
      japanIndex: (parseFloat(prev.japanIndex) + parseFloat(changes.japanIndex)).toFixed(1) + '%'
    }));
  };

  const fetchFeaturedProducts = async () => {
    setLoading(true);
    try {
      const data = await api.getProducts({ featured: true, limit: 15 });
      // ✅ Only use API data if it actually contains products
      if (data?.products && data.products.length > 0) {
        setFeaturedProducts(data.products);
      } else {
        console.log('API returned no products – using globalProducts fallback');
        setFeaturedProducts(globalProducts);
      }
    } catch (error) {
      console.error('Error fetching featured products:', error);
      setFeaturedProducts(globalProducts);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      category: product.category,
      market: product.market,
      image: product.image,
      description: product.description
    });
    navigate('/cart');
  };

  const handleQuickView = (productId) => {
    navigate(`/product/${productId}`);
  };

  if (loading) {
    return (
      <Layout isHomePage={true}>
        <div className="loading-screen">
          <div className="loading-spinner"></div>
          <p>Loading global marketplace...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout isHomePage={true}>
      {/* Hero Section */}
      <div className="home-hero">
        <h1>Global Marketplace Products</h1>
        <p>AI-priced deals from US, UK, China, and Japan markets</p>
      </div>
      
      {/* Main Products Grid – NOW USING featuredProducts STATE */}
      <section className="products-section">
        <div className="section-header">
          <h2 className="section-title">Featured Global Products</h2>
          <p className="section-subtitle">
            Curated selection from verified international sellers • AI-powered dynamic pricing
          </p>
        </div>
        
        <ProductGrid products={featuredProducts} columns={3} />
        
        <div className="view-all-container">
          <button 
            onClick={() => navigate('/products')}
            className="view-all-btn"
          >
            View All Products →
          </button>
        </div>
      </section>

      {/* Market Features */}
      <section className="market-features">
        <div className="section-header">
          <h2 className="section-title">Market Intelligence Features</h2>
          <p className="section-subtitle">
            Powered by AI for optimal pricing and insights
          </p>
        </div>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📈</div>
            <h3 className="feature-title">Live Market Indicator</h3>
            <p className="feature-description">
              Real-time pricing trends across US, UK, China, Japan markets
            </p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🤖</div>
            <h3 className="feature-title">AI-Priced Classic Cars</h3>
            <p className="feature-description">
              Machine learning algorithms determine fair market value
            </p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3 className="feature-title">Real-Time Market Prices</h3>
            <p className="feature-description">
              Updated prices reflecting current market conditions
            </p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🏷️</div>
            <h3 className="feature-title">Featured Deals</h3>
            <p className="feature-description">
              Curated best-value products from global markets
            </p>
          </div>
        </div>
      </section>

      {/* Global Market Data */}
      <section className="market-data-section">
        <div className="section-header">
          <h2 className="section-title">Global Market Indices</h2>
          <p className="update-time">Updated: {marketData.lastUpdate}</p>
        </div>
        
        <div className="market-indices">
          <div className="market-index">
            <span className="market-flag">🇺🇸</span>
            <span className="market-name">US Market</span>
            <span className={`market-value ${marketData.usIndex.includes('+') ? 'positive' : 'negative'}`}>
              {marketData.usIndex}
            </span>
          </div>
          <div className="market-index">
            <span className="market-flag">🇬🇧</span>
            <span className="market-name">UK Market</span>
            <span className={`market-value ${marketData.ukIndex.includes('+') ? 'positive' : 'negative'}`}>
              {marketData.ukIndex}
            </span>
          </div>
          <div className="market-index">
            <span className="market-flag">🇨🇳</span>
            <span className="market-name">China Market</span>
            <span className={`market-value ${marketData.chinaIndex.includes('+') ? 'positive' : 'negative'}`}>
              {marketData.chinaIndex}
            </span>
          </div>
          <div className="market-index">
            <span className="market-flag">🇯🇵</span>
            <span className="market-name">Japan Market</span>
            <span className={`market-value ${marketData.japanIndex.includes('+') ? 'positive' : 'negative'}`}>
              {marketData.japanIndex}
            </span>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;