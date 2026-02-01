import React from 'react';

function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-gray-900 via-blue-900 to-gray-800 text-white overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 bg-blue-500 rounded-full mix-blend-overlay filter blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-accent rounded-full mix-blend-overlay filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6">
            <span className="w-2 h-2 bg-accent rounded-full mr-2 animate-pulse"></span>
            <span className="text-sm font-medium">UK's Premium Marketplace</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Cars & Electronics
            <span className="block text-accent mt-2">Marketplace</span>
          </h1>

          <p className="text-xl mb-8 opacity-90 max-w-2xl leading-relaxed">
            UK's fastest-growing marketplace for premium cars, electronics, gadgets,
            and automotive accessories. New, used, and refurbished items with verified sellers.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-accent hover:bg-yellow-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center">
              <span>Browse All Products</span>
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
            <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 border border-white/30">
              Sell Your Item
            </button>
          </div>

          {/* Stats */}
          <div className="mt-16 flex flex-wrap gap-8">
            <div>
              <div className="text-3xl font-bold">10,000+</div>
              <div className="text-gray-300">Active Listings</div>
            </div>
            <div>
              <div className="text-3xl font-bold">4.8★</div>
              <div className="text-gray-300">Trust Rating</div>
            </div>
            <div>
              <div className="text-3xl font-bold">24h</div>
              <div className="text-gray-300">Fast Delivery</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;