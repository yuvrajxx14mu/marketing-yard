
import { User as SupabaseUser, Session } from '@supabase/supabase-js';
import { UserRole } from '@/types';

export interface Profile {
  id: string;
  name: string;
  phone?: string;
  role: UserRole;
  location?: string;
}

export interface AuthUser {
  id: string;
  email: string;
  userType: UserRole;
  name: string;
  phone?: string;
  location?: string;
  status: 'active' | 'pending' | 'inactive';
}

export interface AuthContextType {
  user: AuthUser | null;
  profile: Profile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, userType: UserRole, phone?: string) => Promise<void>;
  logout: () => Promise<void>;
  session: Session | null;
}
