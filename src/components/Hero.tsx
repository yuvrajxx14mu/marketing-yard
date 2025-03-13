
import { motion } from 'framer-motion';
import { ArrowRight, Sprout, Users, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-white to-market-50 pt-20">
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute top-10 left-10 w-72 h-72 bg-market-200 rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-farm-200 rounded-full mix-blend-multiply filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 pt-16 pb-24 md:pt-24 md:pb-32 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <motion.div 
            className="md:w-1/2 mb-12 md:mb-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="inline-block px-3 py-1 rounded-full bg-market-100 text-market-800 font-medium text-sm mb-6">
              Revolutionizing Agricultural Trade
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-market-950 mb-6">
              Connect Farmers <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-market-700 to-market-500">with Traders</span> <br />
              Seamlessly
            </h1>
            
            <p className="text-lg md:text-xl text-market-700 mb-8 max-w-lg">
              Direct farm-to-market platform that empowers farmers and traders with transparent pricing and secure transactions.
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button className="btn-primary text-base flex items-center group" size="lg">
                <span>Get Started</span>
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" className="btn-outline text-base" size="lg">
                Learn More
              </Button>
            </div>
          </motion.div>
          
          <motion.div 
            className="md:w-1/2 relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1595872203318-3c79258990c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                  alt="Farmers and traders connecting" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Stats cards */}
              <motion.div 
                className="absolute -bottom-6 -left-6 p-4 glass-card rounded-xl shadow-lg w-48"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-market-100">
                    <Sprout className="h-5 w-5 text-market-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-xs text-market-600 font-medium">Products Listed</p>
                    <p className="text-xl font-bold text-market-900">1,430+</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="absolute -top-6 -right-6 p-4 glass-card rounded-xl shadow-lg w-48"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
              >
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-farm-100">
                    <Users className="h-5 w-5 text-farm-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-xs text-farm-600 font-medium">Active Users</p>
                    <p className="text-xl font-bold text-farm-900">5,200+</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 p-4 glass-card rounded-xl shadow-lg w-48"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-trade-100">
                    <TrendingUp className="h-5 w-5 text-trade-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-xs text-trade-600 font-medium">Monthly Growth</p>
                    <p className="text-xl font-bold text-trade-900">24%</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
        
        {/* Brands/Partners */}
        <div className="mt-20 md:mt-32">
          <p className="text-center text-market-500 text-sm font-medium mb-8">TRUSTED BY LEADING AGRICULTURAL ORGANIZATIONS</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-70">
            {['Brand 1', 'Brand 2', 'Brand 3', 'Brand 4', 'Brand 5'].map((brand, index) => (
              <div key={index} className="flex items-center justify-center">
                <div className="h-6 md:h-8 w-24 md:w-32 bg-market-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
