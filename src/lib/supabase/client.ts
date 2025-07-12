'use client';

import { createBrowserClient } from '@supabase/ssr';
import type { Database } from '@/lib/database.types';

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    // This will be logged in the browser console, which is helpful for debugging.
    console.error(
      'Supabase URL or anonymous key is not set. Please check your .env file.'
    );
    // Return a mock client or handle it in a way that doesn't break the app.
    // For now, we'll proceed, but operations will fail. A more robust solution
    // might involve returning a mock object that doesn't make network requests.
  }
  
  return createBrowserClient<Database>(
    supabaseUrl!,
    supabaseAnonKey!
  );
}
