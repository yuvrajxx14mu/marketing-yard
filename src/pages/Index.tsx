
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowRight, BarChart3, Truck, Shield, Users, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Features />
      
      {/* How It Works Section */}
      <section className="section bg-market-50">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="section-title">
              How <span className="text-market-600">MarketYard</span> Works
            </h2>
            <p className="section-subtitle text-center mx-auto">
              A simple process designed to connect farmers directly with traders, eliminating intermediaries.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Register & Create Profile',
                description: 'Sign up as a farmer or trader and complete your profile with relevant details.',
                delay: 0.2
              },
              {
                step: '02',
                title: 'List or Browse Products',
                description: 'Farmers can list their products while traders can browse and place bids.',
                delay: 0.4
              },
              {
                step: '03',
                title: 'Transact Securely',
                description: 'Finalize deals, arrange logistics, and complete secure payments on the platform.',
                delay: 0.6
              }
            ].map((item, index) => (
              <motion.div 
                key={index}
                className="text-center relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: item.delay }}
              >
                <div className="relative mb-8">
                  <div className="w-20 h-20 rounded-full bg-white shadow-subtle mx-auto flex items-center justify-center">
                    <span className="text-3xl font-bold text-market-600">{item.step}</span>
                  </div>
                  {index < 2 && (
                    <div className="absolute top-10 left-full w-full h-0.5 bg-market-200 hidden md:block" style={{ width: 'calc(50% - 2.5rem)' }}></div>
                  )}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-market-900">{item.title}</h3>
                <p className="text-market-600 px-4">{item.description}</p>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <Button className="btn-primary text-base flex items-center group mx-auto" size="lg">
              <span>Get Started Now</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="section bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <motion.div 
              className="lg:w-1/2"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="section-title mb-8">
                Benefits for <span className="text-market-600">Everyone</span>
              </h2>
              
              <div className="space-y-6">
                {[
                  {
                    icon: <BarChart3 className="h-5 w-5 text-market-500" />,
                    title: "Better Pricing",
                    description: "Farmers get fair prices while traders enjoy competitive rates without intermediaries."
                  },
                  {
                    icon: <Truck className="h-5 w-5 text-market-500" />,
                    title: "Streamlined Logistics",
                    description: "Integrated logistics solutions ensure timely pickup and delivery of products."
                  },
                  {
                    icon: <Shield className="h-5 w-5 text-market-500" />,
                    title: "Secure Transactions",
                    description: "Our escrow system ensures both parties are protected throughout the transaction process."
                  },
                  {
                    icon: <Users className="h-5 w-5 text-market-500" />,
                    title: "Growing Community",
                    description: "Join thousands of farmers and traders already benefiting from our platform."
                  }
                ].map((benefit, index) => (
                  <div key={index} className="flex">
                    <div className="mt-1 mr-4 w-10 h-10 rounded-full bg-market-50 flex items-center justify-center flex-shrink-0">
                      {benefit.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-market-900 mb-1">{benefit.title}</h3>
                      <p className="text-market-600">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              className="lg:w-1/2"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="rounded-2xl overflow-hidden shadow-2xl relative">
                <img 
                  src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                  alt="Farmers at market" 
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Global Impact */}
      <section className="section bg-gradient-to-br from-market-900 to-market-950 text-white py-24">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Making a <span className="text-market-300">Global Impact</span>
            </h2>
            <p className="text-xl md:text-2xl font-medium mb-12 text-market-100 max-w-3xl mx-auto">
              Our platform is transforming agricultural trade across regions.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: '50,000+', label: 'Farmers Empowered' },
              { number: '₹120Cr+', label: 'Transaction Volume' },
              { number: '25+', label: 'Agricultural Regions' },
              { number: '15,000+', label: 'Traders Connected' }
            ].map((stat, index) => (
              <motion.div 
                key={index} 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <h3 className="text-3xl md:text-4xl font-bold mb-2 text-white">{stat.number}</h3>
                  <p className="text-market-200">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="inline-flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
              <Globe className="h-5 w-5 text-market-300" />
              <span className="text-market-100">Our platform is active in 12 countries and growing rapidly</span>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="section bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="section-title mb-6">
              Ready to <span className="text-market-600">Transform</span> Your Agricultural Trade?
            </h2>
            <p className="text-lg text-market-600 mb-10 max-w-2xl mx-auto">
              Join thousands of farmers and traders who are already benefiting from our revolutionary platform.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button className="btn-primary text-base flex items-center group" size="lg">
                <span>Register as Farmer</span>
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button className="btn-secondary text-base" size="lg">
                Register as Trader
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
