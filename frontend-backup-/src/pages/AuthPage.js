import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ModernHeader from '../components/ModernHeader';
import ModernFooter from '../components/ModernFooter';
import { api } from '../services/api';
import './AuthPage.css';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (isLogin) {
        // Login
        const response = await api.login(email, password);
        localStorage.setItem('auth_token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        setSuccess('Login successful!');
        setTimeout(() => navigate('/'), 1500);
      } else {
        // Register
        const response = await api.register({ name, email, password });
        setSuccess('Registration successful! Please login.');
        setIsLogin(true);
      }
    } catch (err) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    // Google OAuth implementation
    setError('Google login will be implemented soon.');
  };

  const handleAppleLogin = () => {
    // Apple OAuth implementation
    setError('Apple login will be implemented soon.');
  };

  return (
    <div className="auth-page">
      <ModernHeader />
      
      <main className="auth-content">
        <div className="auth-container">
          {/* Left Column: Info */}
          <div className="auth-info">
            <div className="auth-logo">UD</div>
            <h1>Welcome to UniDigital</h1>
            <p className="auth-subtitle">
              Join the global marketplace for AI-priced cars and electronics
            </p>
            
            <div className="auth-features">
              <div className="feature">
                <span className="feature-icon">🤖</span>
                <div className="feature-content">
                  <strong>AI-Powered Pricing</strong>
                  <p>Real-time market analysis for the best prices</p>
                </div>
              </div>
              
              <div className="feature">
                <span className="feature-icon">🌍</span>
                <div className="feature-content">
                  <strong>Global Marketplace</strong>
                  <p>Shop from verified sellers worldwide</p>
                </div>
              </div>
              
              <div className="feature">
                <span className="feature-icon">🛡️</span>
                <div className="feature-content">
                  <strong>Secure Transactions</strong>
                  <p>Protected payments and buyer guarantees</p>
                </div>
              </div>
              
              <div className="feature">
                <span className="feature-icon">🚚</span>
                <div className="feature-content">
                  <strong>Fast Shipping</strong>
                  <p>International delivery with tracking</p>
                </div>
              </div>
            </div>
            
            <div className="auth-stats">
              <div className="stat">
                <strong>50K+</strong>
                <span>Products</span>
              </div>
              <div className="stat">
                <strong>98.7%</strong>
                <span>AI Accuracy</span>
              </div>
              <div className="stat">
                <strong>24/7</strong>
                <span>Support</span>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="auth-form-container">
            <div className="auth-form-header">
              <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
              <p>{isLogin ? 'Sign in to your account' : 'Join our global marketplace'}</p>
            </div>

            {/* OAuth Buttons */}
            <div className="oauth-buttons">
              <button 
                type="button" 
                className="oauth-btn google-btn"
                onClick={handleGoogleLogin}
              >
                <span className="oauth-icon">G</span>
                Continue with Google
              </button>
              <button 
                type="button" 
                className="oauth-btn apple-btn"
                onClick={handleAppleLogin}
              >
                <span className="oauth-icon">🍎</span>
                Continue with Apple
              </button>
            </div>

            <div className="divider">
              <span>or</span>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="auth-form">
              {error && (
                <div className="alert alert-error">
                  ⚠️ {error}
                </div>
              )}
              
              {success && (
                <div className="alert alert-success">
                  ✅ {success}
                </div>
              )}

              {!isLogin && (
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    required
                    disabled={loading}
                  />
                </div>
              )}

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  disabled={loading}
                />
                {isLogin && (
                  <Link to="/forgot-password" className="forgot-password">
                    Forgot password?
                  </Link>
                )}
              </div>

              {!isLogin && (
                <div className="form-group checkbox-group">
                  <input type="checkbox" id="terms" required />
                  <label htmlFor="terms">
                    I agree to the <Link to="/terms">Terms of Service</Link> and{' '}
                    <Link to="/privacy">Privacy Policy</Link>
                  </label>
                </div>
              )}

              <button 
                type="submit" 
                className="auth-submit-btn"
                disabled={loading}
              >
                {loading ? (
                  <span className="loading-spinner"></span>
                ) : (
                  isLogin ? 'Sign In' : 'Create Account'
                )}
              </button>
            </form>

            {/* Toggle */}
            <div className="auth-toggle">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button 
                type="button" 
                className="toggle-btn"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError('');
                  setSuccess('');
                }}
                disabled={loading}
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </div>

            {/* Additional Links */}
            <div className="auth-links">
              <Link to="/">← Back to Home</Link>
              <Link to="/contact">Need Help?</Link>
            </div>
          </div>
        </div>
      </main>

      <ModernFooter />
    </div>
  );
};

export default AuthPage;