
'use server';

import { createClient as createServerClient } from '@/lib/supabase/server';
import { createClient } from '@/lib/supabase/client';

export async function getMoodGardenData(limit?: number) {
  // This function can be called from both server and client components.
  // When on the server, it will use the server client.
  // When on the client, it will use the browser client.
  const supabase = typeof window === 'undefined' ? createServerClient() : createClient();
  
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    console.error('No user is logged in.');
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
