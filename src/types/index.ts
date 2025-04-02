
// User types
export type UserRole = 'farmer' | 'trader' | 'admin';

export type UserStatus = 'active' | 'inactive' | 'pending' | 'blocked';

export interface User {
  id: string;
  name: string;
  email: string;
  userType: UserRole;
  phone?: string;
  address?: string;
  avatar?: string;
  status: UserStatus;
  createdAt: Date;
}

export interface FarmerProfile extends User {
  bankDetails?: {
    accountName: string;
    accountNumber: string;
    bankName: string;
    ifscCode: string;
  };
  totalProducts?: number;
  totalSales?: number;
  rating?: number;
}

export interface TraderProfile extends User {
  businessName?: string;
  businessType?: string;
  gstNumber?: string;
  totalPurchases?: number;
  totalSpent?: number;
}

// Product types
export type ProductCategory = 'Grains' | 'Vegetables' | 'Fruits' | 'Fibers' | 'Spices' | 'Other';

export type ProductStatus = 'available' | 'pending' | 'sold' | 'rejected';

export interface Product {
  id: string;
  title: string;
  description: string;
  category: ProductCategory;
  price: number;
  quantity: number;
  unit: string;
  imageUrl: string;
  farmerId: string;
  farmerName: string;
  location?: string;
  status: ProductStatus;
  quality?: string;
  harvestDate?: Date;
  createdAt: Date;
}

// Bid types
export type BidStatus = 'pending' | 'accepted' | 'rejected' | 'expired';

export interface Bid {
  id: string;
  productId: string;
  productTitle: string;
  farmerId: string;
  farmerName: string;
  traderId: string;
  traderName: string;
  bidAmount: number;
  quantity: number;
  unit: string;
  totalValue: number;
  message?: string;
  status: BidStatus;
  createdAt: Date;
  updatedAt?: Date;
  imageUrl?: string;
}

// Transaction types
export type TransactionStatus = 'pending' | 'completed' | 'in-transit' | 'canceled' | 'disputed';

export type PaymentStatus = 'pending' | 'completed' | 'refunded' | 'failed';

export interface Transaction {
  id: string;
  productId: string;
  product: string;
  bidId?: string;
  farmerId: string;
  farmer: string;
  traderId: string;
  buyer: string;
  quantity: number;
  totalAmount: number;
  status: TransactionStatus;
  paymentStatus: PaymentStatus;
  paymentMethod?: string;
  deliveryAddress?: string;
  deliveryDate?: Date;
  date: Date;
}

// Message types
export type MessageType = 'chat' | 'support' | 'system';

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  receiverId: string;
  receiverName: string;
  content: string;
  type: MessageType;
  read: boolean;
  relatedTo?: string; // productId or bidId if relevant
  createdAt: Date;
}

// Dashboard analytics types
export interface Analytics {
  totalSales: number;
  totalProducts: number;
  activeBids: number;
  completedTransactions: number;
  recentTransactions: Transaction[];
  popularProducts: {
    id: string;
    title: string;
    sales: number;
  }[];
}
