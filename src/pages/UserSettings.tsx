
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProfileSettings from '@/components/settings/ProfileSettings';
import NotificationSettings from '@/components/settings/NotificationSettings';
import SecuritySettings from '@/components/settings/SecuritySettings';

type SettingsTab = 'profile' | 'notifications' | 'security';

const UserSettings = () => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');
  const navigate = useNavigate();

  // Check if user is logged in
  const userString = localStorage.getItem('marketyard_user');
  if (!userString) {
    // Redirect to login if not logged in
    navigate('/auth');
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-market-900">Account Settings</h1>
            <p className="text-market-600 mt-2">
              Manage your profile, preferences, and account security
            </p>
          </div>
          
          <Tabs 
            defaultValue="profile" 
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as SettingsTab)}
            className="space-y-8"
          >
            <TabsList className="grid w-full grid-cols-3 max-w-md">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile" className="space-y-4">
              <ProfileSettings />
            </TabsContent>
            
            <TabsContent value="notifications" className="space-y-4">
              <NotificationSettings />
            </TabsContent>
            
            <TabsContent value="security" className="space-y-4">
              <SecuritySettings />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default UserSettings;
