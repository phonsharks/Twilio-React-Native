import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

// Replace with your Supabase project URL and Anon Key
const supabaseUrl = ''; // e.g., https://your-project.supabase.co
const supabaseAnonKey = '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true, // This ensures the session is persisted (default is true)
    autoRefreshToken: true, // Automatically refresh the token when it expires
    detectSessionInUrl: false, // Not needed for React Native
    storage:AsyncStorage
  },
});