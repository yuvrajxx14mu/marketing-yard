
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Star, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProductCardProps {
  id: string;
  image: string;
  title: string;
  price: number;
  unit: string;
  location: string;
  rating: number;
  farmer: string;
  category: string;
}

const ProductCard = ({
  id,
  image,
  title,
  price,
  unit,
  location,
  rating,
  farmer,
  category
}: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      className="product-card overflow-hidden rounded-2xl bg-white border border-gray-100 transition-all duration-300"
      whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Link to={`/products/${id}`}>
        <div className="relative h-52 overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.5 }}
          />
          <div className="absolute top-3 left-3 z-20">
            <span className="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-medium text-market-800 rounded-full">
              <Tag className="inline-block w-3 h-3 mr-1" />
              {category}
            </span>
          </div>
        </div>
        
        <div className="p-5">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-lg text-market-900 line-clamp-1">{title}</h3>
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span className="text-xs font-medium ml-1">{rating}</span>
            </div>
          </div>
          
          <div className="flex items-center text-sm text-market-500 mb-3">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="line-clamp-1">{location}</span>
          </div>
          
          <div className="flex items-baseline mb-4">
            <span className="text-xl font-bold text-market-900">₹{price.toLocaleString()}</span>
            <span className="ml-1 text-market-600 text-sm">/{unit}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <p className="text-xs text-market-600">
              Farmer: <span className="font-medium">{farmer}</span>
            </p>
            <Button variant="ghost" size="sm" className="text-market-700 font-medium hover:text-market-800 hover:bg-market-50">
              View Details
            </Button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
