
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Search, Filter, ChevronDown, X } from 'lucide-react';

// Mock data for products
const mockProducts = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    title: 'Premium Quality Rice',
    price: 3200,
    unit: 'quintal',
    location: 'Baroda, Gujarat',
    rating: 4.8,
    farmer: 'Rajesh Patel',
    category: 'Grains'
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1601598840081-33593d392f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    title: 'Organic Wheat',
    price: 2800,
    unit: 'quintal',
    location: 'Ahmedabad, Gujarat',
    rating: 4.5,
    farmer: 'Suresh Desai',
    category: 'Grains'
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1589927986089-35812388d1f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    title: 'Fresh Red Tomatoes',
    price: 35,
    unit: 'kg',
    location: 'Surat, Gujarat',
    rating: 4.7,
    farmer: 'Meena Shah',
    category: 'Vegetables'
  },
  {
    id: '4',
    image: 'https://images.unsplash.com/photo-1570586437263-ab629fccc818?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    title: 'Green Chillies',
    price: 45,
    unit: 'kg',
    location: 'Rajkot, Gujarat',
    rating: 4.2,
    farmer: 'Bhavesh Modi',
    category: 'Vegetables'
  },
  {
    id: '5',
    image: 'https://images.unsplash.com/photo-1591100856186-c11e7fd05a44?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    title: 'Organic Cotton',
    price: 7200,
    unit: 'quintal',
    location: 'Gandhinagar, Gujarat',
    rating: 4.9,
    farmer: 'Prakash Joshi',
    category: 'Fiber'
  },
  {
    id: '6',
    image: 'https://images.unsplash.com/photo-1588867702719-969c8c265f33?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    title: 'Fresh Apples',
    price: 120,
    unit: 'kg',
    location: 'Himachal Pradesh',
    rating: 4.6,
    farmer: 'Vinod Sharma',
    category: 'Fruits'
  }
];

// Categories
const categories = [
  'All Products',
  'Grains',
  'Vegetables',
  'Fruits',
  'Spices',
  'Fiber',
  'Dairy',
  'Others'
];

const Products = () => {
  const [products, setProducts] = useState(mockProducts);
  const [activeCategory, setActiveCategory] = useState('All Products');
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    if (category === 'All Products') {
      setProducts(mockProducts);
    } else {
      setProducts(mockProducts.filter(product => product.category === category));
    }
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm) {
      setProducts(mockProducts.filter(product => 
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.farmer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.location.toLowerCase().includes(searchTerm.toLowerCase())
      ));
    } else {
      setProducts(mockProducts);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="pt-24 pb-10 bg-gradient-to-r from-market-900 to-market-800 text-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center py-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Agricultural Products</h1>
            <p className="text-lg text-market-100 max-w-2xl mx-auto">
              Browse high-quality agricultural products from verified farmers across the country.
            </p>
          </motion.div>
        </div>
      </div>
      
      {/* Search and Filter Section */}
      <div className="relative -mt-6 mb-8">
        <div className="container mx-auto px-4">
          <motion.div 
            className="bg-white rounded-xl shadow-lg p-4 md:p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 items-stretch">
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-market-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search products, farmers, locations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-market-500 transition-all"
                />
              </div>
              <div className="flex space-x-4">
                <Button 
                  type="button"
                  variant="outline"
                  className="border-market-200 text-market-800 hover:bg-market-50 flex items-center"
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  <span>Filters</span>
                  <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
                </Button>
                <Button 
                  type="submit"
                  className="bg-market-600 hover:bg-market-700 text-white"
                >
                  Search
                </Button>
              </div>
            </form>
            
            {/* Filters */}
            {isFilterOpen && (
              <motion.div 
                className="mt-4 pt-4 border-t border-gray-100"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex flex-wrap gap-3">
                  <div className="flex flex-col w-full md:w-auto">
                    <label className="text-sm font-medium text-market-800 mb-2">Price Range</label>
                    <div className="flex space-x-2">
                      <input 
                        type="number" 
                        placeholder="Min" 
                        className="w-24 px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-market-500"
                      />
                      <span className="text-market-500 self-center">-</span>
                      <input 
                        type="number" 
                        placeholder="Max" 
                        className="w-24 px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-market-500"
                      />
                    </div>
                  </div>
                  
                  <div className="flex flex-col w-full md:w-auto">
                    <label className="text-sm font-medium text-market-800 mb-2">Rating</label>
                    <select className="w-full md:w-48 px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-market-500">
                      <option value="">Any Rating</option>
                      <option value="4">4+ Stars</option>
                      <option value="3">3+ Stars</option>
                      <option value="2">2+ Stars</option>
                    </select>
                  </div>
                  
                  <div className="flex flex-col w-full md:w-auto">
                    <label className="text-sm font-medium text-market-800 mb-2">Location</label>
                    <select className="w-full md:w-48 px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-market-500">
                      <option value="">All Locations</option>
                      <option value="Gujarat">Gujarat</option>
                      <option value="Punjab">Punjab</option>
                      <option value="Maharashtra">Maharashtra</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex justify-end mt-4">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-market-600 border-market-200 hover:bg-market-50"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Clear Filters
                  </Button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
      
      {/* Products List */}
      <div className="container mx-auto px-4 pb-20">
        {/* Categories */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex space-x-2 min-w-max pb-1">
            {categories.map((category, index) => (
              <Button
                key={index}
                variant={activeCategory === category ? "default" : "outline"}
                className={`rounded-full ${
                  activeCategory === category 
                    ? 'bg-market-600 hover:bg-market-700 text-white' 
                    : 'border-market-200 text-market-800 hover:bg-market-50'
                }`}
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
        
        {/* Results count */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-market-600">
            Showing <span className="font-semibold">{products.length}</span> products
          </p>
          <div className="flex items-center">
            <span className="text-sm text-market-600 mr-2">Sort by:</span>
            <select className="px-3 py-1 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-market-500">
              <option value="latest">Latest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>
        
        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
        
        {/* Empty state */}
        {products.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-market-100 mb-4">
              <Search className="h-8 w-8 text-market-600" />
            </div>
            <h3 className="text-xl font-semibold text-market-900 mb-2">No products found</h3>
            <p className="text-market-600 mb-6">
              Try adjusting your search or filter criteria
            </p>
            <Button 
              variant="outline" 
              className="border-market-200 text-market-800 hover:bg-market-50"
              onClick={() => {
                setSearchTerm('');
                setActiveCategory('All Products');
                setProducts(mockProducts);
              }}
            >
              Clear all filters
            </Button>
          </div>
        )}
        
        {/* Load more button */}
        {products.length > 0 && (
          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              className="border-market-200 text-market-800 hover:bg-market-50"
            >
              Load More Products
            </Button>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Products;
