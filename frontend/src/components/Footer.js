import React from 'react';
import { Mail, Phone, MessageCircle, Shield, Truck, CreditCard, MessageSquare } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Quick Contact Bar */}
      <div className="bg-gradient-to-r from-primary to-blue-800 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-4">
              <MessageSquare size={24} className="text-accent" />
              <div>
                <div className="font-bold">Live Chat Support</div>
                <div className="text-sm opacity-90">Available 24/7 on website</div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Phone size={24} className="text-accent" />
              <div>
                <div className="font-bold">Call Now</div>
                <div className="text-xl font-bold">+44 7873 404080</div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Mail size={24} className="text-accent" />
              <div>
                <div className="font-bold">Email Us</div>
                <div className="text-sm">unidigitalcom9@gmail.com</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="bg-gray-800 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-accent/20 rounded-lg">
                <Shield size={28} className="text-accent" />
              </div>
              <div>
                <h4 className="font-bold mb-1">Buyer Protection</h4>
                <p className="text-gray-400 text-sm">Full money-back guarantee</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-accent/20 rounded-lg">
                <Truck size={28} className="text-accent" />
              </div>
              <div>
                <h4 className="font-bold mb-1">UK-Wide Delivery</h4>
                <p className="text-gray-400 text-sm">Next day available</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-accent/20 rounded-lg">
                <CreditCard size={28} className="text-accent" />
              </div>
              <div>
                <h4 className="font-bold mb-1">Secure Payments</h4>
                <p className="text-gray-400 text-sm">All major cards accepted</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-accent/20 rounded-lg">
                <MessageCircle size={28} className="text-accent" />
              </div>
              <div>
                <h4 className="font-bold mb-1">Live Support</h4>
                <p className="text-gray-400 text-sm">Chat or call anytime</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-primary to-blue-700 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-2xl">UD</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold">UniDigitalCom</h3>
                <p className="text-gray-400 text-sm">Cars & Electronics Marketplace</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6">
              UK's trusted marketplace for premium cars, electronics, and automotive accessories.
              Verified sellers, secure payments, and nationwide delivery.
            </p>
            <div className="flex space-x-4">
              <button className="bg-gray-800 hover:bg-gray-700 p-3 rounded-lg">
                <MessageCircle size={20} />
              </button>
              <button className="bg-gray-800 hover:bg-gray-700 p-3 rounded-lg">
                <Phone size={20} />
              </button>
              <button className="bg-gray-800 hover:bg-gray-700 p-3 rounded-lg">
                <Mail size={20} />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 pb-2 border-b border-gray-700">Cars Marketplace</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white">New Cars</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Used Cars</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Luxury Cars</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Electric Vehicles</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Car Parts & Accessories</a></li>
            </ul>
          </div>

          {/* Electronics */}
          <div>
            <h4 className="text-lg font-bold mb-6 pb-2 border-b border-gray-700">Electronics</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white">Smartphones</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Laptops & Computers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">TVs & Home Cinema</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Gaming Consoles</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Audio & Headphones</a></li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h4 className="text-lg font-bold mb-6 pb-2 border-b border-gray-700">Contact & Support</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MessageCircle size={18} className="text-accent mt-1" />
                <div>
                  <div className="font-medium">Live Chat</div>
                  <div className="text-gray-400 text-sm">Available on website 24/7</div>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Phone size={18} className="text-accent mt-1" />
                <div>
                  <div className="font-medium">Phone</div>
                  <div className="text-gray-400">+44 7873 404080</div>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Mail size={18} className="text-accent mt-1" />
                <div>
                  <div className="font-medium">Email</div>
                  <div className="text-gray-400">unidigitalcom9@gmail.com</div>
                </div>
              </li>
            </ul>

            {/* Payment Methods */}
            <div className="mt-8">
              <h5 className="font-bold mb-3">Payment Methods</h5>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">Visa</span>
                <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs">MasterCard</span>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">PayPal</span>
                <span className="px-3 py-1 bg-black text-white rounded-full text-xs">Apple Pay</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs">Google Pay</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} UniDigitalCom. All rights reserved.</p>
          <p className="mt-2 text-sm">Registered in England & Wales | Company No: 12345678 | VAT: GB123456789</p>
          <p className="mt-2 text-sm">Cars & Electronics Marketplace - UK's Trusted Platform</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;