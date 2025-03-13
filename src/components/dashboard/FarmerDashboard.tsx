
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Package, Truck, BarChart3, MessageSquare } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

// Mock data for demonstration
const mockProducts = [
  { 
    id: '1', 
    title: 'Organic Wheat', 
    price: 2500, 
    available: 200, 
    unit: 'quintal', 
    bids: 5, 
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), 
    status: 'active',
    imageUrl: 'https://images.unsplash.com/photo-1574323347407-f5e1c5a1ec21?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  { 
    id: '2', 
    title: 'Premium Rice', 
    price: 3200, 
    available: 150, 
    unit: 'quintal', 
    bids: 3, 
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), 
    status: 'active',
    imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e8d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  { 
    id: '3', 
    title: 'Fresh Soybeans', 
    price: 4200, 
    available: 100, 
    unit: 'quintal', 
    bids: 0, 
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), 
    status: 'pending',
    imageUrl: 'https://images.unsplash.com/photo-1599481238556-e9b8544a2a23?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
];

const mockTransactions = [
  { 
    id: '1', 
    product: 'Premium Corn', 
    quantity: 150, 
    totalAmount: 375000, 
    buyer: 'Gujarat Traders Ltd.', 
    status: 'completed', 
    date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000) 
  },
  { 
    id: '2', 
    product: 'Organic Potatoes', 
    quantity: 75, 
    totalAmount: 187500, 
    buyer: 'Fresh Foods Inc.', 
    status: 'in-transit', 
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) 
  },
];

const mockMessages = [
  { 
    id: '1', 
    from: 'Rajesh Trading Co.', 
    subject: 'Inquiry about Organic Wheat', 
    message: 'Hello, I am interested in your organic wheat listing. Can you tell me more about the quality and harvest date?', 
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    read: false
  },
  { 
    id: '2', 
    from: 'Patel Exports', 
    subject: 'Bulk purchase inquiry', 
    message: 'We are looking to purchase bulk quantities of your premium rice for export. What is your best price for 500 quintals?', 
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    read: true
  },
];

interface FarmerDashboardProps {
  userId: string;
}

const FarmerDashboard = ({ userId }: FarmerDashboardProps) => {
  const [activeTab, setActiveTab] = useState('products');
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="stats flex flex-wrap gap-4">
          <Card className="w-40">
            <CardContent className="p-4">
              <p className="text-muted-foreground text-sm">Products</p>
              <p className="text-3xl font-bold">{mockProducts.length}</p>
            </CardContent>
          </Card>
          <Card className="w-40">
            <CardContent className="p-4">
              <p className="text-muted-foreground text-sm">Active Bids</p>
              <p className="text-3xl font-bold">8</p>
            </CardContent>
          </Card>
          <Card className="w-40">
            <CardContent className="p-4">
              <p className="text-muted-foreground text-sm">Sales</p>
              <p className="text-3xl font-bold">₹5.6L</p>
            </CardContent>
          </Card>
        </div>
        
        <Link to="/add-product">
          <Button className="bg-market-600 hover:bg-market-700">
            <Plus className="mr-2 h-4 w-4" />
            Add New Product
          </Button>
        </Link>
      </div>
      
      <Tabs defaultValue="products" className="mt-8" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4 max-w-2xl">
          <TabsTrigger value="products" className="flex items-center justify-center">
            <Package className="mr-2 h-4 w-4" />
            <span>My Products</span>
          </TabsTrigger>
          <TabsTrigger value="transactions" className="flex items-center justify-center">
            <Truck className="mr-2 h-4 w-4" />
            <span>Transactions</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center justify-center">
            <BarChart3 className="mr-2 h-4 w-4" />
            <span>Analytics</span>
          </TabsTrigger>
          <TabsTrigger value="messages" className="flex items-center justify-center">
            <MessageSquare className="mr-2 h-4 w-4" />
            <span>Messages</span>
            <span className="ml-2 inline-flex items-center justify-center h-5 w-5 rounded-full bg-market-100 text-market-800 text-xs">
              {mockMessages.filter(m => !m.read).length}
            </span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="products" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockProducts.map((product) => (
              <motion.div 
                key={product.id} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Card>
                  <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                    <img 
                      src={product.imageUrl} 
                      alt={product.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle>{product.title}</CardTitle>
                      <div className={`px-2 py-1 rounded-full text-xs ${
                        product.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {product.status === 'active' ? 'Active' : 'Pending'}
                      </div>
                    </div>
                    <CardDescription>
                      ₹{product.price} per {product.unit} • {product.available} {product.unit}s available
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between text-sm">
                      <div>
                        <span className="text-muted-foreground">Listed:</span>{' '}
                        {formatDistanceToNow(product.createdAt, { addSuffix: true })}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Bids:</span>{' '}
                        <span className="font-medium">{product.bids}</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 space-x-2 flex">
                      <Button size="sm" variant="outline" className="flex-1">
                        Edit
                      </Button>
                      <Link to={`/products/${product.id}`} className="flex-1">
                        <Button size="sm" className="w-full bg-market-600 hover:bg-market-700">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="transactions" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>View and manage your recent sales</CardDescription>
            </CardHeader>
            <CardContent>
              {mockTransactions.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium">Product</th>
                        <th className="text-left py-3 px-4 font-medium">Quantity</th>
                        <th className="text-left py-3 px-4 font-medium">Total Amount</th>
                        <th className="text-left py-3 px-4 font-medium">Buyer</th>
                        <th className="text-left py-3 px-4 font-medium">Status</th>
                        <th className="text-left py-3 px-4 font-medium">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockTransactions.map((transaction) => (
                        <tr key={transaction.id} className="border-b hover:bg-muted/50">
                          <td className="py-3 px-4">{transaction.product}</td>
                          <td className="py-3 px-4">{transaction.quantity} quintals</td>
                          <td className="py-3 px-4">₹{transaction.totalAmount.toLocaleString()}</td>
                          <td className="py-3 px-4">{transaction.buyer}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              transaction.status === 'completed' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              {transaction.status === 'completed' ? 'Completed' : 'In Transit'}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            {transaction.date.toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-10">
                  <p className="text-muted-foreground">No transactions yet</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Analytics</CardTitle>
              <CardDescription>Track your product performance and sales trends</CardDescription>
            </CardHeader>
            <CardContent className="h-96 flex items-center justify-center">
              <div className="text-center">
                <p className="text-muted-foreground mb-4">Analytics coming soon</p>
                <Button variant="outline">Explore Pro Features</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="messages" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Messages</CardTitle>
              <CardDescription>Inquiries and communications from traders</CardDescription>
            </CardHeader>
            <CardContent>
              {mockMessages.length > 0 ? (
                <div className="divide-y">
                  {mockMessages.map((message) => (
                    <div key={message.id} className={`py-4 px-2 ${message.read ? '' : 'bg-market-50'}`}>
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center">
                          {!message.read && (
                            <div className="w-2 h-2 rounded-full bg-market-600 mr-2"></div>
                          )}
                          <h4 className="font-semibold">{message.from}</h4>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {formatDistanceToNow(message.date, { addSuffix: true })}
                        </span>
                      </div>
                      <p className="font-medium text-sm mb-1">{message.subject}</p>
                      <p className="text-muted-foreground text-sm line-clamp-2 mb-2">{message.message}</p>
                      <Button variant="outline" size="sm">Reply</Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <p className="text-muted-foreground">No messages yet</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FarmerDashboard;
