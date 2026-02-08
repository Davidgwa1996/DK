import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ModernHeader from '../components/ModernHeader';
import ModernFooter from '../components/ModernFooter';
import { useCart } from '../context/CartContext';
import { api } from '../services/api';
import './ProductDetailPage.css';

const ProductDetailPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const data = await api.getProduct(id);
      setProduct(data);
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 2
    }).format(price);
  };

  if (loading) {
    return (
      <div className="product-detail-page">
        <ModernHeader />
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading product details...</p>
        </div>
        <ModernFooter />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-detail-page">
        <ModernHeader />
        <div className="not-found-container">
          <h2>Product not found</h2>
          <p>The product you're looking for doesn't exist or has been removed.</p>
        </div>
        <ModernFooter />
      </div>
    );
  }

  const images = product.images || [product.image || '/api/placeholder/600/400'];

  return (
    <div className="product-detail-page">
      <ModernHeader />
      
      <main className="product-detail-content">
        <div className="product-container">
          {/* Breadcrumb */}
          <div className="breadcrumb">
            <a href="/">Home</a>
            <span> / </span>
            <a href={`/category/${product.category?.toLowerCase() || 'products'}`}>
              {product.category || 'Products'}
            </a>
            <span> / </span>
            <span>{product.name}</span>
          </div>

          <div className="product-layout">
            {/* Left Column: Images */}
            <div className="product-images">
              <div className="main-image">
                <img 
                  src={images[selectedImage]} 
                  alt={product.name} 
                  onError={(e) => {
                    e.target.src = '/api/placeholder/600/400';
                  }}
                />
              </div>
              
              {images.length > 1 && (
                <div className="thumbnail-images">
                  {images.map((img, index) => (
                    <button
                      key={index}
                      className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                      onClick={() => setSelectedImage(index)}
                    >
                      <img 
                        src={img} 
                        alt={`${product.name} view ${index + 1}`}
                        onError={(e) => {
                          e.target.src = '/api/placeholder/100/100';
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Middle Column: Product Info */}
            <div className="product-info">
              {product.isAiPriced && (
                <div className="ai-priced-badge">
                  🤖 AI-PRICED • Updated 3m ago
                </div>
              )}
              
              <h1 className="product-title">{product.name}</h1>
              
              <div className="product-meta">
                <div className="rating">
                  {'★'.repeat(Math.floor(product.rating || 0))}
                  {'☆'.repeat(5 - Math.floor(product.rating || 0))}
                  <span className="rating-value">({(product.rating || 0).toFixed(1)}/5)</span>
                  <span className="review-count">• {product.reviewCount || 0} reviews</span>
                </div>
                
                <div className="sku">SKU: {product.sku || 'N/A'}</div>
              </div>

              <div className="product-price">
                <div className="current-price">{formatPrice(product.price)}</div>
                {product.originalPrice && product.originalPrice > product.price && (
                  <div className="original-price">
                    {formatPrice(product.originalPrice)}
                    <span className="discount-percent">
                      -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                    </span>
                  </div>
                )}
              </div>

              <div className="stock-info">
                <span className={`stock-status ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                  {product.stock > 0 ? `In Stock: ${product.stock} units` : 'Out of Stock'}
                </span>
                <span className="location">📍 {product.location || 'UK Stock'}</span>
              </div>

              <div className="product-description">
                <h3>Description</h3>
                <p>{product.description || 'No description available.'}</p>
              </div>

              <div className="product-specs">
                <h3>Specifications</h3>
                <ul>
                  {product.specifications?.map((spec, index) => (
                    <li key={index}>
                      <strong>{spec.key}:</strong> {spec.value}
                    </li>
                  )) || (
                    <li>No specifications available</li>
                  )}
                </ul>
              </div>
            </div>

            {/* Right Column: Purchase Box */}
            <div className="purchase-box">
              <div className="purchase-card">
                <h3>Purchase Options</h3>
                
                <div className="quantity-selector">
                  <label>Quantity:</label>
                  <div className="quantity-controls">
                    <button 
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      disabled={quantity <= 1}
                    >
                      −
                    </button>
                    <input 
                      type="number" 
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      min="1"
                      max={product.stock}
                    />
                    <button 
                      onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                      disabled={quantity >= product.stock}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="total-price">
                  <span>Total:</span>
                  <span className="price">{formatPrice(product.price * quantity)}</span>
                </div>

                <button 
                  className="add-to-cart-btn"
                  onClick={() => addToCart(product, quantity)}
                  disabled={product.stock === 0}
                >
                  🛒 Add to Cart ({quantity})
                </button>

                <button className="buy-now-btn" disabled={product.stock === 0}>
                  ⚡ Buy Now
                </button>

                <div className="delivery-info">
                  <h4>🚚 Delivery</h4>
                  <p>Free UK delivery • 2-3 business days</p>
                  <p>International shipping available</p>
                </div>

                <div className="guarantee-info">
                  <h4>🛡️ Guarantee</h4>
                  <p>30-day money back guarantee</p>
                  <p>2-year warranty included</p>
                </div>

                <div className="ai-features">
                  <button className="ai-analysis-btn">
                    📊 View AI Market Analysis
                  </button>
                  <button className="price-alert-btn">
                    🔔 Set Price Alert
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <ModernFooter />
    </div>
  );
};

export default ProductDetailPage;