import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid';
import { api } from '../services/api';
import { useCart } from '../context/CartContext';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [marketData, setMarketData] = useState({
    usIndex: '+3.2%',
    ukIndex: '+2.8%',
    chinaIndex: '+4.1%',
    japanIndex: '+1.9%',
    lastUpdate: '23:08'
  });

  // Global market products data with REAL IMAGES - focusing on US, UK, China, Japan
  const globalProducts = [
    // US Market Products
    { 
      id: 1, 
      name: "Tesla Model Y Performance", 
      category: "Electric Cars", 
      price: 62990, 
      market: "US", 
      rating: 4.8, 
      stock: 12,
      image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&h=250&fit=crop&auto=format",
      description: "Dual Motor All-Wheel Drive, 3.5s 0-60 mph, 303 miles range"
    },
    { 
      id: 2, 
      name: "MacBook Pro 16\" M3 Max", 
      category: "Laptops", 
      price: 3499, 
      market: "US", 
      rating: 4.9, 
      stock: 45,
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=250&fit=crop&auto=format",
      description: "12-core CPU, 36GB RAM, 1TB SSD, Liquid Retina XDR display"
    },
    { 
      id: 3, 
      name: "iPhone 15 Pro Max 1TB", 
      category: "Smartphones", 
      price: 1599, 
      market: "US", 
      rating: 4.7, 
      stock: 89,
      image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=250&fit=crop&auto=format",
      description: "Titanium design, A17 Pro chip, 5x Telephoto, Action button"
    },
    { 
      id: 4, 
      name: "NVIDIA RTX 4090 Founders", 
      category: "PC Components", 
      price: 1599, 
      market: "US", 
      rating: 4.9, 
      stock: 14,
      image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=400&h=250&fit=crop&auto=format",
      description: "24GB GDDR6X, DLSS 3, 4K gaming at 120+ FPS"
    },
    { 
      id: 5, 
      name: "Apple Vision Pro", 
      category: "VR/AR", 
      price: 3499, 
      market: "US", 
      rating: 4.6, 
      stock: 31,
      image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=400&h=250&fit=crop&auto=format",
      description: "Spatial computing, 4K per eye, EyeSight display"
    },
    
    // UK Market Products
    { 
      id: 6, 
      name: "Range Rover Sport P550e", 
      category: "Luxury Cars", 
      price: 89000, 
      market: "UK", 
      rating: 4.6, 
      stock: 8,
      image: "https://images.unsplash.com/photo-1593941707882-a5bba5338fe2?w=400&h=250&fit=crop&auto=format",
      description: "PHEV, 542 hp, 0-60 in 4.3s, Air suspension"
    },
    { 
      id: 7, 
      name: "B&W Formation Wedge", 
      category: "Electronics", 
      price: 2499, 
      market: "UK", 
      rating: 4.5, 
      stock: 23,
      image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&h=250&fit=crop&auto=format",
      description: "Wireless hi-fi speaker, 240W, 360° sound"
    },
    { 
      id: 8, 
      name: "Alienware m18 R2", 
      category: "Gaming", 
      price: 3299, 
      market: "UK", 
      rating: 4.8, 
      stock: 17,
      image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=250&fit=crop&auto=format",
      description: "Intel Core i9-14900HX, RTX 4090, 18\" QHD+"
    },
    { 
      id: 9, 
      name: "Jaguar I-PACE", 
      category: "Electric Cars", 
      price: 69999, 
      market: "UK", 
      rating: 4.4, 
      stock: 15,
      image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=400&h=250&fit=crop&auto=format",
      description: "395 hp, 234 miles range, All-wheel drive"
    },
    
    // China Market Products
    { 
      id: 10, 
      name: "Xiaomi SU7 Max", 
      category: "Electric Cars", 
      price: 41900, 
      market: "China", 
      rating: 4.7, 
      stock: 56,
      image: "https://images.unsplash.com/photo-1617868186608-87ae5c6f422c?w=400&h=250&fit=crop&auto=format",
      description: "495 kW, 0-100 km/h in 2.78s, 800 km range"
    },
    { 
      id: 11, 
      name: "Huawei Mate 60 Pro+", 
      category: "Smartphones", 
      price: 1299, 
      market: "China", 
      rating: 4.8, 
      stock: 120,
      image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=250&fit=crop&auto=format",
      description: "Kunlun glass, HarmonyOS, Satellite calling"
    },
    { 
      id: 12, 
      name: "DJI Air 3 Fly More", 
      category: "Electronics", 
      price: 1699, 
      market: "China", 
      rating: 4.9, 
      stock: 34,
      image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400&h=250&fit=crop&auto=format",
      description: "Dual cameras, 46 min flight, 20 km range"
    },
    
    // Japan Market Products
    { 
      id: 13, 
      name: "Toyota Century SUV", 
      category: "Luxury Cars", 
      price: 170000, 
      market: "Japan", 
      rating: 4.9, 
      stock: 5,
      image: "https://images.unsplash.com/photo-1555212697-194d092e3b8f?w=400&h=250&fit=crop&auto=format",
      description: "V6 hybrid, Executive seating, Privacy glass"
    },
    { 
      id: 14, 
      name: "Sony A7RV Camera", 
      category: "Electronics", 
      price: 3899, 
      market: "Japan", 
      rating: 4.8, 
      stock: 28,
      image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=400&h=250&fit=crop&auto=format",
      description: "61MP, 8K video, AI autofocus, 5-axis stabilization"
    },
    { 
      id: 15, 
      name: "PlayStation 5 Pro", 
      category: "Gaming", 
      price: 699, 
      market: "Japan", 
      rating: 4.9, 
      stock: 67,
      image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=250&fit=crop&auto=format",
      description: "Disc Edition, 4K/120fps, Ray Tracing, 825GB SSD"
    }
  ];

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
      setFeaturedProducts(data?.products || globalProducts);
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

  const MobileMenu = () => (
    <>
      <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'active' : ''}`} 
           onClick={() => setIsMobileMenuOpen(false)} />
      <div className={`mobile-menu-panel ${isMobileMenuOpen ? 'active' : ''}`}>
        <div className="mobile-menu-header">
          <h2>Menu</h2>
          <button className="mobile-menu-close" onClick={() => setIsMobileMenuOpen(false)}>
            ✕
          </button>
        </div>
        <div className="mobile-nav-items">
          <button onClick={() => { navigate('/'); setIsMobileMenuOpen(false); }} className="mobile-nav-item">
            Home
          </button>
          <button onClick={() => { navigate('/category/cars'); setIsMobileMenuOpen(false); }} className="mobile-nav-item">
            Cars
          </button>
          <button onClick={() => { navigate('/category/electronics'); setIsMobileMenuOpen(false); }} className="mobile-nav-item">
            Electronics
          </button>
          <button onClick={() => { navigate('/category/laptops'); setIsMobileMenuOpen(false); }} className="mobile-nav-item">
            Laptops
          </button>
          <button onClick={() => { navigate('/category/smartphones'); setIsMobileMenuOpen(false); }} className="mobile-nav-item">
            Smartphones
          </button>
          <button onClick={() => { navigate('/category/gaming'); setIsMobileMenuOpen(false); }} className="mobile-nav-item">
            Gaming
          </button>
          <button onClick={() => { navigate('/category/luxury-cars'); setIsMobileMenuOpen(false); }} className="mobile-nav-item">
            Luxury Cars
          </button>
          <button onClick={() => { navigate('/category/electric-cars'); setIsMobileMenuOpen(false); }} className="mobile-nav-item">
            Electric Cars
          </button>
          <button onClick={() => { navigate('/contact'); setIsMobileMenuOpen(false); }} className="mobile-nav-item">
            Contact Us
          </button>
          <button onClick={() => { navigate('/market-analysis'); setIsMobileMenuOpen(false); }} className="mobile-nav-item">
            Market Analysis
          </button>
          <button onClick={() => { navigate('/cart'); setIsMobileMenuOpen(false); }} className="mobile-nav-item">
            View Cart
          </button>
        </div>
      </div>
    </>
  );

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Loading global marketplace...</p>
      </div>
    );
  }

  return (
    <div className="home-page">
      <MobileMenu />
      
      {/* Main Content - PRODUCTS FIRST as requested */}
      <main className="main-content">
        <div className="container">
          {/* Products Section - FIRST THING VISIBLE */}
          <section className="products-section">
            <div className="section-header">
              <h1 className="section-title">Global Marketplace Products</h1>
              <p className="section-subtitle">
                AI-priced deals from US, UK, China, and Japan markets
              </p>
            </div>
            
            <div className="products-grid">
              {globalProducts.map(product => (
                <div key={product.id} className="product-card">
                  <div className="product-image">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="product-image-real"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://via.placeholder.com/400x250/cccccc/666666?text=${encodeURIComponent(product.name)}`;
                      }}
                    />
                    <span className="product-market-badge">
                      {product.market}
                    </span>
                  </div>
                  
                  <div className="product-details">
                    <div className="product-category">{product.category}</div>
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-description">{product.description}</p>
                    
                    <div className="product-info">
                      <div className="product-rating">
                        ⭐ {product.rating}/5
                      </div>
                      <div className="product-stock" style={{
                        color: product.stock > 10 ? '#00ff9d' : '#ff9d00'
                      }}>
                        {product.stock > 10 ? 'In Stock' : 'Low Stock'}
                      </div>
                    </div>
                    
                    <div className="product-price">
                      ${product.price.toLocaleString()}
                    </div>
                    
                    <div className="product-actions">
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="add-to-cart-btn"
                      >
                        Add to Cart
                      </button>
                      <button
                        onClick={() => handleQuickView(product.id)}
                        className="view-btn"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="view-all-container">
              <button 
                onClick={() => navigate('/products')}
                className="view-all-btn"
              >
                View All Products →
              </button>
            </div>
          </section>

          {/* Market Features - BELOW PRODUCTS as requested */}
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
        </div>
      </main>

      {/* REMOVED THE FOOTER - Layout component handles it */}
    </div>
  );
};

export default HomePage;