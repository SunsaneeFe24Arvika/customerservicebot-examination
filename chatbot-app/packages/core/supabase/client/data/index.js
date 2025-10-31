import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_API_KEY = import.meta.env.VITE_SUPABASE_API_KEY;

console.log('Supabase Client Debug:');
console.log('URL:', SUPABASE_URL ? 'Loaded' : 'Missing');
console.log('API Key:', SUPABASE_API_KEY ? 'Loaded' : 'Missing');

if (!SUPABASE_URL || !SUPABASE_API_KEY) {
    console.error('Supabase environment variables missing!');
    console.error('VITE_SUPABASE_URL:', SUPABASE_URL);
    console.error('VITE_SUPABASE_API_KEY:', SUPABASE_API_KEY);
}

export const client = createClient(SUPABASE_URL, SUPABASE_API_KEY);