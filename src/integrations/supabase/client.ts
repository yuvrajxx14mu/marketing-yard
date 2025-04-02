
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ohukbzzubbbosejohqpo.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9odWtienp1YmJib3Nlam9ocXBvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM0OTA5NzIsImV4cCI6MjA1OTA2Njk3Mn0.f-JwYQ-nErxr7izrwM4JTicuiRH94_jil_N2gGsTgOQ";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});
