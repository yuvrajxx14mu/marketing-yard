
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Clock, Truck, BarChart3, Search } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

// Mock data for demonstration
const mockBids = [
  { 
    id: '1', 
    productId: '1',
    productTitle: 'Organic Wheat', 
    farmerName: 'Ramesh Patel',
    bidAmount: 2400, 
    quantity: 50,
    unit: 'quintal', 
    totalValue: 120000,
    status: 'pending', 
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    imageUrl: 'https://images.unsplash.com/photo-1574323347407-f5e1c5a1ec21?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  { 
    id: '2', 
    productId: '2',
    productTitle: 'Premium Rice', 
    farmerName: 'Suresh Desai',
    bidAmount: 3150, 
    quantity: 30,
    unit: 'quintal', 
    totalValue: 94500,
    status: 'accepted', 
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e8d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  { 
    id: '3', 
    productId: '3',
    productTitle: 'Fresh Potatoes', 
    farmerName: 'Dinesh Kumar',
    bidAmount: 1800, 
    quantity: 25,
    unit: 'quintal', 
    totalValue: 45000,
    status: 'rejected', 
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    imageUrl: 'https://images.unsplash.com/photo-1508313880080-c4bef0730395?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
];

const mockPurchases = [
  { 
    id: '1', 
    product: 'Premium Rice', 
    quantity: 50, 
    totalAmount: 157500, 
    farmer: 'Suresh Desai', 
    status: 'completed', 
    date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000) 
  },
  { 
    id: '2', 
    product: 'Organic Wheat', 
    quantity: 30, 
    totalAmount: 72000, 
    farmer: 'Bhavesh Mehta', 
    status: 'in-transit', 
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) 
  },
];

interface TraderDashboardProps {
  userId: string;
}

const TraderDashboard = ({ userId }: TraderDashboardProps) => {
  const [activeTab, setActiveTab] = useState('bids');
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="stats flex flex-wrap gap-4">
          <Card className="w-40">
            <CardContent className="p-4">
              <p className="text-muted-foreground text-sm">Active Bids</p>
              <p className="text-3xl font-bold">{mockBids.filter(b => b.status === 'pending').length}</p>
            </CardContent>
          </Card>
          <Card className="w-40">
            <CardContent className="p-4">
              <p className="text-muted-foreground text-sm">Purchases</p>
              <p className="text-3xl font-bold">{mockPurchases.length}</p>
            </CardContent>
          </Card>
          <Card className="w-40">
            <CardContent className="p-4">
              <p className="text-muted-foreground text-sm">Spending</p>
              <p className="text-3xl font-bold">₹2.3L</p>
            </CardContent>
          </Card>
        </div>
        
        <Link to="/products">
          <Button className="bg-market-600 hover:bg-market-700">
            <Search className="mr-2 h-4 w-4" />
            Browse Products
          </Button>
        </Link>
      </div>
      
      <Tabs defaultValue="bids" className="mt-8" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 max-w-md">
          <TabsTrigger value="bids" className="flex items-center justify-center">
            <Clock className="mr-2 h-4 w-4" />
            <span>My Bids</span>
          </TabsTrigger>
          <TabsTrigger value="purchases" className="flex items-center justify-center">
            <ShoppingCart className="mr-2 h-4 w-4" />
            <span>Purchases</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center justify-center">
            <BarChart3 className="mr-2 h-4 w-4" />
            <span>Analytics</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="bids" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockBids.map((bid) => (
              <motion.div 
                key={bid.id} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Card>
                  <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                    <img 
                      src={bid.imageUrl} 
                      alt={bid.productTitle} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle>{bid.productTitle}</CardTitle>
                      <div className={`px-2 py-1 rounded-full text-xs ${
                        bid.status === 'pending' 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : bid.status === 'accepted' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                      }`}>
                        {bid.status === 'pending' 
                          ? 'Pending' 
                          : bid.status === 'accepted' 
                            ? 'Accepted' 
                            : 'Rejected'}
                      </div>
                    </div>
                    <CardDescription>
                      Bid: ₹{bid.bidAmount} per {bid.unit} • {bid.quantity} {bid.unit}s
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between text-sm mb-2">
                      <div>
                        <span className="text-muted-foreground">Farmer:</span>{' '}
                        {bid.farmerName}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Total:</span>{' '}
                        <span className="font-medium">₹{bid.totalValue.toLocaleString()}</span>
                      </div>
                    </div>
                    
                    <div className="text-sm mb-4">
                      <span className="text-muted-foreground">Bid placed:</span>{' '}
                      {formatDistanceToNow(bid.createdAt, { addSuffix: true })}
                    </div>
                    
                    <div className="mt-4 space-x-2 flex">
                      {bid.status === 'pending' && (
                        <Button size="sm" variant="outline" className="flex-1">
                          Update Bid
                        </Button>
                      )}
                      <Link to={`/products/${bid.productId}`} className="flex-1">
                        <Button size="sm" className="w-full bg-market-600 hover:bg-market-700">
                          View Product
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="purchases" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Purchases</CardTitle>
              <CardDescription>Track your orders and deliveries</CardDescription>
            </CardHeader>
            <CardContent>
              {mockPurchases.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium">Product</th>
                        <th className="text-left py-3 px-4 font-medium">Quantity</th>
                        <th className="text-left py-3 px-4 font-medium">Total Amount</th>
                        <th className="text-left py-3 px-4 font-medium">Farmer</th>
                        <th className="text-left py-3 px-4 font-medium">Status</th>
                        <th className="text-left py-3 px-4 font-medium">Date</th>
                        <th className="text-left py-3 px-4 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockPurchases.map((purchase) => (
                        <tr key={purchase.id} className="border-b hover:bg-muted/50">
                          <td className="py-3 px-4">{purchase.product}</td>
                          <td className="py-3 px-4">{purchase.quantity} quintals</td>
                          <td className="py-3 px-4">₹{purchase.totalAmount.toLocaleString()}</td>
                          <td className="py-3 px-4">{purchase.farmer}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              purchase.status === 'completed' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              {purchase.status === 'completed' ? 'Completed' : 'In Transit'}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            {purchase.date.toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4">
                            <Button variant="outline" size="sm">Details</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-10">
                  <p className="text-muted-foreground">No purchases yet</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Analytics</CardTitle>
              <CardDescription>Track your purchase history and market trends</CardDescription>
            </CardHeader>
            <CardContent className="h-96 flex items-center justify-center">
              <div className="text-center">
                <p className="text-muted-foreground mb-4">Analytics coming soon</p>
                <Button variant="outline">Explore Pro Features</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TraderDashboard;
