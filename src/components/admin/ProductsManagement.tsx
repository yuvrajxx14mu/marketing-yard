
import { useState } from 'react';
import { 
  Eye, 
  Edit, 
  Trash, 
  CheckCircle, 
  XCircle, 
  Plus,
  Search,
  Filter
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';

// Mock data for products
const mockProducts = [
  { id: 1, title: 'Premium Wheat', farmer: 'Rajesh Patel', category: 'Grains', price: 2500, available: 200, status: 'approved', listedDate: '2023-08-15' },
  { id: 2, title: 'Organic Rice', farmer: 'Amit Singh', category: 'Grains', price: 3200, available: 150, status: 'approved', listedDate: '2023-09-10' },
  { id: 3, title: 'Fresh Tomatoes', farmer: 'Vikram Desai', category: 'Vegetables', price: 1800, available: 100, status: 'pending', listedDate: '2023-10-05' },
  { id: 4, title: 'Alphonso Mangoes', farmer: 'Suresh Kumar', category: 'Fruits', price: 4500, available: 80, status: 'approved', listedDate: '2023-10-12' },
  { id: 5, title: 'Organic Potatoes', farmer: 'Rahul Joshi', category: 'Vegetables', price: 1200, available: 250, status: 'rejected', listedDate: '2023-10-18' },
  { id: 6, title: 'Cotton Bales', farmer: 'Mohan Patel', category: 'Fibers', price: 5800, available: 50, status: 'pending', listedDate: '2023-10-20' },
];

const ProductsManagement = () => {
  const [products, setProducts] = useState(mockProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const handleDeleteProduct = (productId: number) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(product => product.id !== productId));
      toast({
        title: "Product deleted",
        description: "The product has been successfully removed from the marketplace",
      });
    }
  };

  const handleUpdateStatus = (productId: number, newStatus: 'approved' | 'rejected') => {
    setProducts(
      products.map(product => 
        product.id === productId 
          ? { 
              ...product, 
              status: newStatus
            } 
          : product
      )
    );
    
    toast({
      title: "Status updated",
      description: `Product has been ${newStatus}`,
    });
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         product.farmer.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || product.status === filterStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Products Management</CardTitle>
        <Button className="bg-market-600 hover:bg-market-700">
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Search products..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            <Filter size={18} className="text-gray-500" />
            <select
              className="border border-gray-200 rounded-md p-2"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="Grains">Grains</option>
              <option value="Vegetables">Vegetables</option>
              <option value="Fruits">Fruits</option>
              <option value="Fibers">Fibers</option>
            </select>
            <select
              className="border border-gray-200 rounded-md p-2"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3 text-sm font-medium text-gray-500">Product</th>
                <th className="text-left p-3 text-sm font-medium text-gray-500">Farmer</th>
                <th className="text-left p-3 text-sm font-medium text-gray-500">Category</th>
                <th className="text-left p-3 text-sm font-medium text-gray-500">Price (₹)</th>
                <th className="text-left p-3 text-sm font-medium text-gray-500">Available</th>
                <th className="text-left p-3 text-sm font-medium text-gray-500">Status</th>
                <th className="text-right p-3 text-sm font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map(product => (
                  <tr key={product.id} className="border-b hover:bg-gray-50">
                    <td className="p-3 font-medium">{product.title}</td>
                    <td className="p-3">{product.farmer}</td>
                    <td className="p-3">{product.category}</td>
                    <td className="p-3">{product.price} / quintal</td>
                    <td className="p-3">{product.available} quintals</td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded-full text-xs 
                        ${product.status === 'approved' 
                          ? 'bg-green-100 text-green-800' 
                          : product.status === 'rejected' 
                            ? 'bg-red-100 text-red-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                        {product.status}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" size="icon" className="h-8 w-8">
                          <Eye size={16} />
                        </Button>
                        <Button variant="outline" size="icon" className="h-8 w-8">
                          <Edit size={16} />
                        </Button>
                        {product.status === 'pending' && (
                          <>
                            <Button 
                              variant="outline" 
                              size="icon" 
                              className="h-8 w-8 text-green-500 hover:text-green-700"
                              onClick={() => handleUpdateStatus(product.id, 'approved')}
                            >
                              <CheckCircle size={16} />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="icon" 
                              className="h-8 w-8 text-red-500 hover:text-red-700"
                              onClick={() => handleUpdateStatus(product.id, 'rejected')}
                            >
                              <XCircle size={16} />
                            </Button>
                          </>
                        )}
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-8 w-8 text-red-500 hover:text-red-700"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          <Trash size={16} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="p-4 text-center text-gray-500">
                    No products found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductsManagement;
