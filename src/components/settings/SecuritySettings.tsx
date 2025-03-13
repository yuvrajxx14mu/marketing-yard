
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { AlertCircle, Eye, EyeOff, Check, Lock, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';

const SecuritySettings = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  
  const [sessionTimeout, setSessionTimeout] = useState(30); // in minutes
  
  // Password validation
  const isPasswordValid = newPassword.length >= 8;
  const doPasswordsMatch = newPassword === confirmPassword;
  
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentPassword) {
      toast.error('Please enter your current password');
      return;
    }
    
    if (!isPasswordValid) {
      toast.error('Password must be at least 8 characters long');
      return;
    }
    
    if (!doPasswordsMatch) {
      toast.error('New passwords do not match');
      return;
    }
    
    // In a real app, this would call an API to change the password
    toast.success('Password changed successfully');
    
    // Reset form
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };
  
  const toggleTwoFactor = () => {
    // In a real app, this would trigger the 2FA setup flow
    setTwoFactorEnabled(!twoFactorEnabled);
    
    if (!twoFactorEnabled) {
      toast.success('Two-factor authentication enabled');
    } else {
      toast.success('Two-factor authentication disabled');
    }
  };
  
  const handleSessionTimeoutChange = (value: string) => {
    const timeout = parseInt(value, 10);
    if (!isNaN(timeout) && timeout >= 5 && timeout <= 120) {
      setSessionTimeout(timeout);
    }
  };
  
  const saveSessionSettings = () => {
    // In a real app, this would save to user preferences
    toast.success(`Session timeout set to ${sessionTimeout} minutes`);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="space-y-6">
        {/* Password Change Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Lock className="mr-2 h-5 w-5 text-market-600" />
              Password
            </CardTitle>
            <CardDescription>
              Update your password to keep your account secure
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleChangePassword}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <div className="relative">
                    <Input
                      id="current-password"
                      type={showPassword ? "text" : "password"}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <div className="relative">
                    <Input
                      id="new-password"
                      type={showPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                  {newPassword && !isPasswordValid && (
                    <p className="text-sm text-red-500 flex items-center mt-1">
                      <AlertCircle size={14} className="mr-1" />
                      Password must be at least 8 characters
                    </p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <div className="relative">
                    <Input
                      id="confirm-password"
                      type={showPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                  {confirmPassword && !doPasswordsMatch && (
                    <p className="text-sm text-red-500 flex items-center mt-1">
                      <AlertCircle size={14} className="mr-1" />
                      Passwords do not match
                    </p>
                  )}
                </div>
                
                <div className="pt-2">
                  <Button 
                    type="submit" 
                    className="bg-market-600 hover:bg-market-700"
                    disabled={!currentPassword || !isPasswordValid || !doPasswordsMatch}
                  >
                    <Check className="mr-2 h-4 w-4" />
                    Update Password
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
        
        {/* Two-Factor Authentication */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <ShieldCheck className="mr-2 h-5 w-5 text-market-600" />
              Two-Factor Authentication
            </CardTitle>
            <CardDescription>
              Add an extra layer of security to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium">Enable Two-Factor Authentication</h3>
                <p className="text-sm text-muted-foreground">
                  Protect your account with an additional security layer
                </p>
              </div>
              <Switch 
                checked={twoFactorEnabled}
                onCheckedChange={toggleTwoFactor}
              />
            </div>
            
            {twoFactorEnabled && (
              <div className="mt-4 p-4 border rounded-md bg-muted/50">
                <p className="text-sm mb-2">
                  Two-factor authentication is enabled. You'll need to provide a verification code 
                  when signing in or performing sensitive operations.
                </p>
                <Button variant="outline" size="sm">
                  Configure Settings
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Session Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Session Security</CardTitle>
            <CardDescription>
              Control your session timeout settings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <div>
                  <Label htmlFor="session-timeout">Automatic Logout (minutes)</Label>
                  <p className="text-sm text-muted-foreground">
                    Set how long you can be inactive before being logged out
                  </p>
                </div>
                <div>
                  <Input
                    id="session-timeout"
                    type="number"
                    min={5}
                    max={120}
                    value={sessionTimeout}
                    onChange={(e) => handleSessionTimeoutChange(e.target.value)}
                  />
                </div>
              </div>
              
              <Separator />
              
              <div className="flex justify-end">
                <Button onClick={saveSessionSettings}>
                  Save Settings
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default SecuritySettings;
