
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FarmerDashboard from '@/components/dashboard/FarmerDashboard';
import TraderDashboard from '@/components/dashboard/TraderDashboard';
import { useAuth } from '@/context/AuthContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isLoading, isAuthenticated } = useAuth();

  useEffect(() => {
    // Check if user is logged in
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please sign in to access your dashboard.",
        variant: "destructive",
      });
      navigate('/auth');
    }
  }, [isLoading, isAuthenticated, navigate, toast]);

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
            {isLoading ? (
              <div className="flex justify-center items-center min-h-[50vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-market-600"></div>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <h1 className="text-4xl font-bold text-market-900">
                    Welcome, {user?.name || 'User'}
                  </h1>
                  <p className="text-xl text-market-600 mt-2">
                    Manage your {user?.userType === 'farmer' ? 'farm products' : 'purchases and bids'} in one place
                  </p>
                </div>
                
                {user?.userType === 'farmer' ? (
                  <FarmerDashboard userId={user.id} />
                ) : (
                  <TraderDashboard userId={user.id} />
                )}
              </>
            )}
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
