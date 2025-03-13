
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AdminSidebar from '@/components/admin/AdminSidebar';
import UsersManagement from '@/components/admin/UsersManagement';
import ProductsManagement from '@/components/admin/ProductsManagement';
import MarketAnalytics from '@/components/admin/MarketAnalytics';

type AdminTab = 'users' | 'products' | 'analytics';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeTab, setActiveTab] = useState<AdminTab>('users');

  useEffect(() => {
    // Check if user is logged in and is admin
    const userData = localStorage.getItem('marketyard_user');
    if (!userData) {
      toast({
        title: "Authentication required",
        description: "Please sign in to access admin dashboard.",
        variant: "destructive",
      });
      navigate('/auth');
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);
      // Simulate admin check - in a real app, this would come from the backend
      // For demo purposes, we'll make all users admins
      setIsAdmin(true);
      setIsLoading(false);
    } catch (e) {
      console.error('Error parsing user data:', e);
      toast({
        title: "Authentication error",
        description: "There was a problem with your login. Please sign in again.",
        variant: "destructive",
      });
      navigate('/auth');
    }
  }, [navigate, toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-market-600"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex justify-center items-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
            <p className="text-market-600 mb-6">You don't have permission to access the admin dashboard.</p>
            <button 
              onClick={() => navigate('/')} 
              className="px-4 py-2 bg-market-600 text-white rounded-md hover:bg-market-700 transition-colors"
            >
              Go back to home
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold text-market-900 mb-8">Admin Dashboard</h1>
            
            <div className="flex flex-col md:flex-row gap-6">
              <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
              
              <div className="flex-1">
                {activeTab === 'users' && <UsersManagement />}
                {activeTab === 'products' && <ProductsManagement />}
                {activeTab === 'analytics' && <MarketAnalytics />}
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminDashboard;
