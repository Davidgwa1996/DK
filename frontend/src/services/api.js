// ============================================
// UNIDIGITAL MARKETPLACE - API SERVICE
// Production-ready for Render
// ============================================

// Base URL – from environment, with local fallback for development
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Simple in‑memory cache (only for GET requests that rarely change)
const cache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

const getCached = (key) => {
  const entry = cache.get(key);
  if (entry && Date.now() - entry.timestamp < CACHE_TTL) {
    return entry.data;
  }
  return null;
};

const setCached = (key, data) => {
  cache.set(key, { data, timestamp: Date.now() });
};

// Core request function with auth, market header, and error handling
const request = async (endpoint, options = {}) => {
  const token = localStorage.getItem('auth_token');
  const market = localStorage.getItem('user_market') || 'US';

  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'X-Market': market,
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const config = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    // Handle 401 Unauthorized – clear session and redirect to login
    if (response.status === 401) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_market');
      window.location.href = '/login';
      throw new Error('Session expired. Please log in again.');
    }

    // Handle 429 Too Many Requests – simple retry with delay
    if (response.status === 429) {
      const retryAfter = response.headers.get('Retry-After') || 5;
      console.warn(`Rate limited. Retrying in ${retryAfter}s...`);
      await new Promise((resolve) => setTimeout(resolve, retryAfter * 1000));
      return request(endpoint, options); // one retry
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);

    // User‑friendly network error
    if (error.message === 'Failed to fetch') {
      throw new Error('Network error. Please check your internet connection.');
    }
    throw error;
  }
};

// ------------------------------------------------------------------
// PUBLIC API
// ------------------------------------------------------------------
export const api = {
  // 🔐 AUTHENTICATION
  login: (email, password, market = 'US') =>
    request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password, market }),
    }).then((res) => {
      if (res.token) {
        localStorage.setItem('auth_token', res.token);
        localStorage.setItem('user_market', market);
      }
      return res;
    }),

  register: (userData) =>
    request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    }).then((res) => {
      if (res.token) {
        localStorage.setItem('auth_token', res.token);
        localStorage.setItem('user_market', userData.market || 'US');
      }
      return res;
    }),

  logout: () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_market');
    return request('/auth/logout', { method: 'POST' }).catch(() => {});
  },

  getProfile: () => request('/auth/me'),
  updateProfile: (data) => request('/auth/update-profile', { method: 'PUT', body: JSON.stringify(data) }),
  changePassword: (data) => request('/auth/change-password', { method: 'PUT', body: JSON.stringify(data) }),

  // 📦 PRODUCTS & CATEGORIES
  getProducts: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const cacheKey = `products_${query}`;
    const cached = getCached(cacheKey);
    if (cached) return Promise.resolve(cached);

    return request(`/products?${query}`).then((data) => {
      setCached(cacheKey, data);
      return data;
    });
  },

  getProduct: (id) => {
    const cacheKey = `product_${id}`;
    const cached = getCached(cacheKey);
    if (cached) return Promise.resolve(cached);

    return request(`/products/${id}`).then((data) => {
      setCached(cacheKey, data);
      return data;
    });
  },

  getCategories: () => {
    const cacheKey = 'categories';
    const cached = getCached(cacheKey);
    if (cached) return Promise.resolve(cached);

    return request('/categories').then((data) => {
      setCached(cacheKey, data);
      return data;
    });
  },

  // 🤖 AI PRICING
  getAiPricing: (productId, market = null) => {
    const query = market ? `?market=${market}` : '';
    return request(`/ai/pricing/${productId}${query}`);
  },

  // 🔍 SEARCH
  searchProducts: (filters) =>
    request('/search/products', {
      method: 'POST',
      body: JSON.stringify(filters),
    }),

  // 🛒 CART
  getCart: () => request('/cart'),
  syncCart: (items) =>
    request('/cart/sync', {
      method: 'POST',
      body: JSON.stringify({ items }),
    }),

  // 💳 PAYMENTS (PayPal only – Stripe removed for simplicity)
  createPayPalOrder: (orderData) =>
    request('/payments/paypal/create', {
      method: 'POST',
      body: JSON.stringify(orderData),
    }),

  capturePayPalOrder: (orderId) =>
    request(`/payments/paypal/capture/${orderId}`, { method: 'POST' }),

  // 📊 MARKET DATA
  getMarketIndicators: () => request('/market/indicators/live'),

  // 🎁 FEATURED DEALS (AI‑curated)
  getFeaturedDeals: (market = 'US', limit = 10) =>
    request(`/deals/featured?market=${market}&limit=${limit}`),

  // 🛠️ UTILITY
  clearCache: () => cache.clear(),
};

// ------------------------------------------------------------------
// EXPORT REQUEST FUNCTION FOR CUSTOM CALLS
// ------------------------------------------------------------------
export default request;