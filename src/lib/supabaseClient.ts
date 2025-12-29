import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Note: We don't throw error here to avoid breaking build if envs are missing during build time
// But we should check before usage
export const supabase = createClient(
    supabaseUrl || '',
    supabaseAnonKey || ''
);
