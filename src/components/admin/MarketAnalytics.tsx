
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

// Mock data for charts
const monthlyTradeData = [
  { month: 'Jan', volume: 2500000, transactions: 120 },
  { month: 'Feb', volume: 3200000, transactions: 145 },
  { month: 'Mar', volume: 4100000, transactions: 162 },
  { month: 'Apr', volume: 3800000, transactions: 158 },
  { month: 'May', volume: 4500000, transactions: 175 },
  { month: 'Jun', volume: 5200000, transactions: 195 },
  { month: 'Jul', volume: 4800000, transactions: 185 },
  { month: 'Aug', volume: 5500000, transactions: 205 },
  { month: 'Sep', volume: 6200000, transactions: 220 },
  { month: 'Oct', volume: 5800000, transactions: 210 },
  { month: 'Nov', volume: 6500000, transactions: 235 },
  { month: 'Dec', volume: 7200000, transactions: 250 },
];

const categoryShareData = [
  { name: 'Grains', value: 40 },
  { name: 'Vegetables', value: 25 },
  { name: 'Fruits', value: 20 },
  { name: 'Fibers', value: 10 },
  { name: 'Others', value: 5 },
];

const userGrowthData = [
  { month: 'Jan', farmers: 85, traders: 42 },
  { month: 'Feb', farmers: 92, traders: 48 },
  { month: 'Mar', farmers: 100, traders: 55 },
  { month: 'Apr', farmers: 120, traders: 60 },
  { month: 'May', farmers: 140, traders: 70 },
  { month: 'Jun', farmers: 170, traders: 85 },
  { month: 'Jul', farmers: 200, traders: 100 },
  { month: 'Aug', farmers: 240, traders: 120 },
  { month: 'Sep', farmers: 270, traders: 135 },
  { month: 'Oct', farmers: 310, traders: 155 },
  { month: 'Nov', farmers: 340, traders: 170 },
  { month: 'Dec', farmers: 380, traders: 190 },
];

const topProductsData = [
  { name: 'Premium Wheat', value: 5200000 },
  { name: 'Organic Rice', value: 4800000 },
  { name: 'Alphonso Mangoes', value: 3500000 },
  { name: 'Cotton Bales', value: 3200000 },
  { name: 'Fresh Tomatoes', value: 2800000 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const MarketAnalytics = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Trade Volume</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyTradeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`₹${(value as number / 100000).toFixed(2)} Lakhs`, 'Volume']} />
                <Legend />
                <Area type="monotone" dataKey="volume" stroke="#8a5cf6" fill="#c4b5fd" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Product Category Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryShareData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {categoryShareData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Share']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="farmers" stroke="#16a34a" name="Farmers" />
                <Line type="monotone" dataKey="traders" stroke="#f59e0b" name="Traders" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Selling Products</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topProductsData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" />
                <Tooltip formatter={(value) => [`₹${(value as number / 100000).toFixed(2)} Lakhs`, 'Sales']} />
                <Legend />
                <Bar dataKey="value" fill="#22c55e" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MarketAnalytics;
