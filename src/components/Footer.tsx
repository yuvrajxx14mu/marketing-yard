
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-market-950 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="h-10 w-10 rounded-full bg-market-600 flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <span className="logo-text text-white">MarketYard</span>
            </div>
            <p className="text-market-200 mb-6">
              Connecting farmers and traders through technology, creating a fair and transparent 
              agricultural marketplace.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-market-300 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-market-300 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-market-300 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-market-300 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-market-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-market-300 hover:text-white transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-market-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-market-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-market-300 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-market-400 mt-0.5 mr-3 flex-shrink-0" />
                <span className="text-market-300">
                  Agricultural Market, Sector 27,<br />
                  Gandhinagar, Gujarat 382027
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-market-400 mr-3 flex-shrink-0" />
                <span className="text-market-300">+91 9876543210</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-market-400 mr-3 flex-shrink-0" />
                <span className="text-market-300">info@marketyard.com</span>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Newsletter</h3>
            <p className="text-market-300 mb-4">
              Subscribe to our newsletter to get updates on our latest offers and news.
            </p>
            <form className="space-y-3">
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="w-full bg-market-900 border border-market-700 rounded-lg px-4 py-3 text-market-200 focus:outline-none focus:ring-2 focus:ring-market-600"
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-market-600 hover:bg-market-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        {/* Bottom Footer */}
        <div className="pt-8 border-t border-market-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-market-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} MarketYard. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="/terms" className="text-market-400 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
            <Link to="/privacy" className="text-market-400 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/faq" className="text-market-400 hover:text-white text-sm transition-colors">
              FAQ
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
