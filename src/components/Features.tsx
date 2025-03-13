
import { motion } from 'framer-motion';
import { 
  ShoppingBasket, 
  MessageSquare, 
  TrendingUp, 
  CreditCard, 
  Shield, 
  BarChart4 
} from 'lucide-react';

const features = [
  {
    icon: <ShoppingBasket className="h-6 w-6 text-market-500" />,
    title: "Product Listings",
    description: "Farmers can easily list their agricultural products with detailed descriptions, images, and pricing."
  },
  {
    icon: <MessageSquare className="h-6 w-6 text-market-500" />,
    title: "Direct Communication",
    description: "In-platform messaging system allows farmers and traders to communicate directly, building trust."
  },
  {
    icon: <TrendingUp className="h-6 w-6 text-market-500" />,
    title: "Live Price Updates",
    description: "Real-time price trends help farmers and traders make informed decisions for maximum profitability."
  },
  {
    icon: <CreditCard className="h-6 w-6 text-market-500" />,
    title: "Secure Transactions",
    description: "Built-in payment system ensures safe and timely transactions between parties."
  },
  {
    icon: <Shield className="h-6 w-6 text-market-500" />,
    title: "Verified Users",
    description: "All users undergo verification to ensure a trusted marketplace environment."
  },
  {
    icon: <BarChart4 className="h-6 w-6 text-market-500" />,
    title: "Market Analytics",
    description: "Detailed analytics help users understand market trends and optimize their strategies."
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const Features = () => {
  return (
    <section className="section bg-white" id="features">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">
            Our <span className="text-market-600">Platform Features</span>
          </h2>
          <p className="section-subtitle text-center mx-auto">
            Designed to streamline agricultural trading with powerful tools for farmers and traders alike.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              className="p-6 rounded-2xl hover:shadow-hover border border-gray-100 transition-all duration-300 ease-in-out"
              variants={item}
            >
              <div className="w-14 h-14 rounded-xl bg-market-50 flex items-center justify-center mb-5">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-market-900">{feature.title}</h3>
              <p className="text-market-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
