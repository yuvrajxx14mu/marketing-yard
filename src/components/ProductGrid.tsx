
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, SortDesc } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ProductCard';

// Sample product data
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
    image: 'https://images.unsplash.com/photo-1559825481-12a05cc00344?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  }
];

const categories = ['All', 'Grains', 'Vegetables', 'Fruits', 'Fibers', 'Sugar Crops'];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const ProductGrid = () => {
  const [products, setProducts] = useState(sampleProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Filter products based on search and category
  useEffect(() => {
    let filteredProducts = sampleProducts;
    
    if (searchTerm) {
      filteredProducts = filteredProducts.filter(product => 
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.farmer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedCategory !== 'All') {
      filteredProducts = filteredProducts.filter(product => 
        product.category === selectedCategory
      );
    }
    
    setProducts(filteredProducts);
  }, [searchTerm, selectedCategory]);

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Search and filter section */}
      <div className="mb-10 flex flex-col md:flex-row gap-4 items-center justify-between w-full">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-market-500 h-5 w-5" />
          <Input
            placeholder="Search products, farmers, or locations..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <Filter size={18} />
            Filter
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <SortDesc size={18} />
            Sort
          </Button>
        </div>
      </div>
      
      {/* Category filters */}
      {isFilterOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mb-8"
        >
          <h3 className="text-lg font-medium text-market-800 mb-3">Categories</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className={selectedCategory === category ? "bg-market-600" : ""}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Product grid */}
      {products.length > 0 ? (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </motion.div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20">
          <h3 className="text-2xl font-semibold text-market-800 mb-2">No products found</h3>
          <p className="text-market-600">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
