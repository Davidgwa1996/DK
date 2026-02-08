import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import ModernHeader from '../components/ModernHeader';
import ModernFooter from '../components/ModernFooter';
import ProductGrid from '../components/ProductGrid';
import { api } from '../services/api';
import './CategoryPage.css';

const CategoryPage = () => {
  const { category } = useParams();
  const location = useLocation();
  const [products, setProducts] = useState([]); // Initialize as empty array
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    sortBy: 'popular',
    condition: 'all'
  });

  const categoryInfo = {
    'cars': { title: 'Cars', icon: '🚗', description: 'New, used, and luxury cars with AI-pricing' },
    'electronics': { title: 'Electronics', icon: '📱', description: 'Latest gadgets and devices' },
    'auto-parts': { title: 'Auto Parts', icon: '🔧', description: 'Genuine and aftermarket parts' },
    'smartphones': { title: 'Smartphones', icon: '📱', description: 'Latest smartphones and accessories' },
    'laptops': { title: 'Laptops', icon: '💻', description: 'Premium laptops and workstations' },
    'gaming': { title: 'Gaming', icon: '🎮', description: 'Gaming consoles and accessories' },
    'luxury-cars': { title: 'Luxury Cars', icon: '💎', description: 'Premium luxury vehicles' },
    'electric-cars': { title: 'Electric Cars', icon: '⚡', description: 'Electric and hybrid vehicles' }
  };

  const currentCategory = categoryInfo[category] || {
    title: category?.replace('-', ' ') || 'All Products',
    icon: '📦',
    description: 'Browse our complete product catalog'
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams(location.search);
        const query = params.get('q') || '';
        
        const data = await api.getProducts({
          category,
          search: query,
          minPrice: filters.minPrice,
          maxPrice: filters.maxPrice,
          sortBy: filters.sortBy,
          condition: filters.condition
        });
        
        // Ensure products is always an array
        setProducts(data?.products || data || []);
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]); // Set to empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, location.search, filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="category-page">
      <ModernHeader />
      
      <main className="category-content">
        {/* Category Header */}
        <div className="category-header">
          <div className="category-icon">{currentCategory.icon}</div>
          <h1>{currentCategory.title}</h1>
          <p className="category-description">{currentCategory.description}</p>
          <div className="category-stats">
            <span>🎯 AI-Priced Items</span>
            <span>⚡ Live Market Data</span>
            <span>🛡️ Verified Sellers</span>
          </div>
        </div>

        {/* Filters */}
        <div className="category-filters">
          <div className="filter-group">
            <label>Price Range</label>
            <div className="price-range">
              <input
                type="number"
                name="minPrice"
                placeholder="Min"
                value={filters.minPrice}
                onChange={handleFilterChange}
              />
              <span>to</span>
              <input
                type="number"
                name="maxPrice"
                placeholder="Max"
                value={filters.maxPrice}
                onChange={handleFilterChange}
              />
            </div>
          </div>

          <div className="filter-group">
            <label>Sort By</label>
            <select name="sortBy" value={filters.sortBy} onChange={handleFilterChange}>
              <option value="popular">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest First</option>
              <option value="ai-priced">AI-Priced First</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Condition</label>
            <select name="condition" value={filters.condition} onChange={handleFilterChange}>
              <option value="all">All Conditions</option>
              <option value="new">New</option>
              <option value="used">Used</option>
              <option value="refurbished">Refurbished</option>
            </select>
          </div>

          <button className="clear-filters" onClick={() => setFilters({
            minPrice: '',
            maxPrice: '',
            sortBy: 'popular',
            condition: 'all'
          })}>
            Clear Filters
          </button>
        </div>

        {/* Products Grid */}
        <div className="products-section">
          {loading ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>Loading AI-priced products...</p>
            </div>
          ) : (
            <>
              <div className="results-info">
                <span>{products.length} products found</span>
                <span>•</span>
                <span>Prices updated in real-time</span>
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

export default CategoryPage;