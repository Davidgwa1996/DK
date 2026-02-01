import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Menu, X, User, Car, Cpu, Wallet } from 'lucide-react';
import CartSidebar from './CartSidebar';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <header className="bg-white shadow-md py-4">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold text-primary flex items-center">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mr-2">
                <span className="text-white font-bold">UD</span>
              </div>
              UniDigitalCom
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link to="/" className="text-gray-700 hover:text-primary">Home</Link>
              <Link to="/automotive-parts" className="text-gray-700 hover:text-primary flex items-center">
                <Car size={18} className="mr-1" /> Auto Parts
              </Link>
              <Link to="/electronics" className="text-gray-700 hover:text-primary flex items-center">
                <Cpu size={18} className="mr-1" /> Electronics
              </Link>
              <Link to="/payment-methods" className="text-gray-700 hover:text-primary flex items-center">
                <Wallet size={18} className="mr-1" /> Payments
              </Link>
              <Link to="/contact" className="text-gray-700 hover:text-primary">Contact</Link>
              <button onClick={() => setShowCart(true)} className="relative">
                <ShoppingBag size={24} />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  0
                </span>
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-4">
              <button onClick={() => setShowCart(true)} className="relative">
                <ShoppingBag size={24} />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  0
                </span>
              </button>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 space-y-3">
              <Link to="/" className="block py-2 text-gray-700 hover:text-primary">Home</Link>
              <Link to="/automotive-parts" className="block py-2 text-gray-700 hover:text-primary">Auto Parts</Link>
              <Link to="/electronics" className="block py-2 text-gray-700 hover:text-primary">Electronics</Link>
              <Link to="/payment-methods" className="block py-2 text-gray-700 hover:text-primary">Payment Methods</Link>
              <Link to="/contact" className="block py-2 text-gray-700 hover:text-primary">Contact</Link>
            </div>
          )}
        </div>
      </header>

      {/* Cart Sidebar */}
      <CartSidebar 
        isOpen={showCart} 
        onClose={() => setShowCart(false)}
      />
    </>
  );
}

export default Header;