
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  User, 
  Phone, 
  Calendar, 
  Tag, 
  ArrowLeft, 
  ThumbsUp, 
  Star, 
  MessageCircle,
  ShoppingBasket
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Sample product data (matches the data in ProductGrid)
const sampleProducts = [
  {
    id: '1',
    title: 'Premium Wheat',
    price: 2200,
    unit: 'quintal',
    location: 'Ahmedabad, Gujarat',
    rating: 4.8,
    farmer: 'Rajesh Patel',
    category: 'Grains',
    available: 500,
    harvestDate: '2023-12-15',
    description: 'High-quality premium wheat grain, perfect for making flour, bread, and other baked goods. This wheat variety has excellent protein content and baking properties.',
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '2',
    title: 'Organic Rice',
    price: 3500,
    unit: 'quintal',
    location: 'Surat, Gujarat',
    rating: 4.5,
    farmer: 'Amit Singh',
    category: 'Grains',
    available: 350,
    harvestDate: '2023-11-20',
    description: 'Organically grown rice with no pesticides or chemical fertilizers. This premium rice variety has excellent texture and aroma when cooked.',
    image: 'https://images.unsplash.com/photo-1550828484-44809969a644?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '3',
    title: 'Fresh Tomatoes',
    price: 1800,
    unit: 'quintal',
    location: 'Vadodara, Gujarat',
    rating: 4.2,
    farmer: 'Meena Sharma',
    category: 'Vegetables',
    available: 200,
    harvestDate: '2024-01-05',
    description: 'Farm-fresh tomatoes harvested at peak ripeness. These tomatoes are perfect for cooking, salads, and sauces with their balanced sweet-acidic flavor.',
    image: 'https://images.unsplash.com/photo-1582284540020-8acbe03f4924?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '4',
    title: 'Cotton Crop',
    price: 6500,
    unit: 'quintal',
    location: 'Rajkot, Gujarat',
    rating: 4.7,
    farmer: 'Bhavesh Mehta',
    category: 'Fibers',
    available: 450,
    harvestDate: '2023-10-10',
    description: 'Premium quality cotton with long, fine fibers ideal for textile production. This cotton variety is known for its durability and softness.',
    image: 'https://images.unsplash.com/photo-1591208953465-64ae9596ca7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '5',
    title: 'Alphonso Mangoes',
    price: 8000,
    unit: 'quintal',
    location: 'Valsad, Gujarat',
    rating: 4.9,
    farmer: 'Dinesh Patel',
    category: 'Fruits',
    available: 150,
    harvestDate: '2024-03-20',
    description: 'Premium Alphonso mangoes, known for their rich, sweet flavor and aromatic fragrance. These mangoes are carefully grown and harvested at peak ripeness.',
    image: 'https://images.unsplash.com/photo-1591073113125-e46713c829ed?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '6',
    title: 'Sugarcane',
    price: 1900,
    unit: 'quintal',
    location: 'Anand, Gujarat',
    rating: 4.3,
    farmer: 'Ramesh Tadvi',
    category: 'Sugar Crops',
    available: 600,
    harvestDate: '2023-12-05',
    description: 'Fresh sugarcane with high sugar content, perfect for juice extraction and sugar production. This variety is known for its sweetness and juice yield.',
    image: 'https://images.unsplash.com/photo-1559825481-12a05cc00344?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  }
];

const ProductDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [product, setProduct] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [bidAmount, setBidAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userType, setUserType] = useState('');
  const [message, setMessage] = useState('');
  
  useEffect(() => {
    // Get product details from our sample data
    const productData = sampleProducts.find(item => item.id === id);
    setProduct(productData);
    
    // Get user info from localStorage
    const user = localStorage.getItem('marketyard_user');
    if (user) {
      setUserType(JSON.parse(user).userType);
    }
  }, [id]);

  const handlePlaceBid = () => {
    if (!bidAmount) return;
    
    setIsLoading(true);
    
    // Simulate bid placement
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Bid placed successfully!",
        description: `Your bid of ₹${bidAmount} has been placed. The farmer will be notified.`,
      });
      setBidAmount('');
    }, 1500);
  };

  const handleBuyNow = () => {
    setIsLoading(true);
    
    // Simulate purchase
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Purchase initiated!",
        description: `Your purchase of ${quantity} ${product.unit}(s) of ${product.title} has been initiated.`,
      });
    }, 1500);
  };

  const handleSendMessage = () => {
    if (!message) return;
    
    toast({
      title: "Message sent",
      description: "Your message has been sent to the farmer. They will respond soon.",
    });
    setMessage('');
  };

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <p>Loading product details...</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <Link to="/products" className="inline-flex items-center text-market-600 hover:text-market-700 mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Product Image */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-3"
            >
              <div className="rounded-2xl overflow-hidden h-[400px] md:h-[500px] shadow-lg">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="mt-10">
                <h3 className="text-2xl font-semibold text-market-900 mb-4">Description</h3>
                <p className="text-market-700">{product.description}</p>
                
                <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="p-4 rounded-xl bg-market-50">
                    <p className="text-market-500 text-sm">Category</p>
                    <div className="flex items-center mt-1">
                      <Tag className="text-market-700 mr-2 h-4 w-4" />
                      <p className="font-medium text-market-900">{product.category}</p>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-xl bg-market-50">
                    <p className="text-market-500 text-sm">Available Quantity</p>
                    <div className="flex items-center mt-1">
                      <ShoppingBasket className="text-market-700 mr-2 h-4 w-4" />
                      <p className="font-medium text-market-900">{product.available} {product.unit}</p>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-xl bg-market-50">
                    <p className="text-market-500 text-sm">Harvest Date</p>
                    <div className="flex items-center mt-1">
                      <Calendar className="text-market-700 mr-2 h-4 w-4" />
                      <p className="font-medium text-market-900">{new Date(product.harvestDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-xl bg-market-50">
                    <p className="text-market-500 text-sm">Rating</p>
                    <div className="flex items-center mt-1">
                      <Star className="text-yellow-500 fill-yellow-500 mr-2 h-4 w-4" />
                      <p className="font-medium text-market-900">{product.rating}/5</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Product Info and Actions */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <div className="sticky top-24">
                <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
                  <span className="inline-block px-3 py-1 bg-market-100 text-market-800 text-sm font-medium rounded-full mb-4">
                    {product.category}
                  </span>
                  
                  <h1 className="text-3xl font-bold text-market-900 mb-2">{product.title}</h1>
                  
                  <div className="flex items-center mb-4">
                    <MapPin className="text-market-500 mr-1 h-4 w-4" />
                    <span className="text-market-600">{product.location}</span>
                  </div>
                  
                  <div className="flex items-baseline mb-6">
                    <span className="text-3xl font-bold text-market-900">₹{product.price.toLocaleString()}</span>
                    <span className="ml-1 text-market-600">/{product.unit}</span>
                  </div>
                  
                  <div className="p-4 bg-market-50 rounded-xl mb-6">
                    <div className="flex items-start">
                      <div className="h-12 w-12 rounded-full bg-market-100 flex items-center justify-center text-market-700 mr-3">
                        <User className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-medium text-market-900">{product.farmer}</p>
                        <p className="text-sm text-market-600">Verified Farmer</p>
                        <Button variant="ghost" size="sm" className="mt-1 h-8 px-2 text-market-600">
                          <Phone className="h-3 w-3 mr-1" /> Contact
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  {userType === 'trader' && (
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <div className="w-1/3">
                          <label htmlFor="quantity" className="block text-sm font-medium text-market-700 mb-1">
                            Quantity
                          </label>
                          <Input
                            id="quantity"
                            type="number"
                            min="1"
                            value={quantity}
                            onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                          />
                        </div>
                        <div className="w-2/3 pl-3">
                          <label htmlFor="total" className="block text-sm font-medium text-market-700 mb-1">
                            Total Price
                          </label>
                          <div className="bg-gray-100 py-2 px-3 rounded-md border border-gray-200">
                            ₹{(product.price * quantity).toLocaleString()}
                          </div>
                        </div>
                      </div>
                      
                      <Button
                        className="w-full bg-market-600 hover:bg-market-700"
                        onClick={handleBuyNow}
                        disabled={isLoading}
                      >
                        {isLoading ? 'Processing...' : 'Buy Now'}
                      </Button>
                      
                      <div className="relative flex items-center">
                        <div className="flex-grow border-t border-gray-300"></div>
                        <span className="flex-shrink mx-4 text-gray-400">or</span>
                        <div className="flex-grow border-t border-gray-300"></div>
                      </div>
                      
                      <div>
                        <label htmlFor="bidAmount" className="block text-sm font-medium text-market-700 mb-1">
                          Your Bid (₹/{product.unit})
                        </label>
                        <div className="flex space-x-3">
                          <Input
                            id="bidAmount"
                            placeholder="Enter your bid amount"
                            value={bidAmount}
                            onChange={(e) => setBidAmount(e.target.value)}
                          />
                          <Button
                            variant="outline"
                            className="border-market-200 text-market-800 hover:bg-market-50"
                            onClick={handlePlaceBid}
                            disabled={isLoading || !bidAmount}
                          >
                            <ThumbsUp className="mr-2 h-4 w-4" />
                            Place Bid
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-6">
                    <h3 className="text-lg font-medium text-market-900 mb-3">Ask the Farmer</h3>
                    <div className="space-y-3">
                      <Input
                        placeholder="Type your message here..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                      <Button
                        className="w-full"
                        variant="outline"
                        onClick={handleSendMessage}
                        disabled={!message}
                      >
                        <MessageCircle className="mr-2 h-4 w-4" />
                        Send Message
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
