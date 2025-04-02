
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronDown, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'py-2 bg-white/80 backdrop-blur-lg shadow-subtle' 
          : 'py-4 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="h-10 w-10 rounded-full bg-market-600 flex items-center justify-center">
            <span className="text-white font-bold text-lg">M</span>
          </div>
          <span className="logo-text bg-clip-text text-transparent bg-gradient-to-r from-market-800 to-market-600">
            MarketYard
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/products" className="nav-link">Products</Link>
          <div className="relative group">
            <button className="nav-link flex items-center">
              <span>About</span>
              <ChevronDown className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180" />
            </button>
            <div className="absolute left-0 mt-2 w-48 rounded-md bg-white shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-left">
              <Link to="/about" className="block px-4 py-2 text-sm text-market-800 hover:bg-market-50">Our Story</Link>
              <Link to="/about" className="block px-4 py-2 text-sm text-market-800 hover:bg-market-50">How It Works</Link>
              <Link to="/about" className="block px-4 py-2 text-sm text-market-800 hover:bg-market-50">Testimonials</Link>
            </div>
          </div>
          <Link to="/contact" className="nav-link">Contact</Link>
          {isAuthenticated && <Link to="/dashboard" className="nav-link">Dashboard</Link>}
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <span className="text-market-800">Hi, {user?.name || 'User'}</span>
              <Button variant="outline" className="border-market-200 text-market-800 hover:bg-market-50" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </div>
          ) : (
            <>
              <Link to="/auth">
                <Button variant="outline" className="border-market-200 text-market-800 hover:bg-market-50">
                  Sign In
                </Button>
              </Link>
              <Link to="/auth?signup=true">
                <Button className="bg-market-600 hover:bg-market-700 text-white">
                  Register
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden focus:outline-none" 
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <X className="h-6 w-6 text-market-800" />
          ) : (
            <Menu className="h-6 w-6 text-market-800" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden bg-white absolute w-full left-0 shadow-lg py-4 px-4 transition-all duration-300 ease-in-out transform ${
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10 pointer-events-none'
        }`}
      >
        <div className="flex flex-col space-y-4">
          <Link to="/" className="nav-link" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/products" className="nav-link" onClick={() => setIsOpen(false)}>Products</Link>
          <Link to="/about" className="nav-link" onClick={() => setIsOpen(false)}>About</Link>
          <Link to="/contact" className="nav-link" onClick={() => setIsOpen(false)}>Contact</Link>
          {isAuthenticated && (
            <Link to="/dashboard" className="nav-link" onClick={() => setIsOpen(false)}>Dashboard</Link>
          )}
          
          <div className="pt-4 flex flex-col space-y-2">
            {isAuthenticated ? (
              <Button 
                variant="outline" 
                className="w-full border-market-200 text-market-800 hover:bg-market-50"
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            ) : (
              <>
                <Link to="/auth" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" className="w-full border-market-200 text-market-800 hover:bg-market-50">
                    Sign In
                  </Button>
                </Link>
                <Link to="/auth?signup=true" onClick={() => setIsOpen(false)}>
                  <Button className="w-full bg-market-600 hover:bg-market-700 text-white">
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
