
'use server';

import { createClient as createServerClient } from '@/lib/supabase/server';
import { createClient } from '@/lib/supabase/client';

export async function getMoodGardenData(limit?: number) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.error("Supabase environment variables are not set. Please update your .env file. Returning empty data.");
    return [];
  }

  // This function can be called from both server and client components.
  // When on the server, it will use the server client.
  // When on the client, it will use the browser client.
  const supabase = typeof window === 'undefined' ? createServerClient() : createClient();
  
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    // This is not an error if the user is not logged in, just return empty.
    return [];
  }

  let query = supabase
    .from('journal_entries')
    .select('id, user_id, emotion, mood_score, created_at, transcript')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query;


  if (error) {
    console.error('Error fetching journal entries:', error);
    return [];
  }

  // we fetch descending to get the latest, but the garden looks better ascending
  return data.reverse();
}
