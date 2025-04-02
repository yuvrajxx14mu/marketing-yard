
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Bell, Mail, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Define notification channel types
type NotificationChannel = 'email' | 'push' | 'sms';

// Define notification types
type NotificationType = 'bids' | 'messages' | 'updates' | 'marketing';

interface NotificationSetting {
  type: NotificationType;
  label: string;
  description: string;
  icon: React.ReactNode;
  channels: {
    [key in NotificationChannel]: boolean;
  };
}

const NotificationSettings = () => {
  const { toast } = useToast();
  
  const [settings, setSettings] = useState<NotificationSetting[]>([
    {
      type: 'bids',
      label: 'Bid Notifications',
      description: 'Get notified when someone places a bid on your product',
      icon: <Bell className="h-5 w-5 text-market-600" />,
      channels: {
        email: true,
        push: true,
        sms: false
      }
    },
    {
      type: 'messages',
      label: 'Message Notifications',
      description: 'Get notified when you receive a new message',
      icon: <MessageSquare className="h-5 w-5 text-market-600" />,
      channels: {
        email: true,
        push: true,
        sms: false
      }
    },
    {
      type: 'updates',
      label: 'Product Updates',
      description: 'Get notified about status changes to your products or orders',
      icon: <Bell className="h-5 w-5 text-market-600" />,
      channels: {
        email: true,
        push: false,
        sms: false
      }
    },
    {
      type: 'marketing',
      label: 'Marketing Communications',
      description: 'Receive offers, promotions and updates from us',
      icon: <Mail className="h-5 w-5 text-market-600" />,
      channels: {
        email: false,
        push: false,
        sms: false
      }
    }
  ]);

  const handleToggle = (typeIndex: number, channel: NotificationChannel) => {
    const newSettings = [...settings];
    newSettings[typeIndex].channels[channel] = !newSettings[typeIndex].channels[channel];
    setSettings(newSettings);
  };

  const saveSettings = () => {
    // This would typically call an API to save the settings
    toast({
      title: "Settings saved",
      description: "Your notification preferences have been updated",
    });
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="mb-6">
          <h3 className="text-lg font-medium">Notification Preferences</h3>
          <p className="text-sm text-muted-foreground">
            Choose how and when you want to be notified
          </p>
        </div>

        <div className="space-y-8">
          {settings.map((setting, settingIndex) => (
            <div key={setting.type} className="border-b pb-6 last:border-b-0">
              <div className="flex items-start mb-4">
                <div className="mr-3">{setting.icon}</div>
                <div>
                  <h4 className="font-medium">{setting.label}</h4>
                  <p className="text-sm text-muted-foreground">{setting.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor={`email-${setting.type}`} className="mr-2">Email</Label>
                  <Switch 
                    id={`email-${setting.type}`}
                    checked={setting.channels.email}
                    onCheckedChange={() => handleToggle(settingIndex, 'email')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor={`push-${setting.type}`} className="mr-2">Push</Label>
                  <Switch 
                    id={`push-${setting.type}`}
                    checked={setting.channels.push}
                    onCheckedChange={() => handleToggle(settingIndex, 'push')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor={`sms-${setting.type}`} className="mr-2">SMS</Label>
                  <Switch 
                    id={`sms-${setting.type}`}
                    checked={setting.channels.sms}
                    onCheckedChange={() => handleToggle(settingIndex, 'sms')}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-8">
          <Button onClick={saveSettings} className="bg-market-600 hover:bg-market-700">Save Settings</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationSettings;
