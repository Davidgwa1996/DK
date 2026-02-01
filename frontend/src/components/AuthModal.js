import React, { useState, useEffect } from 'react';
import { ShoppingCart, User, LogOut } from 'lucide-react';
import AuthModal from './AuthModal';
import { authAPI } from '../services/api';

function Header() {
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUser();
    }
  }, []);

  const fetchUser = async () => {
    try {
      const response = await authAPI.getCurrentUser();
      setUser(response.data);
    } catch (err) {
      localStorage.removeItem('token');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <>
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">U</span>
              </div>
              <h1 className="text-2xl font-bold text-primary">UniDigitalCom</h1>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a href="#home" className="text-gray-700 hover:text-accent font-medium">Home</a>
              <a href="#cars" className="text-gray-700 hover:text-accent font-medium">Classic Cars</a>
              <a href="#about" className="text-gray-700 hover:text-accent font-medium">About</a>
              <a href="#contact" className="text-gray-700 hover:text-accent font-medium">Contact</a>
            </nav>

            {/* Icons */}
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <span className="text-gray-700 hidden md:block">{user.name}</span>
                  <button
                    onClick={handleLogout}
                    className="p-2 hover:bg-gray-100 rounded-full"
                    title="Logout"
                  >
                    <LogOut size={24} className="text-gray-700" />
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                  title="Login/Register"
                >
                  <User size={24} className="text-gray-700" />
                </button>
              )}

              <button className="p-2 hover:bg-gray-100 rounded-full relative">
                <ShoppingCart size={24} className="text-gray-700" />
                <span className="absolute -top-1 -right-1 bg-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  3
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
}

export default Header;