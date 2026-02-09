import React, { useState, useEffect } from 'react';
import ModernHeader from '../components/ModernHeader';
import ModernFooter from '../components/ModernFooter';
import ProductGrid from '../components/ProductGrid';
import { api } from '../services/api';
import './ProductsPage.css';

const ProductsPage = () => {
  const [products, setProducts] = useState([]); // Initialize as empty array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const fetchAllProducts = async () => {
    setLoading(true);
    try {
      const data = await api.getProducts();
      setProducts(data?.products || data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="products-page">
      <ModernHeader />
      
      <main className="products-content">
        <div className="products-header">
          <h1>All Products</h1>
          <p className="products-subtitle">
            Browse our complete catalog of AI-priced cars, electronics, and accessories
          </p>
        </div>

        <div className="products-container">
          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
              <p>Loading products...</p>
            </div>
          ) : (
            <>
              <div className="products-info">
                <span>{products.length} products available</span>
                <span>•</span>
                <span>Real-time AI pricing</span>
              </div>
              <ProductGrid products={products} columns={4} />
            </>
          )}
        </div>
      </main>

      <ModernFooter />
    </div>
  );
};

export default ProductsPage;