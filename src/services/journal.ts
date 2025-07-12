'use server';

import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';

export async function getMoodGardenData() {
  const cookieStore = cookies();
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    // Handle the case where there is no logged-in user
    console.error('No user is logged in.');
    return [];
  }

  const { data, error } = await supabase
    .from('journal_entries')
    .select('id, user_id, emotion, mood_score, created_at, transcript')
    .eq('user_id', user.id)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching journal entries:', error);
    // Depending on your error handling strategy, you might want to throw
    // the error or return a specific error object.
    return [];
  }

  return data;
}
