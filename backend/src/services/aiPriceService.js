const axios = require('axios');
const logger = require('../utils/logger');
const redisClient = require('../config/redis');

class AIPriceService {
  constructor() {
    this.apiKey = process.env.AI_PRICE_API_KEY;
    this.baseURL = process.env.AI_PRICE_API_URL || 'https://api.unidigital.ai/pricing';
    this.cacheTTL = 300; // 5 minutes
  }

  /**
   * Calculate AI price for a product
   * @param {Object} product - Product object
   * @returns {Promise<Object>} AI price data
   */
  async calculateProductPrice(product) {
    try {
      const cacheKey = `ai:price:${product.id}`;
      const cachedPrice = await redisClient.get(cacheKey);
      
      if (cachedPrice) {
        return JSON.parse(cachedPrice);
      }

      // Prepare data for AI analysis
      const productData = {
        title: product.title,
        description: product.description,
        category: product.category?.name,
        brand: product.brand,
        model: product.model,
        year: product.year,
        condition: product.condition,
        mileage: product.mileage,
        location: product.location?.city,
        specifications: product.specifications,
        market_sources: [
          'auto_trader',
          'ebay',
          'currys',
          'argos',
          'john_lewis',
          'amazon',
        ],
      };

      // Call AI pricing API
      const response = await axios.post(
        `${this.baseURL}/calculate`,
        productData,
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
          timeout: 10000, // 10 second timeout
        }
      );

      if (response.data && response.data.success) {
        const aiPriceData = {
          price: response.data.recommended_price,
          accuracy: response.data.confidence_score,
          market_average: response.data.market_average,
          price_range: response.data.price_range,
          factors: response.data.factors,
          last_updated: new Date(),
          sources: response.data.sources,
        };

        // Cache the result
        await redisClient.setEx(
          cacheKey,
          this.cacheTTL,
          JSON.stringify(aiPriceData)
        );

        return aiPriceData;
      }

      throw new Error('AI price calculation failed');
    } catch (error) {
      logger.error('AI price calculation error:', error);
      
      // Fallback to rule-based pricing
      return this.calculateFallbackPrice(product);
    }
  }

  /**
   * Fallback price calculation when AI service fails
   */
  calculateFallbackPrice(product) {
    let basePrice = parseFloat(product.price);
    let confidence = 85; // Base confidence for fallback
    
    // Apply depreciation for used items
    if (product.condition === 'used') {
      const age = new Date().getFullYear() - (product.year || new Date().getFullYear());
      const depreciation = Math.min(age * 0.15, 0.7); // Max 70% depreciation
      basePrice *= (1 - depreciation);
      confidence -= 10;
    } else if (product.condition === 'refurbished') {
      basePrice *= 0.8; // 20% discount for refurbished
      confidence -= 5;
    } else if (product.condition === 'nearly-new') {
      basePrice *= 0.9; // 10% discount for nearly new
    }

    // Adjust based on mileage (for vehicles)
    if (product.mileage && product.category?.name?.toLowerCase().includes('car')) {
      const mileageFactor = Math.min(product.mileage / 100000, 0.5);
      basePrice *= (1 - mileageFactor);
      confidence -= mileageFactor * 10;
    }

    // Apply brand premium/discount
    const brandFactors = {
      'mercedes-benz': 1.2,
      'bmw': 1.15,
      'audi': 1.1,
      'apple': 1.25,
      'samsung': 1.1,
      'sony': 1.05,
    };

    if (product.brand && brandFactors[product.brand.toLowerCase()]) {
      basePrice *= brandFactors[product.brand.toLowerCase()];
    }

    return {
      price: Math.round(basePrice * 100) / 100,
      accuracy: Math.max(confidence, 70),
      market_average: null,
      price_range: {
        min: Math.round(basePrice * 0.8 * 100) / 100,
        max: Math.round(basePrice * 1.2 * 100) / 100,
      },
      factors: ['condition', 'age', 'brand'],
      last_updated: new Date(),
      sources: ['fallback_calculation'],
    };
  }

  /**
   * Get market trends for dashboard
   */
  async getMarketTrends() {
    try {
      const cacheKey = 'ai:market:trends';
      const cachedTrends = await redisClient.get(cacheKey);
      
      if (cachedTrends) {
        return JSON.parse(cachedTrends);
      }

      const response = await axios.get(`${this.baseURL}/trends`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
        },
        params: {
          country: 'UK',
          period: '24h',
        },
      });

      if (response.data.success) {
        const trends = {
          car_market_index: response.data.car_index || 0,
          electronics_index: response.data.electronics_index || 0,
          ev_demand: response.data.ev_demand || 0,
          price_accuracy: response.data.accuracy || 0,
          top_gainers: response.data.top_gainers || [],
          top_losers: response.data.top_losers || [],
          updated_at: new Date(),
        };

        // Cache for 5 minutes
        await redisClient.setEx(cacheKey, 300, JSON.stringify(trends));
        
        return trends;
      }

      // Return default trends if API fails
      return this.getDefaultTrends();
    } catch (error) {
      logger.error('Get market trends error:', error);
      return this.getDefaultTrends();
    }
  }

  getDefaultTrends() {
    return {
      car_market_index: 2.1,
      electronics_index: 1.2,
      ev_demand: 21,
      price_accuracy: 98.7,
      top_gainers: [
        { category: 'Electric Cars', change: 3.2 },
        { category: 'Gaming Consoles', change: 2.8 },
        { category: 'Smartphones', change: 1.5 },
      ],
      top_losers: [
        { category: 'Used Diesel Cars', change: -1.2 },
        { category: 'Tablets', change: -0.8 },
      ],
      updated_at: new Date(),
    };
  }

  /**
   * Batch calculate prices for multiple products
   */
  async batchCalculatePrices(products) {
    try {
      const productIds = products.map(p => p.id);
      const batchData = products.map(product => ({
        id: product.id,
        title: product.title,
        category: product.category,
        condition: product.condition,
        current_price: product.price,
      }));

      const response = await axios.post(
        `${this.baseURL}/batch`,
        { products: batchData },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.success) {
        const results = {};
        
        response.data.results.forEach((result, index) => {
          const cacheKey = `ai:price:${productIds[index]}`;
          redisClient.setEx(
            cacheKey,
            this.cacheTTL,
            JSON.stringify(result)
          );
          
          results[productIds[index]] = result;
        });

        return results;
      }

      return {};
    } catch (error) {
      logger.error('Batch price calculation error:', error);
      return {};
    }
  }

  /**
   * Train AI model with new data
   */
  async trainModel(trainingData) {
    try {
      const response = await axios.post(
        `${this.baseURL}/train`,
        trainingData,
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data;
    } catch (error) {
      logger.error('AI model training error:', error);
      throw error;
    }
  }

  /**
   * Validate if a price is reasonable
   */
  async validatePrice(product, price) {
    try {
      const aiPrice = await this.calculateProductPrice(product);
      
      const priceDiff = Math.abs(price - aiPrice.price);
      const priceDiffPercentage = (priceDiff / aiPrice.price) * 100;
      
      return {
        is_reasonable: priceDiffPercentage <= 30, // Within 30% of AI price
        suggested_price: aiPrice.price,
        difference_percentage: priceDiffPercentage,
        confidence: aiPrice.accuracy,
        recommendation: priceDiffPercentage > 30 ? 'adjust_price' : 'price_ok',
        market_range: aiPrice.price_range,
      };
    } catch (error) {
      logger.error('Price validation error:', error);
      return {
        is_reasonable: true,
        suggested_price: price,
        difference_percentage: 0,
        confidence: 70,
        recommendation: 'price_ok',
        market_range: { min: price * 0.7, max: price * 1.3 },
      };
    }
  }
}

module.exports = new AIPriceService();