// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CartProvider } from './context/CartContext';
import { Toaster } from 'react-hot-toast';

// Simple Error Fallback Component (without react-error-boundary)
function ErrorFallback({ error, resetError }) {
  return (
    <div className="error-boundary" style={styles.errorBoundary}>
      <div className="error-container" style={styles.errorContainer}>
        <div className="error-icon" style={styles.errorIcon}>⚠️</div>
        <h2 style={styles.errorTitle}>Something went wrong</h2>
        <p className="error-message" style={styles.errorMessage}>
          {error?.message || 'An unexpected error occurred'}
        </p>
        <div className="error-actions" style={styles.errorActions}>
          <button onClick={resetError} className="retry-btn" style={styles.retryBtn}>
            ↻ Try Again
          </button>
          <button 
            onClick={() => window.location.href = '/'} 
            className="home-btn"
            style={styles.homeBtn}
          >
            🏠 Go Home
          </button>
        </div>
        <div className="error-tips" style={styles.errorTips}>
          <p>If the problem persists:</p>
          <ul style={styles.errorList}>
            <li>Check your internet connection</li>
            <li>Clear browser cache and cookies</li>
            <li>Try refreshing the page</li>
            <li>Contact support if issue continues</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// Custom Error Boundary Component (since we don't have react-error-boundary)
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    // You can log to an error reporting service here
  }

  resetError = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorFallback 
          error={this.state.error} 
          resetError={this.resetError} 
        />
      );
    }

    return this.props.children;
  }
}

// Performance monitoring
if (process.env.NODE_ENV === 'production') {
  // Report Web Vitals
  const reportWebVitals = (metric) => {
    console.log('Performance Metric:', metric);
  };
  
  // Monitor Largest Contentful Paint (LCP)
  if (window.PerformanceObserver) {
    try {
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        if (lastEntry) {
          console.log('LCP:', lastEntry.startTime);
          reportWebVitals({ name: 'LCP', value: lastEntry.startTime });
        }
      }).observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
      console.log('LCP monitoring error:', e);
    }
  }
}

// Service Worker Registration
if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then(
      (registration) => {
        console.log('SW registered:', registration);
      },
      (error) => {
        console.log('SW registration failed:', error);
      }
    );
  });
}

// Theme detection
const getPreferredTheme = () => {
  if (typeof window !== 'undefined') {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) return storedTheme;
    
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
  }
  return 'light';
};

// Apply theme on initial load
if (typeof document !== 'undefined') {
  document.documentElement.setAttribute('data-theme', getPreferredTheme());
}

// Create root
const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error('Failed to find root element');
  // Create a fallback error display
  document.body.innerHTML = `
    <div style="
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      font-family: system-ui, -apple-system, sans-serif;
      text-align: center;
      padding: 20px;
    ">
      <div>
        <h1 style="font-size: 2.5rem; margin-bottom: 1rem;">🚨 Critical Error</h1>
        <p style="font-size: 1.2rem; margin-bottom: 2rem;">
          Root element not found. Please check your HTML structure.
        </p>
        <button onclick="location.reload()" style="
          background: white;
          color: #667eea;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
        ">
          🔄 Refresh Page
        </button>
      </div>
    </div>
  `;
} else {
  const root = ReactDOM.createRoot(rootElement);

  // Global error handler
  window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
  });

  window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
  });

  // Network status monitoring
  window.addEventListener('online', () => {
    console.log('Back online!');
  });

  window.addEventListener('offline', () => {
    console.warn('You are offline');
  });

  // Render application
  root.render(
    <React.StrictMode>
      <ErrorBoundary>
        <CartProvider>
          <App />
          <Toaster 
            position="top-right"
            gutter={12}
            containerStyle={{
              top: 80,
              right: 20,
            }}
            toastOptions={{
              duration: 4000,
              style: {
                background: 'linear-gradient(135deg, #1f2937, #374151)',
                color: '#fff',
                borderRadius: '12px',
                padding: '16px 20px',
                fontSize: '14px',
                fontWeight: '500',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
                borderLeft: '4px solid #667eea',
                maxWidth: '420px',
              },
              success: {
                style: {
                  background: 'linear-gradient(135deg, #059669, #047857)',
                  borderLeft: '4px solid #10b981',
                },
                icon: '✅',
                duration: 5000,
              },
              error: {
                style: {
                  background: 'linear-gradient(135deg, #dc2626, #b91c1c)',
                  borderLeft: '4px solid #ef4444',
                },
                icon: '❌',
                duration: 6000,
              },
              loading: {
                style: {
                  background: 'linear-gradient(135deg, #4f46e5, #4338ca)',
                  borderLeft: '4px solid #6366f1',
                },
                icon: '⏳',
                duration: Infinity,
              },
            }}
          />
        </CartProvider>
      </ErrorBoundary>
    </React.StrictMode>
  );

  // PWA installation prompt
  if ('BeforeInstallPromptEvent' in window) {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      window.deferredPrompt = e;
      
      // Show install button after 5 seconds
      setTimeout(() => {
        const installButton = document.createElement('button');
        installButton.innerHTML = '📱 Install App';
        installButton.style.cssText = `
          position: fixed;
          bottom: 20px;
          right: 20px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 25px;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
          z-index: 9999;
        `;
        
        installButton.onclick = async () => {
          if (!window.deferredPrompt) return;
          
          window.deferredPrompt.prompt();
          const { outcome } = await window.deferredPrompt.userChoice;
          
          if (outcome === 'accepted') {
            console.log('User accepted PWA installation');
            installButton.style.display = 'none';
          }
          
          window.deferredPrompt = null;
        };
        
        document.body.appendChild(installButton);
      }, 5000);
    });
  }

  console.log(`
    🚀 UniDigital Marketplace
    Version: 2.0.0
    Environment: ${process.env.NODE_ENV || 'development'}
    Build Date: ${new Date().toISOString()}
  `);
}

// Inline styles for ErrorFallback (temporary until CSS loads)
const styles = {
  errorBoundary: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
    padding: '2rem',
  },
  errorContainer: {
    background: 'white',
    borderRadius: '1rem',
    padding: '3rem',
    maxWidth: '500px',
    width: '100%',
    textAlign: 'center',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  },
  errorIcon: {
    fontSize: '4rem',
    marginBottom: '1.5rem',
  },
  errorTitle: {
    fontSize: '1.5rem',
    fontWeight: '700',
    marginBottom: '1rem',
    color: '#1f2937',
  },
  errorMessage: {
    background: '#f8fafc',
    padding: '1rem',
    borderRadius: '0.5rem',
    margin: '1.5rem 0',
    fontFamily: 'ui-monospace, monospace',
    fontSize: '0.875rem',
    textAlign: 'left',
    maxHeight: '200px',
    overflowY: 'auto',
    color: '#6b7280',
  },
  errorActions: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    margin: '2rem 0',
  },
  retryBtn: {
    padding: '0.75rem 1.5rem',
    border: 'none',
    borderRadius: '0.5rem',
    fontWeight: '600',
    cursor: 'pointer',
    background: '#667eea',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    transition: 'all 0.2s ease',
  },
  homeBtn: {
    padding: '0.75rem 1.5rem',
    border: 'none',
    borderRadius: '0.5rem',
    fontWeight: '600',
    cursor: 'pointer',
    background: '#f8fafc',
    color: '#1f2937',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    transition: 'all 0.2s ease',
  },
  errorTips: {
    marginTop: '2rem',
    paddingTop: '2rem',
    borderTop: '1px solid #e5e7eb',
    textAlign: 'left',
  },
  errorList: {
    listStylePosition: 'inside',
    color: '#6b7280',
    marginTop: '0.5rem',
  },
};