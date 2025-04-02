
import { supabase } from '@/integrations/supabase/client';
import { Profile, AuthUser } from '@/types/auth';
import { UserRole } from '@/types';
import { Session } from '@supabase/supabase-js';

// Fetch user profile from Supabase
export const fetchProfile = async (userId: string): Promise<Profile | null> => {
  try {
    // Cast the string table name to a valid table type
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
export const updateUserState = async (
  session: Session | null,
  setProfile: (profile: Profile | null) => void,
  setUser: (user: AuthUser | null) => void
) => {
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

// Login user with email and password
export const loginUser = async (email: string, password: string) => {
  return await supabase.auth.signInWithPassword({
    email,
    password,
  });
};

// Register a new user
export const registerUser = async (
  name: string, 
  email: string, 
  password: string, 
  userType: UserRole, 
  phone?: string
) => {
  return await supabase.auth.signUp({
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
};

// Logout user
export const logoutUser = async () => {
  return await supabase.auth.signOut();
};
