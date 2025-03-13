
import { 
  Users, 
  ShoppingBag, 
  BarChart3,
  Settings
} from 'lucide-react';

type AdminTab = 'users' | 'products' | 'analytics';

interface AdminSidebarProps {
  activeTab: AdminTab;
  setActiveTab: (tab: AdminTab) => void;
}

const AdminSidebar = ({ activeTab, setActiveTab }: AdminSidebarProps) => {
  const navItems = [
    { id: 'users', label: 'User Management', icon: <Users size={18} /> },
    { id: 'products', label: 'Products', icon: <ShoppingBag size={18} /> },
    { id: 'analytics', label: 'Market Analytics', icon: <BarChart3 size={18} /> },
  ];

  return (
    <aside className="w-full md:w-64 bg-white rounded-lg shadow-md p-4 h-fit">
      <nav>
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveTab(item.id as AdminTab)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
                  activeTab === item.id
                    ? 'bg-market-100 text-market-800 font-medium'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
