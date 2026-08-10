'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export async function login(formData: FormData) {
  const supabase = await createClient();
  const email = String(formData.get('email') ?? '').trim();
  const password = String(formData.get('password') ?? '');
  const next = String(formData.get('next') ?? '/espace-client');

  if (!email || !password) redirect(`/connexion?error=Champs%20obligatoires`);

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) redirect(`/connexion?error=${encodeURIComponent('Email ou mot de passe incorrect')}`);

  revalidatePath('/', 'layout');
  redirect(next.startsWith('/') ? next : '/espace-client');
}
