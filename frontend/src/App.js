
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Layout from './components/Layout'; // Your existing Layout
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

function App() {
  return (
    <Router>
      <CartProvider>
        <div className="App">
          <Routes>
            {/* All pages use Layout with header & footer */}
            <Route path="/" element={
              <Layout showHeader={true} showFooter={true}>
                <HomePage />
              </Layout>
            } />
            
            <Route path="/auth" element={
              <Layout showHeader={false} showFooter={false}>
                <AuthPage />
              </Layout>
            } />
            
            <Route path="/products" element={
              <Layout showHeader={true} showFooter={true}>
                <ProductsPage />
              </Layout>
            } />
            
            <Route path="/product/:id" element={
              <Layout showHeader={true} showFooter={true}>
                <ProductDetailPage />
              </Layout>
            } />
            
            <Route path="/cart" element={
              <Layout showHeader={true} showFooter={true}>
                <CartPage />
              </Layout>
            } />
            
            <Route path="/checkout" element={
              <Layout showHeader={true} showFooter={false}>
                <CheckoutPage />
              </Layout>
            } />
            
            <Route path="/checkout-success" element={
              <Layout showHeader={true} showFooter={true}>
                <CheckoutSuccessPage />
              </Layout>
            } />
            
            <Route path="/category/:category" element={
              <Layout showHeader={true} showFooter={true}>
                <CategoryPage />
              </Layout>
            } />
            
            <Route path="/payment" element={
              <Layout showHeader={true} showFooter={true}>
                <PaymentGateway />
              </Layout>
            } />
            
            <Route path="/contact" element={
              <Layout showHeader={true} showFooter={true}>
                <ContactPage />
              </Layout>
            } />
            
            <Route path="/market-analysis" element={
              <Layout showHeader={true} showFooter={true}>
                <MarketAnalysisPage />
              </Layout>
            } />
            
            <Route path="*" element={
              <Layout showHeader={true} showFooter={true}>
                <NotFoundPage />
              </Layout>
            } />
          </Routes>
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;