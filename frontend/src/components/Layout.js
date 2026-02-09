import React, { useState, useEffect } from 'react';
import Header from './ModernHeader';
import Footer from './ModernFooter';
import './Layout.css';

function Layout({ 
  children, 
  showHeader = true, 
  showFooter = true,
  // Optional mobile menu props
  isMobileMenuOpen: externalMobileMenuOpen,
  onMobileMenuToggle: externalOnMobileMenuToggle,
  // Optional custom header/footer
  customHeader = null,
  customFooter = null
}) {
  // Internal state for mobile menu if not controlled externally
  const [internalMobileMenuOpen, setInternalMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Use external props if provided, otherwise use internal state
  const isMobileMenuOpen = externalMobileMenuOpen !== undefined 
    ? externalMobileMenuOpen 
    : internalMobileMenuOpen;
    
  const handleMobileMenuToggle = externalOnMobileMenuToggle || 
    (() => setInternalMobileMenuOpen(!isMobileMenuOpen));

  // Close mobile menu when clicking outside (if internally controlled)
  const handleCloseMobileMenu = () => {
    if (externalMobileMenuOpen === undefined) {
      setInternalMobileMenuOpen(false);
    }
  };

  // Handle scroll effect for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    const handleRouteChange = () => {
      if (externalMobileMenuOpen === undefined && isMobileMenuOpen) {
        setInternalMobileMenuOpen(false);
      }
    };

    // Listen for route changes
    window.addEventListener('popstate', handleRouteChange);
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, [isMobileMenuOpen, externalMobileMenuOpen]);

  return (
    <div className={`layout ${isScrolled ? 'scrolled' : ''}`}>
      {showHeader && (
        <>
          {customHeader ? (
            customHeader
          ) : (
            <Header 
              isMobileMenuOpen={isMobileMenuOpen}
              onMobileMenuToggle={handleMobileMenuToggle}
              className={isScrolled ? 'sticky' : ''}
            />
          )}
        </>
      )}
      
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="mobile-menu-overlay"
          onClick={handleCloseMobileMenu}
          aria-label="Close menu"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleCloseMobileMenu();
            }
          }}
        />
      )}
      
      <main className="main-content" id="main-content">
        <div className="container">
          {children}
        </div>
      </main>
      
      {showFooter && (
        <>
          {customFooter ? customFooter : <Footer />}
        </>
      )}
    </div>
  );
}

export default Layout;