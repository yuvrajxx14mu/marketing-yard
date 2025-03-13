
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Check } from 'lucide-react';
import { toast } from 'sonner';

const NotificationSettings = () => {
  // In a real app, these would be loaded from user's saved preferences
  const [notifications, setNotifications] = useState({
    email: {
      marketUpdates: true,
      bidActivity: true,
      productActivity: true,
      messages: true,
      promotions: false
    },
    push: {
      marketUpdates: false,
      bidActivity: true,
      productActivity: true,
      messages: true,
      promotions: false
    }
  });

  const handleToggle = (channel: 'email' | 'push', setting: string) => {
    setNotifications(prev => ({
      ...prev,
      [channel]: {
        ...prev[channel],
        [setting]: !prev[channel][setting as keyof typeof prev[channel]]
      }
    }));
  };

  const handleSave = () => {
    // In a real app, these settings would be saved to a backend
    localStorage.setItem('notification_preferences', JSON.stringify(notifications));
    toast.success('Notification preferences saved!');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>
            Control how and when you receive notifications from MarketYard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Email Notifications */}
            <div>
              <h3 className="text-lg font-medium mb-4">Email Notifications</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-market" className="text-base">Market Updates</Label>
                    <p className="text-sm text-muted-foreground">Receive updates about market prices and trends</p>
                  </div>
                  <Switch 
                    id="email-market" 
                    checked={notifications.email.marketUpdates}
                    onCheckedChange={() => handleToggle('email', 'marketUpdates')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-bids" className="text-base">Bid Activity</Label>
                    <p className="text-sm text-muted-foreground">Notifications about new bids or bid updates</p>
                  </div>
                  <Switch 
                    id="email-bids" 
                    checked={notifications.email.bidActivity}
                    onCheckedChange={() => handleToggle('email', 'bidActivity')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-products" className="text-base">Product Activity</Label>
                    <p className="text-sm text-muted-foreground">Updates on your listed products or saved products</p>
                  </div>
                  <Switch 
                    id="email-products" 
                    checked={notifications.email.productActivity}
                    onCheckedChange={() => handleToggle('email', 'productActivity')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-messages" className="text-base">Messages</Label>
                    <p className="text-sm text-muted-foreground">Receive email notifications for new messages</p>
                  </div>
                  <Switch 
                    id="email-messages" 
                    checked={notifications.email.messages}
                    onCheckedChange={() => handleToggle('email', 'messages')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-promotions" className="text-base">Promotions & Updates</Label>
                    <p className="text-sm text-muted-foreground">Marketing emails and platform updates</p>
                  </div>
                  <Switch 
                    id="email-promotions" 
                    checked={notifications.email.promotions}
                    onCheckedChange={() => handleToggle('email', 'promotions')}
                  />
                </div>
              </div>
            </div>

            <Separator />
            
            {/* Push Notifications */}
            <div>
              <h3 className="text-lg font-medium mb-4">Push Notifications</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="push-market" className="text-base">Market Updates</Label>
                    <p className="text-sm text-muted-foreground">Receive updates about market prices and trends</p>
                  </div>
                  <Switch 
                    id="push-market" 
                    checked={notifications.push.marketUpdates}
                    onCheckedChange={() => handleToggle('push', 'marketUpdates')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="push-bids" className="text-base">Bid Activity</Label>
                    <p className="text-sm text-muted-foreground">Notifications about new bids or bid updates</p>
                  </div>
                  <Switch 
                    id="push-bids" 
                    checked={notifications.push.bidActivity}
                    onCheckedChange={() => handleToggle('push', 'bidActivity')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="push-products" className="text-base">Product Activity</Label>
                    <p className="text-sm text-muted-foreground">Updates on your listed products or saved products</p>
                  </div>
                  <Switch 
                    id="push-products" 
                    checked={notifications.push.productActivity}
                    onCheckedChange={() => handleToggle('push', 'productActivity')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="push-messages" className="text-base">Messages</Label>
                    <p className="text-sm text-muted-foreground">Receive push notifications for new messages</p>
                  </div>
                  <Switch 
                    id="push-messages" 
                    checked={notifications.push.messages}
                    onCheckedChange={() => handleToggle('push', 'messages')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="push-promotions" className="text-base">Promotions & Updates</Label>
                    <p className="text-sm text-muted-foreground">Marketing notifications and platform updates</p>
                  </div>
                  <Switch 
                    id="push-promotions" 
                    checked={notifications.push.promotions}
                    onCheckedChange={() => handleToggle('push', 'promotions')}
                  />
                </div>
              </div>
            </div>
            
            {/* Save Button */}
            <div className="flex justify-end">
              <Button 
                onClick={handleSave}
                className="bg-market-600 hover:bg-market-700"
              >
                <Check className="mr-2 h-4 w-4" />
                Save Preferences
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default NotificationSettings;
