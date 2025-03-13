
import { useState } from 'react';
import { 
  Eye, 
  Edit, 
  Trash, 
  Check, 
  X, 
  Plus,
  Search,
  Filter
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';

// Mock data for users
const mockUsers = [
  { id: 1, name: 'Rajesh Patel', email: 'rajesh@example.com', userType: 'farmer', status: 'active', registeredDate: '2023-05-15' },
  { id: 2, name: 'Priya Sharma', email: 'priya@example.com', userType: 'trader', status: 'active', registeredDate: '2023-06-22' },
  { id: 3, name: 'Amit Singh', email: 'amit@example.com', userType: 'farmer', status: 'inactive', registeredDate: '2023-07-10' },
  { id: 4, name: 'Neha Gupta', email: 'neha@example.com', userType: 'trader', status: 'active', registeredDate: '2023-08-05' },
  { id: 5, name: 'Vikram Desai', email: 'vikram@example.com', userType: 'farmer', status: 'active', registeredDate: '2023-09-18' },
  { id: 6, name: 'Sanjay Kumar', email: 'sanjay@example.com', userType: 'trader', status: 'pending', registeredDate: '2023-10-03' },
];

const UsersManagement = () => {
  const [users, setUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const handleDeleteUser = (userId: number) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== userId));
      toast({
        title: "User deleted",
        description: "The user has been successfully deleted",
      });
    }
  };

  const handleToggleStatus = (userId: number) => {
    setUsers(
      users.map(user => 
        user.id === userId 
          ? { 
              ...user, 
              status: user.status === 'active' ? 'inactive' : 'active' 
            } 
          : user
      )
    );
    
    toast({
      title: "Status updated",
      description: "User status has been updated successfully",
    });
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterType === 'all' || user.userType === filterType;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>User Management</CardTitle>
        <Button className="bg-market-600 hover:bg-market-700">
          <Plus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Search users..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2 items-center">
            <Filter size={18} className="text-gray-500" />
            <select
              className="border border-gray-200 rounded-md p-2"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="farmer">Farmers</option>
              <option value="trader">Traders</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3 text-sm font-medium text-gray-500">User</th>
                <th className="text-left p-3 text-sm font-medium text-gray-500">Type</th>
                <th className="text-left p-3 text-sm font-medium text-gray-500">Status</th>
                <th className="text-left p-3 text-sm font-medium text-gray-500">Registered</th>
                <th className="text-right p-3 text-sm font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map(user => (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">
                      <div className="flex flex-col">
                        <span className="font-medium">{user.name}</span>
                        <span className="text-sm text-gray-500">{user.email}</span>
                      </div>
                    </td>
                    <td className="p-3 capitalize">{user.userType}</td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded-full text-xs 
                        ${user.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : user.status === 'inactive' 
                            ? 'bg-red-100 text-red-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="p-3">{user.registeredDate}</td>
                    <td className="p-3">
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" size="icon" className="h-8 w-8">
                          <Eye size={16} />
                        </Button>
                        <Button variant="outline" size="icon" className="h-8 w-8">
                          <Edit size={16} />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => handleToggleStatus(user.id)}
                        >
                          {user.status === 'active' ? <X size={16} className="text-red-500" /> : <Check size={16} className="text-green-500" />}
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-8 w-8 text-red-500 hover:text-red-700"
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          <Trash size={16} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-4 text-center text-gray-500">
                    No users found matching your search.
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

export default UsersManagement;
