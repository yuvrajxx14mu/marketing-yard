
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import {
  ChevronLeft,
  MapPin,
  User,
  Calendar,
  Star,
  MessageCircle,
  Share2,
  Heart,
  TrendingUp,
  Plus,
  Minus,
  Check
} from 'lucide-react';

// Mock product data
const mockProduct = {
  id: '1',
  title: 'Premium Quality Rice',
  description: 'Organically grown premium quality rice from the fertile soils of Gujarat. Perfect for everyday cooking with excellent taste and aroma. The grains are long, separate easily when cooked, and have a subtle flavor.',
  price: 3200,
  unit: 'quintal',
  minOrder: 5,
  location: 'Baroda, Gujarat',
  rating: 4.8,
  reviewCount: 56,
  farmer: {
    name: 'Rajesh Patel',
    since: 'Member since 2019',
    rating: 4.9,
    verified: true
  },
  listedOn: 'August 15, 2023',
  category: 'Grains',
  availableQuantity: 120,
  inStock: true,
  images: [
    'https://images.unsplash.com/photo-1603833665858-e61d17a86224?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1586201375761-83865001e8c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1602491453631-e2a5ad90a131?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  ],
  specifications: [
    { name: 'Type', value: 'Basmati' },
    { name: 'Grain Length', value: 'Long' },
    { name: 'Cultivation', value: 'Organic' },
    { name: 'Harvest Season', value: 'Winter 2023' },
    { name: 'Moisture Content', value: '12%' },
    { name: 'Packaging', value: 'Jute Bags' }
  ],
  priceHistory: [
    { date: 'Jul 2023', price: 3400 },
    { date: 'Aug 2023', price: 3300 },
    { date: 'Sep 2023', price: 3200 },
    { date: 'Oct 2023', price: 3200 }
  ]
};

// Similar products
const similarProducts = [
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1601598840081-33593d392f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    title: 'Organic Wheat',
    price: 2800,
    unit: 'quintal',
    location: 'Ahmedabad, Gujarat'
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    title: 'Aromatic Rice',
    price: 3500,
    unit: 'quintal',
    location: 'Surat, Gujarat'
  },
  {
    id: '4',
    image: 'https://images.unsplash.com/photo-1622621746668-59fb299bc4d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    title: 'Brown Rice',
    price: 3800,
    unit: 'quintal',
    location: 'Rajkot, Gujarat'
  }
];

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState(mockProduct);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(product.minOrder);
  const [liked, setLiked] = useState(false);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    // In a real app, we'd fetch the product data using the ID
    // For now, we'll just use the mock data
  }, [id]);
  
  const incrementQuantity = () => {
    if (quantity < product.availableQuantity) {
      setQuantity(quantity + 1);
    }
  };
  
  const decrementQuantity = () => {
    if (quantity > product.minOrder) {
      setQuantity(quantity - 1);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-20">
        {/* Breadcrumbs */}
        <div className="py-4">
          <div className="flex items-center text-sm text-market-600">
            <Link to="/" className="hover:text-market-800">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/products" className="hover:text-market-800">Products</Link>
            <span className="mx-2">/</span>
            <span className="text-market-900 font-medium">{product.title}</span>
          </div>
        </div>
        
        {/* Back button */}
        <Link to="/products" className="inline-flex items-center text-market-700 hover:text-market-900 mb-6">
          <ChevronLeft className="h-4 w-4 mr-1" />
          <span>Back to Products</span>
        </Link>
        
        {/* Product details */}
        <div className="bg-white rounded-2xl shadow-subtle overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 md:p-8">
            {/* Product images */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col space-y-4"
            >
              <div className="aspect-w-4 aspect-h-3 bg-gray-100 rounded-xl overflow-hidden">
                <motion.img
                  key={selectedImage}
                  src={product.images[selectedImage]}
                  alt={product.title}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              
              <div className="flex space-x-4 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <div
                    key={index}
                    className={`w-20 h-20 rounded-lg overflow-hidden cursor-pointer transition-all ${
                      selectedImage === index ? 'ring-2 ring-market-600' : 'opacity-70 hover:opacity-100'
                    }`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img src={image} alt={`${product.title} ${index + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </motion.div>
            
            {/* Product info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="px-3 py-1 bg-market-100 text-market-800 font-medium text-sm rounded-full">
                  {product.category}
                </span>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full hover:bg-market-50"
                    onClick={() => setLiked(!liked)}
                  >
                    <Heart
                      className={`h-5 w-5 ${liked ? 'text-red-500 fill-red-500' : 'text-market-600'}`}
                    />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full hover:bg-market-50"
                  >
                    <Share2 className="h-5 w-5 text-market-600" />
                  </Button>
                </div>
              </div>
              
              <h1 className="text-2xl md:text-3xl font-bold text-market-900 mb-2">
                {product.title}
              </h1>
              
              <div className="flex items-center mb-4">
                <div className="flex items-center text-yellow-500 mr-3">
                  <Star className="h-5 w-5 fill-yellow-500" />
                  <span className="ml-1 font-medium">{product.rating}</span>
                </div>
                <span className="text-market-600 text-sm">
                  ({product.reviewCount} reviews)
                </span>
              </div>
              
              <div className="flex items-baseline mb-6">
                <span className="text-3xl font-bold text-market-900">₹{product.price.toLocaleString()}</span>
                <span className="ml-1 text-market-600">/{product.unit}</span>
              </div>
              
              <p className="text-market-700 mb-6">
                {product.description}
              </p>
              
              <div className="flex items-center mb-4 py-4 border-t border-b border-gray-100">
                <div className="flex items-center text-market-600 mr-6">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>{product.location}</span>
                </div>
                <div className="flex items-center text-market-600">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span>Listed on {product.listedOn}</span>
                </div>
              </div>
              
              <div className="flex items-center mb-6">
                <div className="flex items-center space-x-1">
                  {product.inStock ? (
                    <>
                      <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                      <span className="text-green-600 font-medium">In Stock</span>
                    </>
                  ) : (
                    <>
                      <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                      <span className="text-red-600 font-medium">Out of Stock</span>
                    </>
                  )}
                </div>
                <span className="mx-3 text-gray-300">|</span>
                <span className="text-market-600">
                  Available: <span className="font-medium">{product.availableQuantity} {product.unit}s</span>
                </span>
                <span className="mx-3 text-gray-300">|</span>
                <span className="text-market-600">
                  Min Order: <span className="font-medium">{product.minOrder} {product.unit}s</span>
                </span>
              </div>
              
              <div className="mb-8">
                <p className="text-market-700 mb-2">Quantity ({product.unit}s):</p>
                <div className="flex items-center">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-l-lg rounded-r-none border-market-200"
                    onClick={decrementQuantity}
                    disabled={quantity <= product.minOrder}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      if (val >= product.minOrder && val <= product.availableQuantity) {
                        setQuantity(val);
                      }
                    }}
                    className="w-20 text-center border-y border-market-200 h-10"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-r-lg rounded-l-none border-market-200"
                    onClick={incrementQuantity}
                    disabled={quantity >= product.availableQuantity}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <Button
                  className="flex-1 bg-market-600 hover:bg-market-700 text-white"
                  size="lg"
                >
                  Place Bid
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-market-200 text-market-800 hover:bg-market-50"
                  size="lg"
                >
                  Contact Farmer
                </Button>
              </div>
            </motion.div>
          </div>
          
          {/* Additional info tabs */}
          <div className="border-t border-gray-100 p-6 md:p-8">
            <div className="mb-8">
              <h2 className="text-xl font-bold text-market-900 mb-4">Specifications</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-8">
                {product.specifications.map((spec, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="text-market-600">{spec.name}:</span>
                    <span className="font-medium text-market-900">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-bold text-market-900 mb-4">Farmer Information</h2>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-market-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="h-6 w-6 text-market-600" />
                </div>
                <div>
                  <div className="flex items-center">
                    <h3 className="font-semibold text-market-900">{product.farmer.name}</h3>
                    {product.farmer.verified && (
                      <div className="ml-2 bg-market-100 text-market-800 px-2 py-0.5 rounded-full text-xs font-medium flex items-center">
                        <Check className="h-3 w-3 mr-1" />
                        Verified
                      </div>
                    )}
                  </div>
                  <p className="text-market-600 text-sm">{product.farmer.since}</p>
                  <div className="flex items-center mt-1">
                    <div className="flex items-center text-yellow-500 mr-2">
                      <Star className="h-4 w-4 fill-yellow-500" />
                      <span className="ml-1 font-medium text-sm">{product.farmer.rating}</span>
                    </div>
                    <span className="text-market-600 text-sm">Seller Rating</span>
                  </div>
                  <div className="mt-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-market-50 border-market-100 text-market-800 hover:bg-market-100"
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Message Farmer
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-bold text-market-900 mb-4">Price Trend</h2>
              <div className="flex items-center mb-3">
                <TrendingUp className="h-5 w-5 text-market-600 mr-2" />
                <span className="text-market-800 font-medium">Historical Price Variations</span>
              </div>
              <div className="bg-market-50 p-4 rounded-lg">
                <div className="h-12 flex items-end space-x-8">
                  {product.priceHistory.map((point, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div 
                        className="w-8 bg-market-400 rounded-t"
                        style={{ 
                          height: `${(point.price / 4000) * 100}%`,
                          backgroundColor: index === product.priceHistory.length - 1 ? '#3c8d5e' : '#8fc7a2' 
                        }}
                      ></div>
                      <div className="text-xs text-market-600 mt-1">{point.date}</div>
                      <div className="text-xs font-medium text-market-800">₹{point.price}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Similar products */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-market-900 mb-6">Similar Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {similarProducts.map((similarProduct, index) => (
              <Link to={`/products/${similarProduct.id}`} key={index}>
                <motion.div
                  className="bg-white rounded-xl overflow-hidden shadow-subtle hover:shadow-hover transition-all duration-300"
                  whileHover={{ y: -8 }}
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={similarProduct.image}
                      alt={similarProduct.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-market-900 mb-1">{similarProduct.title}</h3>
                    <div className="flex items-center text-market-600 text-sm mb-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{similarProduct.location}</span>
                    </div>
                    <div className="flex items-baseline">
                      <span className="text-lg font-bold text-market-900">₹{similarProduct.price.toLocaleString()}</span>
                      <span className="ml-1 text-market-600 text-sm">/{similarProduct.unit}</span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
