'use server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

const allowed = new Set(['pending', 'review', 'approved', 'rejected', 'completed']);

export async function updateStatus(formData: FormData) {
  const id = String(formData.get('id'));
  const status = String(formData.get('status'));
  const note = String(formData.get('note') ?? '').trim();
  if (!allowed.has(status)) throw new Error('Statut invalide');

  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims?.sub) redirect('/connexion');

  const { data: profile } = await supabase.from('profiles').select('role').eq('id', data.claims.sub).single();
  if (!profile || !['admin', 'agent'].includes(String(profile.role))) redirect('/espace-client');

  const { error } = await supabase.rpc('update_registration_status', {
    p_registration_id: id,
    p_new_status: status,
    p_note: note || null,
  });
  if (error) throw new Error(error.message);

  revalidatePath('/admin');
  revalidatePath('/admin/dossiers');
  revalidatePath(`/admin/dossiers/${id}`);
  revalidatePath('/espace-client/dossiers');
  revalidatePath(`/espace-client/dossiers/${id}`);
}
