const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://api.unidigital.com/v1';

// Helper function for API calls
const fetchAPI = async (endpoint, options = {}) => {
  const token = localStorage.getItem('auth_token');
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...options.headers
    }
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...defaultOptions,
      ...options
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Request Failed:', error);
    throw error;
  }
};

export const api = {
  // Products
  getProducts: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return fetchAPI(`/products?${queryString}`);
  },

  getProduct: async (id) => {
    return fetchAPI(`/products/${id}`);
  },

  // Categories
  getCategories: async () => {
    return fetchAPI('/categories');
  },

  // Market Data
  getMarketData: async (country = 'GB') => {
    return fetchAPI(`/market/trends?country=${country}`);
  },

  // AI Pricing (Integrated)
  getAiPricing: async (productId) => {
    return fetchAPI(`/ai/pricing/${productId}`);
  },

  // Search Suggestions
  getSearchSuggestions: async (query) => {
    return fetchAPI(`/search/suggestions?q=${encodeURIComponent(query)}`);
  },

  // User & Auth
  login: async (email, password) => {
    return fetchAPI('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
  },

  register: async (userData) => {
    return fetchAPI('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  },

  // Cart
  syncCart: async (cartItems) => {
    return fetchAPI('/cart/sync', {
      method: 'POST',
      body: JSON.stringify({ items: cartItems })
    });
  },

  // Checkout
  createOrder: async (orderData) => {
    return fetchAPI('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData)
    });
  },

  // Shipping
  calculateShipping: async (address, items) => {
    return fetchAPI('/shipping/calculate', {
      method: 'POST',
      body: JSON.stringify({ address, items })
    });
  },

  // Payment
  createPaymentIntent: async (paymentData) => {
    return fetchAPI('/payments/intent', {
      method: 'POST',
      body: JSON.stringify(paymentData)
    });
  },

  // Analytics
  getAnalytics: async (timeframe = '7d') => {
    return fetchAPI(`/analytics?timeframe=${timeframe}`);
  }
};