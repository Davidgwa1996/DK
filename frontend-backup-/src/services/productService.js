import openaiService from './openaiService';

// Sample products with real image URLs
const sampleProducts = {
  automotive: [
    {
      id: 'auto1',
      name: 'Tesla Model 3 Long Range',
      category: 'automotive',
      price: 72899.00,
      originalPrice: 57052.90,
      description: 'Electric, 374 miles range, Full self-driving, Panoramic roof. AI-priced based on UK market demand.',
      stock: 5,
      aiUpdated: true,
      image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 'auto2',
      name: 'BMW 3 Series 320i M Sport',
      category: 'automotive',
      price: 18499.00,
      originalPrice: 29502.00,
      description: 'Petrol, Automatic, Low mileage, Full service history. Price adjusted for seasonality.',
      stock: 6,
      aiUpdated: true,
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 'auto3',
      name: 'Mercedes-Benz GLE 350d',
      category: 'automotive',
      price: 58399.00,
      originalPrice: 72884.00,
      description: 'Diesel, 4MATIC, AMG Line, Premium package. Real-time pricing from AutoTrader & eBay Motors.',
      stock: 6,
      aiUpdated: true,
      image: 'https://images.unsplash.com/photo-1563720223485-8d6d5c5c8c5b?auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 'auto4',
      name: 'Audi Q5 Premium Plus',
      category: 'automotive',
      price: 38999.00,
      originalPrice: 45999.00,
      description: 'Quattro AWD, Virtual Cockpit, B&O Sound. Price analyzed from 12 UK dealerships.',
      stock: 8,
      aiUpdated: true,
      image: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=500&q=80'
    }
  ],
  electronics: [
    {
      id: 'elec1',
      name: 'iPhone 15 Pro Max 256GB',
      category: 'electronics',
      price: 1399.00,
      originalPrice: 1453.00,
      description: 'Titanium, Dynamic Island, 5x optical zoom. Price updated hourly from Apple, Amazon, CEX.',
      stock: 43,
      aiUpdated: true,
      image: 'https://images.unsplash.com/photo-1695048133142-6e8d2efc8c9f?auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 'elec2',
      name: 'MacBook Pro 16" M3 Pro',
      category: 'electronics',
      price: 3399.00,
      originalPrice: 3705.00,
      description: '12-core CPU, 36GB RAM, 1TB SSD. AI-calculated based on tech market trends.',
      stock: 14,
      aiUpdated: true,
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 'elec3',
      name: 'Sony PlayStation 5 Digital',
      category: 'electronics',
      price: 699.00,
      originalPrice: 613.00,
      description: 'DualSense, 4K/120fps. Pricing based on gaming market analysis.',
      stock: 38,
      aiUpdated: true,
      image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 'elec4',
      name: 'Samsung 55" QLED 4K TV',
      category: 'electronics',
      price: 899.00,
      originalPrice: 1099.00,
      description: 'Quantum HDR, Smart TV, Gaming Mode. Real-time price tracking from 8 retailers.',
      stock: 22,
      aiUpdated: true,
      image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=500&q=80'
    }
  ]
};

class ProductService {
  async getProducts(category) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const products = sampleProducts[category] || [];
        
        // Enhance products with AI pricing
        Promise.all(
          products.map(async (product) => {
            try {
              const aiData = await openaiService.getProductPricing(product.name, category);
              return {
                ...product,
                aiData,
                priceAlert: aiData.trend === 'increasing' ? 'Price increasing' : 
                           aiData.trend === 'decreasing' ? 'Price dropping' : 'Stable price',
                confidenceScore: this.calculateConfidenceScore(product, aiData),
                lastUpdated: new Date().toISOString()
              };
            } catch (error) {
              return {
                ...product,
                aiData: openaiService.getFallbackPricing(),
                priceAlert: 'Price data unavailable',
                confidenceScore: 50,
                lastUpdated: new Date().toISOString()
              };
            }
          })
        ).then(enhancedProducts => {
          resolve(enhancedProducts);
        });
      }, 500);
    });
  }

  async getProductById(id) {
    // Search in all categories
    const allProducts = [...sampleProducts.automotive, ...sampleProducts.electronics];
    const product = allProducts.find(p => p.id === id);
    
    if (product) {
      try {
        const aiData = await openaiService.getProductPricing(product.name, product.category);
        const marketAnalysis = await openaiService.getMarketAnalysis(product.category);
        const globalAnalysis = await openaiService.getGlobalMarketAnalysis(product.category);
        
        return {
          ...product,
          aiData,
          marketAnalysis,
          globalAnalysis,
          confidenceScore: this.calculateConfidenceScore(product, aiData),
          priceHistory: this.generatePriceHistory(product.price),
          similarProducts: await this.getSimilarProducts(product),
          lastUpdated: new Date().toISOString()
        };
      } catch (error) {
        return {
          ...product,
          aiData: openaiService.getFallbackPricing(),
          marketAnalysis: 'Market analysis unavailable. Please try again later.',
          confidenceScore: 50,
          lastUpdated: new Date().toISOString()
        };
      }
    }
    
    return null;
  }

  async searchProducts(query) {
    const allProducts = [...sampleProducts.automotive, ...sampleProducts.electronics];
    const filteredProducts = allProducts.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase())
    );
    
    // Enhance search results with AI analysis
    return Promise.all(
      filteredProducts.map(async (product) => {
        try {
          const aiData = await openaiService.getProductPricing(product.name, product.category);
          return {
            ...product,
            aiData,
            searchRelevance: this.calculateSearchRelevance(product, query),
            confidenceScore: this.calculateConfidenceScore(product, aiData)
          };
        } catch (error) {
          return {
            ...product,
            aiData: openaiService.getFallbackPricing(),
            searchRelevance: this.calculateSearchRelevance(product, query),
            confidenceScore: 50
          };
        }
      })
    ).then(results => 
      results.sort((a, b) => b.searchRelevance - a.searchRelevance)
    );
  }

  async getRecommendedProducts(userId = null) {
    try {
      // If we have user data, get personalized recommendations
      const userPreferences = userId ? await this.getUserPreferences(userId) : {
        interests: ['tech', 'automotive', 'gaming'],
        recentViews: [],
        purchaseHistory: []
      };
      
      const recommendations = await openaiService.getProductRecommendations(userPreferences);
      
      // Enhance recommendations with product data
      return recommendations.map(rec => ({
        ...rec,
        id: `rec-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        category: this.detectCategory(rec.name),
        image: this.getProductImage(rec.name),
        stock: Math.floor(Math.random() * 50) + 10,
        aiUpdated: true
      }));
    } catch (error) {
      // Return fallback recommendations
      const allProducts = [...sampleProducts.automotive, ...sampleProducts.electronics];
      return allProducts
        .sort(() => Math.random() - 0.5)
        .slice(0, 4)
        .map(product => ({
          ...product,
          recommendationReason: 'Popular in your area'
        }));
    }
  }

  async getFeaturedProducts() {
    const allProducts = [...sampleProducts.automotive, ...sampleProducts.electronics];
    return allProducts
      .filter(product => product.stock > 0)
      .sort((a, b) => b.stock - a.stock)
      .slice(0, 8);
  }

  async getProductsByRegion(category, region = 'UK') {
    const products = sampleProducts[category] || [];
    
    // Enhance with region-specific pricing
    return products.map(product => ({
      ...product,
      regionPrice: this.calculateRegionalPrice(product.price, region),
      region: region,
      currency: this.getRegionCurrency(region),
      shippingInfo: this.getShippingInfo(region),
      estimatedDelivery: this.getEstimatedDelivery(region)
    }));
  }

  // Helper methods
  calculateConfidenceScore(product, aiData) {
    let score = 50; // Base score
    
    // Add points based on stock level
    if (product.stock > 20) score += 20;
    else if (product.stock > 10) score += 10;
    else if (product.stock > 5) score += 5;
    
    // Add points based on AI data quality
    if (aiData?.trend) score += 15;
    if (aiData?.priceRange) score += 15;
    if (aiData?.sources?.length > 2) score += 10;
    
    // Add points for product data completeness
    if (product.image) score += 10;
    if (product.description?.length > 50) score += 10;
    
    return Math.min(100, Math.max(0, score));
  }

  calculateSearchRelevance(product, query) {
    const queryTerms = query.toLowerCase().split(' ');
    let relevance = 0;
    
    queryTerms.forEach(term => {
      if (product.name.toLowerCase().includes(term)) relevance += 5;
      if (product.description.toLowerCase().includes(term)) relevance += 2;
      if (product.category.toLowerCase().includes(term)) relevance += 3;
    });
    
    return relevance;
  }

  generatePriceHistory(currentPrice) {
    const days = 30;
    const history = [];
    let price = currentPrice;
    
    for (let i = days; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      // Simulate price fluctuations
      const change = (Math.random() * 0.1) - 0.05; // -5% to +5%
      price = price * (1 + change);
      
      history.push({
        date: date.toISOString().split('T')[0],
        price: parseFloat(price.toFixed(2)),
        change: parseFloat((change * 100).toFixed(2))
      });
    }
    
    return history;
  }

  async getSimilarProducts(product) {
    const allProducts = [...sampleProducts.automotive, ...sampleProducts.electronics];
    return allProducts
      .filter(p => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
  }

  calculateRegionalPrice(basePrice, region) {
    const multipliers = {
      'UK': 1.0,
      'US': 1.2,  // Convert to USD approximate
      'EU': 1.15, // Convert to EUR approximate
      'China': 0.85 // Convert to CNY approximate
    };
    
    return basePrice * (multipliers[region] || 1.0);
  }

  getRegionCurrency(region) {
    const currencies = {
      'UK': 'GBP (£)',
      'US': 'USD ($)',
      'EU': 'EUR (€)',
      'China': 'CNY (¥)'
    };
    
    return currencies[region] || 'GBP (£)';
  }

  getShippingInfo(region) {
    const shipping = {
      'UK': 'Free shipping on orders over £50',
      'US': 'Free shipping on orders over $75',
      'EU': 'Shipping from £9.99',
      'China': 'Free shipping from China warehouse'
    };
    
    return shipping[region] || 'Shipping varies by location';
  }

  getEstimatedDelivery(region) {
    const delivery = {
      'UK': '2-3 business days',
      'US': '5-7 business days',
      'EU': '3-5 business days',
      'China': '7-14 business days'
    };
    
    return delivery[region] || '3-5 business days';
  }

  detectCategory(productName) {
    const name = productName.toLowerCase();
    if (name.includes('car') || name.includes('auto') || name.includes('bmw') || 
        name.includes('audi') || name.includes('mercedes') || name.includes('tesla')) {
      return 'automotive';
    }
    return 'electronics';
  }

  getProductImage(productName) {
    // Return appropriate image based on product name
    const name = productName.toLowerCase();
    
    if (name.includes('tesla')) return 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=500&q=80';
    if (name.includes('bmw')) return 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=500&q=80';
    if (name.includes('mercedes')) return 'https://images.unsplash.com/photo-1563720223485-8d6d5c5c8c5b?auto=format&fit=crop&w=500&q=80';
    if (name.includes('audi')) return 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=500&q=80';
    if (name.includes('iphone')) return 'https://images.unsplash.com/photo-1695048133142-6e8d2efc8c9f?auto=format&fit=crop&w=500&q=80';
    if (name.includes('macbook')) return 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=500&q=80';
    if (name.includes('playstation')) return 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&w=500&q=80';
    if (name.includes('samsung') || name.includes('tv')) return 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=500&q=80';
    
    // Default electronics image
    return 'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=500&q=80';
  }

  async getUserPreferences(userId) {
    // In a real app, this would fetch from your backend
    return {
      interests: ['tech', 'automotive', 'gaming'],
      recentViews: ['auto1', 'elec2'],
      purchaseHistory: ['elec1'],
      location: 'UK',
      preferredCategories: ['electronics', 'automotive']
    };
  }
}

export default new ProductService();