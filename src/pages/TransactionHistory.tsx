
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarIcon, Download, FileText, Filter, Search } from 'lucide-react';
import { format } from 'date-fns';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Transaction, TransactionStatus } from '@/types';

// Mock transactions for demonstration
const mockTransactionsFarmer = [
  { 
    id: '1', 
    productId: '101',
    product: 'Premium Wheat', 
    quantity: 50, 
    totalAmount: 125000, 
    farmerId: 'farmer-1',
    farmer: 'Yourself',
    traderId: 'trader-1',
    buyer: 'Gujarat Traders Ltd.', 
    status: 'completed' as TransactionStatus, 
    paymentStatus: 'completed' as const,
    date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000) 
  },
  { 
    id: '2', 
    productId: '102',
    product: 'Organic Rice', 
    quantity: 30, 
    totalAmount: 96000, 
    farmerId: 'farmer-1',
    farmer: 'Yourself',
    traderId: 'trader-2',
    buyer: 'Premium Foods Inc.', 
    status: 'in-transit' as TransactionStatus, 
    paymentStatus: 'pending' as const,
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) 
  },
  { 
    id: '3', 
    productId: '103',
    product: 'Fresh Potatoes', 
    quantity: 25, 
    totalAmount: 45000, 
    farmerId: 'farmer-1',
    farmer: 'Yourself',
    traderId: 'trader-3',
    buyer: 'Local Market Co.', 
    status: 'completed' as TransactionStatus, 
    paymentStatus: 'completed' as const,
    date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000) 
  },
];

const mockTransactionsTrader = [
  { 
    id: '1', 
    productId: '201',
    product: 'Premium Rice', 
    quantity: 50, 
    totalAmount: 157500, 
    farmerId: 'farmer-2',
    farmer: 'Suresh Desai', 
    traderId: 'trader-1',
    buyer: 'Yourself', 
    status: 'completed' as TransactionStatus, 
    paymentStatus: 'completed' as const,
    date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000) 
  },
  { 
    id: '2', 
    productId: '202',
    product: 'Organic Wheat', 
    quantity: 30, 
    totalAmount: 72000, 
    farmerId: 'farmer-3',
    farmer: 'Bhavesh Mehta', 
    traderId: 'trader-1',
    buyer: 'Yourself', 
    status: 'in-transit' as TransactionStatus, 
    paymentStatus: 'completed' as const,
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) 
  },
];

const TransactionHistory = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [activeTab, setActiveTab] = useState('all');
  
  // Determine which transactions to show based on user type
  const allTransactions = user?.userType === 'farmer' ? mockTransactionsFarmer : mockTransactionsTrader;
  
  // Filter transactions based on search, status, and date
  const filteredTransactions = allTransactions.filter(transaction => {
    const matchesSearch = transaction.product.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          transaction.buyer.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || transaction.status === selectedStatus;
    
    const matchesDate = !selectedDate || 
                        format(transaction.date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');
    
    const matchesTab = activeTab === 'all' || 
                       (activeTab === 'completed' && transaction.status === 'completed') ||
                       (activeTab === 'pending' && ['pending', 'in-transit'].includes(transaction.status));
    
    return matchesSearch && matchesStatus && matchesDate && matchesTab;
  });
  
  const handleViewInvoice = (transactionId: string) => {
    // In a real app, this would open or download the invoice
    toast({
      title: "Invoice downloaded",
      description: `Transaction #${transactionId} invoice has been downloaded.`,
    });
  };
  
  const handleRequestSupport = (transactionId: string) => {
    // In a real app, this would open a support request form or chat
    toast({
      title: "Support request created",
      description: `Support ticket for transaction #${transactionId} has been created.`,
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-market-900">Transaction History</h1>
              <p className="text-market-600 mt-2">
                {user?.userType === 'farmer' 
                  ? 'View your sales history and payment status' 
                  : 'Track your purchase history and delivery status'}
              </p>
            </div>
            
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <CardTitle>Your Transactions</CardTitle>
                    <CardDescription>
                      {user?.userType === 'farmer' 
                        ? 'Track all your crop sales and payments'
                        : 'Monitor your purchases and deliveries'}
                    </CardDescription>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      // In a real app, this would generate a report
                      toast({
                        title: "Report generated",
                        description: "Transaction report has been generated and downloaded.",
                      });
                    }}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Export Report
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent>
                <Tabs 
                  defaultValue="all" 
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="mb-6"
                >
                  <TabsList>
                    <TabsTrigger value="all">All Transactions</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                    <TabsTrigger value="pending">Pending</TabsTrigger>
                  </TabsList>
                </Tabs>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="relative">
                    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                    <Input
                      placeholder="Search transactions..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="w-full">
                      <Filter className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="in-transit">In Transit</SelectItem>
                      <SelectItem value="canceled">Canceled</SelectItem>
                      <SelectItem value="disputed">Disputed</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, 'PPP') : 'Filter by date'}
                        {selectedDate && (
                          <Button
                            variant="ghost"
                            className="h-8 w-8 p-0 ml-auto"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedDate(undefined);
                            }}
                          >
                            ×
                          </Button>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                {filteredTransactions.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-medium">Transaction ID</th>
                          <th className="text-left py-3 px-4 font-medium">Product</th>
                          <th className="text-left py-3 px-4 font-medium">Date</th>
                          <th className="text-left py-3 px-4 font-medium">
                            {user?.userType === 'farmer' ? 'Buyer' : 'Seller'}
                          </th>
                          <th className="text-left py-3 px-4 font-medium">Amount</th>
                          <th className="text-left py-3 px-4 font-medium">Status</th>
                          <th className="text-left py-3 px-4 font-medium">Payment</th>
                          <th className="text-left py-3 px-4 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredTransactions.map((transaction) => (
                          <tr key={transaction.id} className="border-b hover:bg-muted/50">
                            <td className="py-3 px-4">#{transaction.id}</td>
                            <td className="py-3 px-4">{transaction.product}</td>
                            <td className="py-3 px-4">{format(transaction.date, 'dd MMM yyyy')}</td>
                            <td className="py-3 px-4">
                              {user?.userType === 'farmer' ? transaction.buyer : transaction.farmer}
                            </td>
                            <td className="py-3 px-4">₹{transaction.totalAmount.toLocaleString()}</td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                transaction.status === 'completed' 
                                  ? 'bg-green-100 text-green-800' 
                                  : transaction.status === 'in-transit'
                                    ? 'bg-blue-100 text-blue-800'
                                    : transaction.status === 'pending'
                                      ? 'bg-yellow-100 text-yellow-800'
                                      : transaction.status === 'disputed'
                                        ? 'bg-red-100 text-red-800'
                                        : 'bg-gray-100 text-gray-800'
                              }`}>
                                {transaction.status === 'completed' 
                                  ? 'Completed' 
                                  : transaction.status === 'in-transit'
                                    ? 'In Transit'
                                    : transaction.status === 'pending'
                                      ? 'Pending'
                                      : transaction.status === 'disputed'
                                        ? 'Disputed'
                                        : 'Canceled'}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                transaction.paymentStatus === 'completed' 
                                  ? 'bg-green-100 text-green-800' 
                                  : transaction.paymentStatus === 'pending'
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : 'bg-red-100 text-red-800'
                              }`}>
                                {transaction.paymentStatus === 'completed' 
                                  ? 'Paid' 
                                  : transaction.paymentStatus === 'pending'
                                    ? 'Pending'
                                    : 'Failed'}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex space-x-2">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleViewInvoice(transaction.id)}
                                >
                                  <FileText className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleRequestSupport(transaction.id)}
                                >
                                  Support
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No transactions found</h3>
                    <p className="text-muted-foreground mb-6">
                      {searchTerm || selectedStatus !== 'all' || selectedDate
                        ? 'No transactions match your search filters.'
                        : user?.userType === 'farmer' 
                          ? 'You haven\'t sold any products yet.'
                          : 'You haven\'t made any purchases yet.'
                      }
                    </p>
                    <Button 
                      onClick={() => navigate('/products')}
                      className="bg-market-600 hover:bg-market-700"
                    >
                      {user?.userType === 'farmer' 
                        ? 'List a Product' 
                        : 'Browse Products'}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TransactionHistory;
