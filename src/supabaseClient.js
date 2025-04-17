import { createClient } from '@supabase/supabase-js';

const supabaseBaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseApiKey = import.meta.env.VITE_SUPABASE_KEY;

if (!supabaseBaseUrl) {
	throw new Error('Supabase Base URL (VITE_SUPABASE_URL) must be defined in environment variables. Please check your .env file.');
}

if (!supabaseApiKey) {
	throw new Error('Supabase API Key (VITE_SUPABASE_KEY) must be defined in environment variables. Please check your .env file.');
}

export const supabase = createClient(supabaseBaseUrl, supabaseApiKey);