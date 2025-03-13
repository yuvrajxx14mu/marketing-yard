
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductGrid from '@/components/ProductGrid';

const Products = () => {
  const [userType, setUserType] = useState(() => {
    const user = localStorage.getItem('marketyard_user');
    if (user) {
      return JSON.parse(user).userType;
    }
    return null;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <div>
                <h1 className="text-4xl font-bold text-market-900">Marketplace</h1>
                <p className="text-xl text-market-600 mt-2">
                  Discover fresh agricultural products directly from farmers
                </p>
              </div>
              
              {userType === 'farmer' && (
                <Link to="/add-product">
                  <Button className="bg-market-600 hover:bg-market-700">
                    <Plus className="mr-2 h-4 w-4" />
                    List New Product
                  </Button>
                </Link>
              )}
            </div>
            
            <ProductGrid />
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Products;
