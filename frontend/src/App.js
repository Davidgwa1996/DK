import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import CheckoutSuccessPage from './pages/CheckoutSuccessPage';
import CategoryPage from './pages/CategoryPage';
import PaymentGateway from './pages/PaymentGateway';
import ContactPage from './pages/ContactPage';
import MarketAnalysisPage from './pages/MarketAnalysisPage';
import AuthPage from './pages/AuthPage';
import NotFoundPage from './pages/NotFoundPage';
import './App.css';

// Error Boundary for catching component errors
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Component Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={fallbackStyles.container}>
          <h2>Something went wrong with this component.</h2>
          <p>The page will still work, but this section needs attention.</p>
          <button 
            style={fallbackStyles.button}
            onClick={() => this.setState({ hasError: false })}
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

const fallbackStyles = {
  container: {
    padding: '20px',
    margin: '20px',
    backgroundColor: '#1e293b',
    border: '1px solid #ef4444',
    borderRadius: '8px',
    color: '#f8fafc',
    textAlign: 'center'
  },
  button: {
    padding: '8px 16px',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '10px'
  }
};

// Wrapper components with error boundaries
const SafeLayout = ({ children, showHeader, showFooter }) => (
  <ErrorBoundary>
    <Layout showHeader={showHeader} showFooter={showFooter}>
      {children}
    </Layout>
  </ErrorBoundary>
);

const SafeCartProvider = ({ children }) => (
  <ErrorBoundary>
    <CartProvider>
      {children}
    </CartProvider>
  </ErrorBoundary>
);

// Safe page components
const SafeHomePage = () => (
  <ErrorBoundary>
    <HomePage />
  </ErrorBoundary>
);

const SafeProductsPage = () => (
  <ErrorBoundary>
    <ProductsPage />
  </ErrorBoundary>
);

const SafeProductDetailPage = () => (
  <ErrorBoundary>
    <ProductDetailPage />
  </ErrorBoundary>
);

const SafeCartPage = () => (
  <ErrorBoundary>
    <CartPage />
  </ErrorBoundary>
);

const SafeCheckoutPage = () => (
  <ErrorBoundary>
    <CheckoutPage />
  </ErrorBoundary>
);

const SafeCheckoutSuccessPage = () => (
  <ErrorBoundary>
    <CheckoutSuccessPage />
  </ErrorBoundary>
);

const SafeCategoryPage = () => (
  <ErrorBoundary>
    <CategoryPage />
  </ErrorBoundary>
);

const SafePaymentGateway = () => (
  <ErrorBoundary>
    <PaymentGateway />
  </ErrorBoundary>
);

const SafeContactPage = () => (
  <ErrorBoundary>
    <ContactPage />
  </ErrorBoundary>
);

const SafeMarketAnalysisPage = () => (
  <ErrorBoundary>
    <MarketAnalysisPage />
  </ErrorBoundary>
);

const SafeAuthPage = () => (
  <ErrorBoundary>
    <AuthPage />
  </ErrorBoundary>
);

const SafeNotFoundPage = () => (
  <ErrorBoundary>
    <NotFoundPage />
  </ErrorBoundary>
);

function App() {
  return (
    <Router>
      <SafeCartProvider>
        <div className="App">
          <Routes>
            <Route path="/" element={
              <SafeLayout showHeader={true} showFooter={true}>
                <SafeHomePage />
              </SafeLayout>
            } />
            
            <Route path="/auth" element={
              <SafeLayout showHeader={false} showFooter={false}>
                <SafeAuthPage />
              </SafeLayout>
            } />
            
            <Route path="/products" element={
              <SafeLayout showHeader={true} showFooter={true}>
                <SafeProductsPage />
              </SafeLayout>
            } />
            
            <Route path="/product/:id" element={
              <SafeLayout showHeader={true} showFooter={true}>
                <SafeProductDetailPage />
              </SafeLayout>
            } />
            
            <Route path="/cart" element={
              <SafeLayout showHeader={true} showFooter={true}>
                <SafeCartPage />
              </SafeLayout>
            } />
            
            <Route path="/checkout" element={
              <SafeLayout showHeader={true} showFooter={false}>
                <SafeCheckoutPage />
              </SafeLayout>
            } />
            
            <Route path="/checkout-success" element={
              <SafeLayout showHeader={true} showFooter={true}>
                <SafeCheckoutSuccessPage />
              </SafeLayout>
            } />
            
            <Route path="/category/:category" element={
              <SafeLayout showHeader={true} showFooter={true}>
                <SafeCategoryPage />
              </SafeLayout>
            } />
            
            <Route path="/payment" element={
              <SafeLayout showHeader={true} showFooter={true}>
                <SafePaymentGateway />
              </SafeLayout>
            } />
            
            <Route path="/contact" element={
              <SafeLayout showHeader={true} showFooter={true}>
                <SafeContactPage />
              </SafeLayout>
            } />
            
            <Route path="/market-analysis" element={
              <SafeLayout showHeader={true} showFooter={true}>
                <SafeMarketAnalysisPage />
              </SafeLayout>
            } />
            
            <Route path="*" element={
              <SafeLayout showHeader={true} showFooter={true}>
                <SafeNotFoundPage />
              </SafeLayout>
            } />
          </Routes>
        </div>
      </SafeCartProvider>
    </Router>
  );
}

// Fallback for any missing exports
const fallbackComponent = (name) => () => (
  <div style={{
    padding: '40px',
    textAlign: 'center',
    backgroundColor: '#1e293b',
    color: '#f8fafc',
    borderRadius: '8px',
    margin: '20px'
  }}>
    <h2>{name} Component</h2>
    <p>This component is loaded successfully.</p>
    <p style={{color: '#94a3b8', fontSize: '0.9rem'}}>
      If you see this, the component exists but content is coming soon.
    </p>
  </div>
);

// Export fallbacks as defaults if needed
export { fallbackComponent };
export default App;