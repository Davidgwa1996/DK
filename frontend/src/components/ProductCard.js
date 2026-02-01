import React, { useState, useEffect } from 'react';
import { ShoppingBag, Heart, MapPin, CheckCircle, TrendingUp, Clock, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function ProductCard({ product }) {
  const [isLiked, setIsLiked] = useState(false);
  const [timeSinceUpdate, setTimeSinceUpdate] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (product.priceLastUpdated) {
      const updateTime = new Date(product.priceLastUpdated);
      const now = new Date();
      const minutes = Math.floor((now - updateTime) / (1000 * 60));

      if (minutes < 1) {
        setTimeSinceUpdate('Just now');
      } else if (minutes < 60) {
        setTimeSinceUpdate(`${minutes}m ago`);
      } else {
        setTimeSinceUpdate(`${Math.floor(minutes / 60)}h ago`);
      }

      // Update every minute
      const interval = setInterval(() => {
        const newMinutes = Math.floor((new Date() - updateTime) / (1000 * 60));
        if (newMinutes < 1) {
          setTimeSinceUpdate('Just now');
        } else if (newMinutes < 60) {
          setTimeSinceUpdate(`${newMinutes}m ago`);
        } else {
          setTimeSinceUpdate(`${Math.floor(newMinutes / 60)}h ago`);
        }
      }, 60000);

      return () => clearInterval(interval);
    }
  }, [product.priceLastUpdated]);

  const handleAddToCart = () => {
    console.log('Added to cart:', product);
    navigate('/checkout');
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const priceChange = parseFloat(product.priceChange || 0);
  const isPriceIncrease = priceChange > 0;

  return (
    <div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
      {/* Product Image with AI Badge */}
      <div className="relative h-56 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* AI Pricing Badge */}
        <div className="absolute top-4 left-4 flex items-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center">
            <Zap size={10} className="mr-1" />
            AI-PRICED
          </div>
        </div>

        {/* Condition Badge */}
        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold ${
          product.condition === 'New' ? 'bg-green-500 text-white' :
          product.condition === 'Used' ? 'bg-blue-500 text-white' :
          product.condition === 'Nearly New' ? 'bg-purple-500 text-white' :
          'bg-yellow-500 text-white'
        }`}>
          {product.condition}
        </div>

        {/* Price Change Indicator */}
        {Math.abs(priceChange) > 0.5 && (
          <div className={`absolute bottom-4 right-4 px-3 py-1 rounded-full text-xs font-bold flex items-center ${
            isPriceIncrease ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
          }`}>
            <TrendingUp size={10} className={`mr-1 ${isPriceIncrease ? '' : 'transform rotate-180'}`} />
            {isPriceIncrease ? '+' : ''}{priceChange.toFixed(1)}%
          </div>
        )}

        {/* Like Button */}
        <button
          onClick={() => setIsLiked(!isLiked)}
          className={`absolute bottom-4 left-4 p-2 rounded-full shadow-lg ${
            isLiked ? 'bg-red-500 text-white' : 'bg-white/90 text-gray-700 hover:bg-white'
          }`}
        >
          <Heart size={20} className={isLiked ? "fill-white" : ""} />
        </button>

        {/* Update Time */}
        {timeSinceUpdate && (
          <div className="absolute top-16 left-4 flex items-center bg-black/70 text-white px-3 py-1 rounded-full text-xs">
            <Clock size={10} className="mr-1" />
            Updated {timeSinceUpdate}
          </div>
        )}

        {/* Location */}
        <div className="absolute top-28 left-4 flex items-center bg-black/70 text-white px-3 py-1 rounded-full text-xs">
          <MapPin size={10} className="mr-1" />
          {product.location}
        </div>
      </div>

      {/* Product Info */}
      <div className="p-5">
        {/* Category and Rating */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium px-3 py-1 bg-primary/10 text-primary rounded-full">
            {product.category}
          </span>
          <div className="flex items-center text-sm text-gray-600">
            <div className="flex items-center mr-2">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className={`w-3 h-3 ${
                  i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                }`}
                viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            {product.rating}/5
          </div>
        </div>

        {/* Name */}
        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors line-clamp-1">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>

        {/* Market Data */}
        <div className="flex items-center justify-between mb-4 text-xs text-gray-500">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            <span>Market stock: {product.stock}</span>
          </div>
          <div className="flex items-center">
            <Clock size={12} className="mr-1" />
            <span>AI updated</span>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-2xl font-bold text-gray-900">£{product.price.toLocaleString()}</div>
            {product.originalPrice && (
              <div className="text-sm text-gray-500 line-through">
                £{product.originalPrice.toLocaleString()}
                {discount > 0 && (
                  <span className="ml-2 text-red-600 font-medium">Save {discount}%</span>
                )}
              </div>
            )}
            {Math.abs(priceChange) > 0.5 && (
              <div className={`text-xs ${isPriceIncrease ? 'text-red-600' : 'text-green-600'}`}>
                {isPriceIncrease ? 'Increased' : 'Decreased'} by {Math.abs(priceChange).toFixed(1)}% today
              </div>
            )}
          </div>
          <div className="flex items-center text-sm text-green-600">
            <CheckCircle size={14} className="mr-1" />
            In Stock
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="w-full bg-gradient-to-r from-primary to-blue-800 hover:from-blue-800 hover:to-primary text-white py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center group/btn"
        >
          <ShoppingBag size={18} className="mr-2 group-hover/btn:animate-bounce" />
          <span>Buy Now - AI Best Price</span>
        </button>

        {/* Quick Actions */}
        <div className="flex justify-between mt-3 text-sm">
          <button className="text-primary hover:text-blue-800 font-medium">
            View Market Analysis
          </button>
          <button className="text-gray-600 hover:text-gray-900">
            Price Alert
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;