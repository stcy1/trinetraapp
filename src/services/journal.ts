
'use server';

import { createClient as createServerClient } from '@/lib/supabase/server';
import { createClient as createBrowserClient } from '@/lib/supabase/client';

export async function getMoodGardenData(limit?: number) {
  // This function can be called from both server and client components.
  // We determine the environment and create the appropriate client.
  const supabase = typeof window === 'undefined' 
    ? createServerClient() 
    : createBrowserClient();
  
  // Because createServerClient can throw an error now, 
  // we don't need the explicit check here anymore. 
  // If it fails, the error boundary will catch it,
  // which is better than silently failing.
  
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
