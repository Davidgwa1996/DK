import React from 'react';
import Header from './ModernHeader';
import Footer from './ModernFooter';
import './Layout.css';

function Layout({ children, showHeader = true, showFooter = true }) {
  return (
    <div className="layout">
      {showHeader && <Header />}
      <main className="main-content">
        <div className="container">
          {children}
        </div>
      </main>
      {showFooter && <Footer />}
    </div>
  );
}

export default Layout;