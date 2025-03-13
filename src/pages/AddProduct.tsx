
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Upload, Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const categories = ['Grains', 'Vegetables', 'Fruits', 'Fibers', 'Sugar Crops', 'Spices', 'Pulses', 'Oilseeds'];

const AddProduct = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    price: '',
    unit: 'quintal',
    available: '',
    location: '',
    description: '',
    harvestDate: ''
  });
  const [previewImage, setPreviewImage] = useState('');

  // Check if user is a farmer, if not redirect to products page
  useState(() => {
    const user = localStorage.getItem('marketyard_user');
    if (user) {
      const userObj = JSON.parse(user);
      if (userObj.userType !== 'farmer') {
        navigate('/products');
        toast({
          title: "Access denied",
          description: "Only farmers can add products.",
          variant: "destructive",
        });
      }
    } else {
      navigate('/auth');
      toast({
        title: "Authentication required",
        description: "Please sign in to continue.",
        variant: "destructive",
      });
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate product creation
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Product added successfully!",
        description: "Your product has been listed on the marketplace.",
      });
      navigate('/products');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <Link to="/products" className="inline-flex items-center text-market-600 hover:text-market-700 mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Link>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-100">
              <h1 className="text-3xl font-bold text-market-900 mb-6">List Your Product</h1>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Product Title</Label>
                    <Input
                      id="title"
                      name="title"
                      placeholder="e.g. Premium Wheat"
                      value={formData.title}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-market-500"
                      required
                    >
                      <option value="">Select a category</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="price">Price per Unit (₹)</Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      placeholder="e.g. 2500"
                      value={formData.price}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="unit">Unit of Measurement</Label>
                    <select
                      id="unit"
                      name="unit"
                      value={formData.unit}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-market-500"
                      required
                    >
                      <option value="quintal">Quintal</option>
                      <option value="kg">Kilogram</option>
                      <option value="ton">Ton</option>
                      <option value="dozen">Dozen</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="available">Available Quantity</Label>
                    <Input
                      id="available"
                      name="available"
                      type="number"
                      placeholder="e.g. 500"
                      value={formData.available}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      name="location"
                      placeholder="e.g. Ahmedabad, Gujarat"
                      value={formData.location}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="harvestDate">Harvest Date</Label>
                    <Input
                      id="harvestDate"
                      name="harvestDate"
                      type="date"
                      value={formData.harvestDate}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="image">Product Image</Label>
                    <div className="flex items-center justify-center h-36 bg-market-50 rounded-md border-2 border-dashed border-market-200 cursor-pointer overflow-hidden">
                      {previewImage ? (
                        <img 
                          src={previewImage} 
                          alt="Preview" 
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="text-center">
                          <Upload className="mx-auto h-12 w-12 text-market-400" />
                          <p className="mt-2 text-sm text-market-500">Click to upload or drag and drop</p>
                        </div>
                      )}
                      <input
                        id="image"
                        type="file"
                        accept="image/*"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={handleImageChange}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Product Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Describe your product in detail..."
                    value={formData.description}
                    onChange={handleChange}
                    className="min-h-32"
                    required
                  />
                </div>
                
                <div className="flex justify-end space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate('/products')}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-market-600 hover:bg-market-700"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      'List Product'
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AddProduct;
