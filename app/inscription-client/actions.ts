'use server';

import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export async function signup(formData: FormData) {
  const supabase = await createClient();
  const email = String(formData.get('email') ?? '').trim();
  const password = String(formData.get('password') ?? '');
  const fullName = String(formData.get('fullName') ?? '').trim();
  const phone = String(formData.get('phone') ?? '').trim();

  if (!email || !password || !fullName || !phone) redirect('/inscription-client?error=Tous%20les%20champs%20sont%20obligatoires');
  if (password.length < 8) redirect('/inscription-client?error=Le%20mot%20de%20passe%20doit%20contenir%20au%20moins%208%20caractères');

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: fullName, phone, role: 'client' } },
  });

  if (error) redirect(`/inscription-client?error=${encodeURIComponent(error.message)}`);

  if (data.session) redirect('/espace-client');
  redirect('/inscription-client?success=Compte%20créé.%20Vérifiez%20votre%20e-mail%20pour%20confirmer%20votre%20compte.');
}
