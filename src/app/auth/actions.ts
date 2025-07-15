
'use server';

import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { headers } from 'next/headers';

export async function login(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error('Login error:', error.message);
    return redirect('/login?message=Could not authenticate user');
  }

  return redirect('/dashboard');
}

export async function signup(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const supabase = createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    console.error('Signup error:', error.message);
    return redirect('/login?message=Could not create user');
  }

  return redirect('/login?message=Check email to continue sign in process');
}

export async function logout() {
  const supabase = createClient();
  await supabase.auth.signOut();
  return redirect('/login');
}

export async function signInWithGoogle() {
  const supabase = createClient();
  const origin = headers().get('origin');

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    console.error('Google Sign-In Error:', error);
    return redirect('/login?message=Could not sign in with Google');
  }

  return redirect(data.url);
}
