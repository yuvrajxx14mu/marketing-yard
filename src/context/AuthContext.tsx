
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User as SupabaseUser, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { UserRole } from '@/types';
import { useToast } from '@/hooks/use-toast';

interface Profile {
  id: string;
  name: string;
  phone?: string;
  role: UserRole;
  location?: string;
}

interface AuthUser {
  id: string;
  email: string;
  userType: UserRole;
  name: string;
  phone?: string;
  location?: string;
  status: 'active' | 'pending' | 'inactive';
}

interface AuthContextType {
  user: AuthUser | null;
  profile: Profile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, userType: UserRole, phone?: string) => Promise<void>;
  logout: () => Promise<void>;
  session: Session | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Fetch user profile from Supabase
  const fetchProfile = async (userId: string) => {
    try {
      // Fix: Cast the string table name to a valid table type
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        return null;
      }

      return data as Profile;
    } catch (error) {
      console.error('Error in fetchProfile:', error);
      return null;
    }
  };

  // Update user state with Supabase user and profile data
  const updateUserState = async (session: Session | null) => {
    if (!session) {
      setUser(null);
      setProfile(null);
      return;
    }

    const supaUser = session.user;
    
    // Fetch profile with setTimeout to prevent potential deadlocks
    setTimeout(async () => {
      const userProfile = await fetchProfile(supaUser.id);
      
      if (userProfile) {
        setProfile(userProfile);
        
        setUser({
          id: supaUser.id,
          email: supaUser.email || '',
          userType: userProfile.role as UserRole,
          name: userProfile.name,
          phone: userProfile.phone,
          location: userProfile.location,
          status: 'active',
        });
      } else {
        setUser({
          id: supaUser.id,
          email: supaUser.email || '',
          userType: 'farmer',
          name: supaUser.user_metadata.name || 'User',
          status: 'active',
        });
      }
    }, 0);
  };

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        setSession(currentSession);
        
        // We'll use setTimeout to avoid potential deadlocks with nested Supabase calls
        if (currentSession) {
          updateUserState(currentSession);
        } else {
          setUser(null);
          setProfile(null);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setIsLoading(false);
      
      if (currentSession) {
        updateUserState(currentSession);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          title: "Login failed",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }

      toast({
        title: "Login successful",
        description: `Welcome back!`,
      });
      
    } catch (error: any) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string, userType: UserRole, phone?: string) => {
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            role: userType,
            phone,
          },
        },
      });

      if (error) {
        toast({
          title: "Registration failed",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }

      toast({
        title: "Registration successful",
        description: `Welcome to CropBid, ${name}!`,
      });
      
    } catch (error: any) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        toast({
          title: "Logout failed",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }

      setUser(null);
      setProfile(null);
      setSession(null);
      
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        isLoading,
        isAuthenticated: !!session,
        login,
        register,
        logout,
        session
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
