import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {
  ShoppingBag, Heart, Star, MapPin, Truck, Shield, ChevronRight,
  Battery, Settings, Wrench, Cpu, Camera, Zap, Clock, CreditCard,
  Share2, RotateCcw, Package, CheckCircle, AlertCircle
} from 'lucide-react';

function ProductDetailPage() {
  const { id, category } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [activeTab, setActiveTab] = useState('details');

  // Mock product data - in production would come from API
  useEffect(() => {
    setTimeout(() => {
      setProduct({
        id: id || '1',
        name: '2024 Tesla Model 3 Long Range',
        category: category || 'Electric Vehicles',
        price: 48999,
        originalPrice: 52999,
        discount: 8,
        rating: 4.8,
        reviewCount: 1247,
        stock: 12,
        location: 'London, UK',
        condition: 'Brand New',
        delivery: 'Next Day Available',
        warranty: '4 Years Manufacturer',
        images: [
          'https://images.unsplash.com/photo-1560958089-b8a1929cea89',
          'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf',
          'https://images.unsplash.com/photo-1553440569-bcc63803a83d',
          'https://images.unsplash.com/photo-1549399542-7e3f8b79c341'
        ],
        // Automotive specific
        specifications: {
          make: 'Tesla',
          model: 'Model 3',
          year: 2024,
          mileage: '0 miles',
          fuel: 'Electric',
          battery: '82 kWh',
          range: '374 miles',
          acceleration: '4.2s (0-60mph)',
          topSpeed: '145 mph',
          seats: 5,
          doors: 4,
          color: 'Midnight Silver Metallic',
          transmission: 'Automatic',
          drive: 'All-Wheel Drive'
        },
        features: [
          'Autopilot',
          'Premium Interior',
          'Panoramic Glass Roof',
          'Premium Audio',
          'Wireless Charging',
          'Heated Seats',
          'Navigation',
          'Summon',
          'Sentry Mode',
          'Dog Mode'
        ],
        description: `The 2024 Tesla Model 3 Long Range represents the pinnacle of electric vehicle technology. With a WLTP-rated range of 374 miles, this vehicle eliminates range anxiety while delivering exhilarating performance. The minimalist interior features a 15-inch touchscreen interface, premium vegan materials, and advanced acoustic glass for a serene driving experience.

Advanced safety features include 8 cameras, 12 ultrasonic sensors, and forward-facing radar providing 360 degrees of visibility. The car continuously receives over-the-air updates, adding new features and improving existing ones.

Perfect for daily commuting and long-distance travel, the Model 3 offers access to Tesla's extensive Supercharger network, enabling rapid charging at over 250 kW.`,
        seller: {
          name: 'Tesla UK Official',
          rating: 4.9,
          verified: true,
          location: 'London, UK',
          memberSince: 2016,
          totalSales: 15428
        },
        similarProducts: [
          {
            id: '2',
            name: 'BMW i4 M50',
            price: 61999,
            image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e',
            specs: 'Electric, 316 miles, 536hp'
          },
          {
            id: '3',
            name: 'Mercedes EQE',
            price: 72999,
            image: 'https://images.unsplash.com/photo-1563720223480-8c4d0cde3cad',
            specs: 'Electric, 394 miles, Luxurious'
          },
          {
            id: '4',
            name: 'Audi e-tron GT',
            price: 81999,
            image: 'https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5',
            specs: 'Electric, 238 miles, Performance'
          }
        ]
      });
      setLoading(false);
    }, 1000);
  }, [id, category]);

  const handleAddToCart = () => {
    console.log('Added to cart:', product, 'Quantity:', quantity);
    navigate('/cart');
  };

  const handleBuyNow = () => {
    console.log('Buy now:', product, 'Quantity:', quantity);
    navigate('/checkout', {
      state: {
        items: [{ ...product, quantity }],
        directPurchase: true
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary mb-4"></div>
            <p className="text-gray-600">Loading product details...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <AlertCircle size={48} className="text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h2>
            <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
            <button
              onClick={() => navigate('/')}
              className="bg-primary text-white px-6 py-3 rounded-lg font-medium"
            >
              Back to Home
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="flex items-center text-sm text-gray-600 mb-8">
            <button onClick={() => navigate('/')} className="hover:text-primary">Home</button>
            <ChevronRight size={16} className="mx-2" />
            <button onClick={() => navigate(`/category/${product.category.toLowerCase().replace(/\s+/g, '-')}`)}
              className="hover:text-primary capitalize">
              {product.category}
            </button>
            <ChevronRight size={16} className="mx-2" />
            <span className="font-medium text-gray-900">{product.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column - Images */}
            <div>
              {/* Main Image */}
              <div className="bg-gray-100 rounded-2xl overflow-hidden mb-4">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-96 object-cover"
                />
              </div>

              {/* Thumbnail Images */}
              <div className="flex space-x-4 overflow-x-auto pb-4">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border-2 ${
                      selectedImage === index ? 'border-primary' : 'border-transparent'
                    }`}
                  >
                    <img src={img} alt={`${product.name} view ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="flex space-x-4 mt-6">
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`flex-1 flex items-center justify-center py-3 rounded-xl border ${
                    isLiked
                      ? 'bg-red-50 border-red-200 text-red-600'
                      : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Heart size={20} className={`mr-2 ${isLiked ? 'fill-red-600' : ''}`} />
                  {isLiked ? 'Saved' : 'Save'}
                </button>
                <button className="flex-1 flex items-center justify-center py-3 rounded-xl border border-gray-300 bg-white text-gray-700 hover:bg-gray-50">
                  <Share2 size={20} className="mr-2" />
                  Share
                </button>
                <button className="flex-1 flex items-center justify-center py-3 rounded-xl border border-gray-300 bg-white text-gray-700 hover:bg-gray-50">
                  <RotateCcw size={20} className="mr-2" />
                  Compare
                </button>
              </div>
            </div>

            {/* Right Column - Details */}
            <div>
              {/* Title & Rating */}
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-3">{product.name}</h1>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={20}
                        className={`${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                    <span className="ml-2 text-gray-700">{product.rating}/5</span>
                    <span className="mx-2 text-gray-400">•</span>
                    <span className="text-gray-600">{product.reviewCount} reviews</span>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    {product.condition}
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="mb-8 p-6 bg-gray-50 rounded-2xl">
                <div className="flex items-end mb-4">
                  <div>
                    <div className="text-4xl font-bold text-gray-900">£{product.price.toLocaleString()}</div>
                    {product.originalPrice && (
                      <div className="text-lg text-gray-500 line-through">
                        £{product.originalPrice.toLocaleString()}
                        <span className="ml-3 text-red-600 font-bold">Save {product.discount}%</span>
                      </div>
                    )}
                  </div>
                  <div className="ml-auto text-sm text-gray-600">
                    <Clock size={16} className="inline mr-1" />
                    AI-priced • Updated today
                  </div>
                </div>

                {/* Quick Specs */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-white p-4 rounded-lg">
                    <div className="flex items-center text-gray-600 mb-1">
                      <Battery size={16} className="mr-2" />
                      <span className="text-sm">Range</span>
                    </div>
                    <div className="font-bold">{product.specifications.range}</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <div className="flex items-center text-gray-600 mb-1">
                      <Zap size={16} className="mr-2" />
                      <span className="text-sm">Battery</span>
                    </div>
                    <div className="font-bold">{product.specifications.battery}</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <div className="flex items-center text-gray-600 mb-1">
                      <Settings size={16} className="mr-2" />
                      <span className="text-sm">Acceleration</span>
                    </div>
                    <div className="font-bold">{product.specifications.acceleration}</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <div className="flex items-center text-gray-600 mb-1">
                      <Cpu size={16} className="mr-2" />
                      <span className="text-sm">Drive</span>
                    </div>
                    <div className="font-bold">{product.specifications.drive}</div>
                  </div>
                </div>

                {/* Quantity & Actions */}
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-3 text-gray-600 hover:bg-gray-100"
                    >
                      −
                    </button>
                    <span className="px-6 py-3 font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 py-3 text-gray-600 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-primary hover:bg-blue-800 text-white py-3 rounded-lg font-bold flex items-center justify-center"
                  >
                    <ShoppingBag size={20} className="mr-2" />
                    Add to Cart
                  </button>
                  <button
                    onClick={handleBuyNow}
                    className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-3 rounded-lg font-bold flex items-center justify-center"
                  >
                    <CreditCard size={20} className="mr-2" />
                    Buy Now
                  </button>
                </div>
              </div>

              {/* Delivery & Warranty */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white border rounded-xl p-5">
                  <div className="flex items-center mb-3">
                    <Truck size={24} className="text-primary mr-3" />
                    <div>
                      <div className="font-bold">Delivery</div>
                      <div className="text-gray-600">{product.delivery}</div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    Free shipping on orders over £500.
                    <button className="text-primary hover:text-blue-800 ml-2">
                      Calculate shipping
                    </button>
                  </div>
                </div>
                <div className="bg-white border rounded-xl p-5">
                  <div className="flex items-center mb-3">
                    <Shield size={24} className="text-primary mr-3" />
                    <div>
                      <div className="font-bold">Warranty</div>
                      <div className="text-gray-600">{product.warranty}</div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    Full manufacturer warranty included.
                    <button className="text-primary hover:text-blue-800 ml-2">
                      View terms
                    </button>
                  </div>
                </div>
              </div>

              {/* Seller Info */}
              <div className="bg-gray-50 rounded-xl p-6 mb-8">
                <h3 className="font-bold text-gray-900 mb-4">Seller Information</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xl mr-4">
                      {product.seller.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold flex items-center">
                        {product.seller.name}
                        {product.seller.verified && (
                          <CheckCircle size={16} className="text-green-500 ml-2" />
                        )}
                      </div>
                      <div className="text-sm text-gray-600">
                        {product.seller.rating}/5 • {product.seller.totalSales} sales
                      </div>
                    </div>
                  </div>
                  <button className="text-primary hover:text-blue-800 font-medium">
                    View Store
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-12">
            <div className="border-b">
              <div className="flex space-x-8">
                {['details', 'specifications', 'features', 'reviews', 'similar'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-4 px-2 font-medium capitalize border-b-2 ${
                      activeTab === tab
                        ? 'border-primary text-primary'
                        : 'border-transparent text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {tab === 'details' ? 'Product Details' :
                     tab === 'specifications' ? 'Specifications' :
                     tab === 'features' ? 'Features & Options' :
                     tab === 'reviews' ? `Reviews (${product.reviewCount})` : 'Similar Products'}
                  </button>
                ))}
              </div>
            </div>

            <div className="py-8">
              {activeTab === 'details' && (
                <div className="prose max-w-none">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Product Description</h3>
                  <div className="text-gray-700 leading-relaxed">
                    {product.description.split('\n').map((paragraph, index) => (
                      <p key={index} className="mb-4">{paragraph}</p>
                    ))}
                  </div>
                  <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-blue-50 p-6 rounded-xl">
                      <h4 className="font-bold text-gray-900 mb-3">Key Benefits</h4>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <CheckCircle size={18} className="text-green-500 mr-3" />
                          <span>Zero emissions driving</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle size={18} className="text-green-500 mr-3" />
                          <span>Lower running costs than petrol/diesel</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle size={18} className="text-green-500 mr-3" />
                          <span>Access to clean air zones</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle size={18} className="text-green-500 mr-3" />
                          <span>Government grant eligible</span>
                        </li>
                      </ul>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-xl">
                      <h4 className="font-bold text-gray-900 mb-3">What's Included</h4>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <Package size={18} className="text-primary mr-3" />
                          <span>Vehicle with all standard equipment</span>
                        </li>
                        <li className="flex items-center">
                          <Package size={18} className="text-primary mr-3" />
                          <span>Type 2 charging cable</span>
                        </li>
                        <li className="flex items-center">
                          <Package size={18} className="text-primary mr-3" />
                          <span>4 years manufacturer warranty</span>
                        </li>
                        <li className="flex items-center">
                          <Package size={18} className="text-primary mr-3" />
                          <span>8 years battery warranty</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'specifications' && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Technical Specifications</h3>
                  <div className="bg-white border rounded-xl overflow-hidden">
                    <table className="w-full">
                      <tbody>
                        {Object.entries(product.specifications).map(([key, value]) => (
                          <tr key={key} className="even:bg-gray-50">
                            <td className="py-4 px-6 font-medium text-gray-700 capitalize">
                              {key.replace(/([A-Z])/g, ' $1')}
                            </td>
                            <td className="py-4 px-6 text-gray-900">{value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'features' && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Features & Options</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {product.features.map((feature, index) => (
                      <div key={index} className="bg-white border rounded-xl p-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                            <Zap size={20} className="text-primary" />
                          </div>
                          <span className="font-medium">{feature}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'similar' && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Similar Products</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {product.similarProducts.map(item => (
                      <div key={item.id} className="bg-white border rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                        <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
                        <div className="p-4">
                          <h4 className="font-bold text-gray-900 mb-2">{item.name}</h4>
                          <p className="text-sm text-gray-600 mb-3">{item.specs}</p>
                          <div className="font-bold text-lg">£{item.price.toLocaleString()}</div>
                          <button
                            onClick={() => navigate(`/product/${item.id}`)}
                            className="w-full mt-4 bg-primary text-white py-2 rounded-lg font-medium hover:bg-blue-800"
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default ProductDetailPage;