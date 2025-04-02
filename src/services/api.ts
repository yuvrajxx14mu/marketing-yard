
import { 
  User, 
  Product, 
  Bid, 
  Transaction, 
  Message, 
  FarmerProfile, 
  TraderProfile, 
  UserRole,
  UserStatus,
  ProductStatus,
  BidStatus,
  TransactionStatus,
  PaymentStatus
} from '@/types';

// Base URL for API calls
const API_BASE_URL = '/api';

// Helper function for making API requests
const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  try {
    // For development, we'll use mock data
    // In production, this would hit actual API endpoints
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // For now, we'll throw errors for specific endpoints to test error handling
    if (endpoint.includes('error-test')) {
      throw new Error('API Error: This is a test error');
    }
    
    // Handle the request based on the endpoint
    // This would be replaced with actual fetch calls in production
    return handleMockResponse(endpoint, options);
    
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// Helper function to create mock responses of the correct type
const createMockResponse = <T>(data: any): T => {
  return data as unknown as T;
};

// Mock data generators
const generateMockProducts = (): Product[] => {
  return [
    {
      id: '1',
      title: 'Premium Wheat',
      description: 'High-quality wheat grain',
      category: 'Grains',
      price: 2500,
      quantity: 100,
      unit: 'quintal',
      imageUrl: 'https://example.com/wheat.jpg',
      farmerId: '101',
      farmerName: 'Rajesh Patel',
      location: 'Punjab',
      status: 'available',
      quality: 'Premium',
      harvestDate: new Date(2023, 5, 15),
      createdAt: new Date(2023, 6, 1)
    }
  ] as Product[];
};

const generateMockBids = (): Bid[] => {
  return [
    {
      id: '1',
      productId: '1',
      productTitle: 'Premium Wheat',
      farmerId: '101',
      farmerName: 'Rajesh Patel',
      traderId: '201',
      traderName: 'Anita Desai',
      bidAmount: 2300,
      quantity: 50,
      unit: 'quintal',
      totalValue: 115000,
      message: 'Interested in your premium wheat',
      status: 'pending',
      createdAt: new Date(2023, 6, 5),
      imageUrl: 'https://example.com/wheat.jpg'
    }
  ] as Bid[];
};

const generateMockTransactions = (): Transaction[] => {
  return [
    {
      id: '1',
      productId: '1',
      product: 'Premium Wheat',
      bidId: '1',
      farmerId: '101',
      farmer: 'Rajesh Patel',
      traderId: '201',
      buyer: 'Anita Desai',
      quantity: 50,
      totalAmount: 115000,
      status: 'completed',
      paymentStatus: 'completed',
      paymentMethod: 'Bank Transfer',
      deliveryAddress: 'Market Yard, Mumbai',
      deliveryDate: new Date(2023, 6, 10),
      date: new Date(2023, 6, 7)
    }
  ] as Transaction[];
};

const generateMockMessages = (): Message[] => {
  return [
    {
      id: '1',
      senderId: '101',
      senderName: 'Rajesh Patel',
      receiverId: '201',
      receiverName: 'Anita Desai',
      content: 'Hello, I saw your listing for premium wheat.',
      type: 'chat',
      read: true,
      createdAt: new Date(2023, 6, 3)
    }
  ] as Message[];
};

// Helper function to simulate API responses with mock data
const handleMockResponse = (endpoint: string, options: RequestInit) => {
  // Extract method and body from options
  const method = options.method || 'GET';
  const body = options.body ? JSON.parse(options.body as string) : {};
  
  // Mock authentication
  if (endpoint === '/auth/login') {
    const { email, password, userType } = body;
    // In a real app, this would validate credentials against a database
    return {
      id: '123',
      name: 'Demo User',
      email,
      userType,
      status: 'active',
      createdAt: new Date()
    };
  }
  
  // Mock user registration
  if (endpoint === '/auth/register') {
    const { name, email, userType } = body;
    return {
      id: '123',
      name,
      email,
      userType,
      status: 'active',
      createdAt: new Date()
    };
  }
  
  // Get current user from localStorage for mock purposes
  const getCurrentUser = (): User | null => {
    const userStr = localStorage.getItem('marketyard_user');
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch (e) {
      return null;
    }
  };
  
  // Mock API endpoints with appropriate return types
  if (endpoint.startsWith('/products')) {
    return createMockResponse<Product[] | Product>(generateMockProducts());
  }
  
  if (endpoint.startsWith('/farmers') && endpoint.includes('/products')) {
    return createMockResponse<Product[]>(generateMockProducts());
  }
  
  if (endpoint.startsWith('/bids')) {
    return createMockResponse<Bid[] | Bid>(generateMockBids());
  }
  
  if (endpoint.startsWith('/traders') && endpoint.includes('/bids')) {
    return createMockResponse<Bid[]>(generateMockBids());
  }
  
  if (endpoint.startsWith('/farmers') && endpoint.includes('/bids')) {
    return createMockResponse<Bid[]>(generateMockBids());
  }
  
  if (endpoint.startsWith('/transactions')) {
    return createMockResponse<Transaction[] | Transaction>(generateMockTransactions());
  }
  
  if (endpoint.startsWith('/traders') && endpoint.includes('/transactions')) {
    return createMockResponse<Transaction[]>(generateMockTransactions());
  }
  
  if (endpoint.startsWith('/farmers') && endpoint.includes('/transactions')) {
    return createMockResponse<Transaction[]>(generateMockTransactions());
  }
  
  if (endpoint.startsWith('/users') && endpoint.includes('/messages')) {
    return createMockResponse<Message[]>(generateMockMessages());
  }
  
  if (endpoint.startsWith('/conversations')) {
    return createMockResponse<Message[]>(generateMockMessages());
  }
  
  if (endpoint.startsWith('/messages')) {
    return createMockResponse<Message>(generateMockMessages()[0]);
  }
  
  if (endpoint.startsWith('/admin/users')) {
    return createMockResponse<User[]>([{
      id: '123',
      name: 'Demo User',
      email: 'demo@example.com',
      userType: 'farmer',
      status: 'active',
      createdAt: new Date()
    }]);
  }
  
  if (endpoint.startsWith('/admin/products')) {
    return createMockResponse<Product[]>(generateMockProducts());
  }
  
  if (endpoint.startsWith('/admin/transactions')) {
    return createMockResponse<Transaction[]>(generateMockTransactions());
  }
  
  // Default fallback
  return { message: 'Mock response not implemented for this endpoint' };
};

// Authentication services
export const authService = {
  login: async (email: string, password: string, userType: UserRole): Promise<User> => {
    const response = await apiRequest('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, userType })
    });
    
    // Store user in localStorage for our mock implementation
    localStorage.setItem('marketyard_user', JSON.stringify(response));
    
    return response as User;
  },
  
  register: async (name: string, email: string, password: string, userType: UserRole): Promise<User> => {
    const response = await apiRequest('/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, userType })
    });
    
    return response as User;
  },
  
  logout: async (): Promise<void> => {
    // In a real app, this would call the backend to invalidate the session
    // For our mock implementation, just remove from localStorage
    localStorage.removeItem('marketyard_user');
  },
  
  getCurrentUser: (): User | null => {
    const userStr = localStorage.getItem('marketyard_user');
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch (e) {
      return null;
    }
  }
};

// Product services
export const productService = {
  getAllProducts: async (): Promise<Product[]> => {
    const response = await apiRequest('/products');
    return response as Product[];
  },
  
  getProductById: async (id: string): Promise<Product> => {
    const response = await apiRequest(`/products/${id}`);
    return response as Product;
  },
  
  getFarmerProducts: async (farmerId: string): Promise<Product[]> => {
    const response = await apiRequest(`/farmers/${farmerId}/products`);
    return response as Product[];
  },
  
  createProduct: async (product: Omit<Product, 'id' | 'createdAt'>): Promise<Product> => {
    const response = await apiRequest('/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    });
    return response as Product;
  },
  
  updateProduct: async (id: string, updates: Partial<Product>): Promise<Product> => {
    const response = await apiRequest(`/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    return response as Product;
  },
  
  deleteProduct: async (id: string): Promise<void> => {
    await apiRequest(`/products/${id}`, {
      method: 'DELETE'
    });
  }
};

// Bid services
export const bidService = {
  getAllBids: async (): Promise<Bid[]> => {
    const response = await apiRequest('/bids');
    return response as Bid[];
  },
  
  getBidById: async (id: string): Promise<Bid> => {
    const response = await apiRequest(`/bids/${id}`);
    return response as Bid;
  },
  
  getTraderBids: async (traderId: string): Promise<Bid[]> => {
    const response = await apiRequest(`/traders/${traderId}/bids`);
    return response as Bid[];
  },
  
  getFarmerBids: async (farmerId: string): Promise<Bid[]> => {
    const response = await apiRequest(`/farmers/${farmerId}/bids`);
    return response as Bid[];
  },
  
  createBid: async (bid: Omit<Bid, 'id' | 'createdAt'>): Promise<Bid> => {
    const response = await apiRequest('/bids', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bid)
    });
    return response as Bid;
  },
  
  updateBidStatus: async (id: string, status: BidStatus): Promise<Bid> => {
    const response = await apiRequest(`/bids/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    return response as Bid;
  },
  
  deleteBid: async (id: string): Promise<void> => {
    await apiRequest(`/bids/${id}`, {
      method: 'DELETE'
    });
  }
};

// Transaction services
export const transactionService = {
  getAllTransactions: async (): Promise<Transaction[]> => {
    const response = await apiRequest('/transactions');
    return response as Transaction[];
  },
  
  getTransactionById: async (id: string): Promise<Transaction> => {
    const response = await apiRequest(`/transactions/${id}`);
    return response as Transaction;
  },
  
  getTraderTransactions: async (traderId: string): Promise<Transaction[]> => {
    const response = await apiRequest(`/traders/${traderId}/transactions`);
    return response as Transaction[];
  },
  
  getFarmerTransactions: async (farmerId: string): Promise<Transaction[]> => {
    const response = await apiRequest(`/farmers/${farmerId}/transactions`);
    return response as Transaction[];
  },
  
  createTransaction: async (transaction: Omit<Transaction, 'id' | 'date'>): Promise<Transaction> => {
    const response = await apiRequest('/transactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(transaction)
    });
    return response as Transaction;
  },
  
  updateTransactionStatus: async (id: string, status: TransactionStatus): Promise<Transaction> => {
    const response = await apiRequest(`/transactions/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    return response as Transaction;
  },
  
  updatePaymentStatus: async (id: string, paymentStatus: PaymentStatus): Promise<Transaction> => {
    const response = await apiRequest(`/transactions/${id}/payment`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ paymentStatus })
    });
    return response as Transaction;
  }
};

// Message services
export const messageService = {
  getUserMessages: async (userId: string): Promise<Message[]> => {
    const response = await apiRequest(`/users/${userId}/messages`);
    return response as Message[];
  },
  
  getConversation: async (user1Id: string, user2Id: string): Promise<Message[]> => {
    const response = await apiRequest(`/conversations?user1=${user1Id}&user2=${user2Id}`);
    return response as Message[];
  },
  
  sendMessage: async (message: Omit<Message, 'id' | 'createdAt'>): Promise<Message> => {
    const response = await apiRequest('/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(message)
    });
    return response as Message;
  },
  
  markAsRead: async (messageId: string): Promise<Message> => {
    const response = await apiRequest(`/messages/${messageId}/read`, {
      method: 'PUT'
    });
    return response as Message;
  }
};

// User profile services
export const userService = {
  getFarmerProfile: async (farmerId: string): Promise<FarmerProfile> => {
    const response = await apiRequest(`/farmers/${farmerId}/profile`);
    return response as FarmerProfile;
  },
  
  getTraderProfile: async (traderId: string): Promise<TraderProfile> => {
    const response = await apiRequest(`/traders/${traderId}/profile`);
    return response as TraderProfile;
  },
  
  updateUserProfile: async (userId: string, updates: Partial<User>): Promise<User> => {
    const response = await apiRequest(`/users/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    return response as User;
  },
  
  updateFarmerProfile: async (farmerId: string, updates: Partial<FarmerProfile>): Promise<FarmerProfile> => {
    const response = await apiRequest(`/farmers/${farmerId}/profile`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    return response as FarmerProfile;
  },
  
  updateTraderProfile: async (traderId: string, updates: Partial<TraderProfile>): Promise<TraderProfile> => {
    const response = await apiRequest(`/traders/${traderId}/profile`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    return response as TraderProfile;
  }
};

// Admin services
export const adminService = {
  getAllUsers: async (): Promise<User[]> => {
    const response = await apiRequest('/admin/users');
    return response as User[];
  },
  
  updateUserStatus: async (userId: string, status: UserStatus): Promise<User> => {
    const response = await apiRequest(`/admin/users/${userId}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    return response as User;
  },
  
  getAllProducts: async (): Promise<Product[]> => {
    const response = await apiRequest('/admin/products');
    return response as Product[];
  },
  
  updateProductStatus: async (productId: string, status: ProductStatus): Promise<Product> => {
    const response = await apiRequest(`/admin/products/${productId}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    return response as Product;
  },
  
  getAllTransactions: async (): Promise<Transaction[]> => {
    const response = await apiRequest('/admin/transactions');
    return response as Transaction[];
  },
  
  getAnalytics: async (): Promise<any> => {
    const response = await apiRequest('/admin/analytics');
    return response;
  }
};

export default {
  authService,
  productService,
  bidService,
  transactionService,
  messageService,
  userService,
  adminService
};
