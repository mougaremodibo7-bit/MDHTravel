import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

const labels: Record<string, string> = { pending: 'En attente', review: 'En vérification', approved: 'Approuvé', rejected: 'Rejeté', completed: 'Terminé' };
const typeLabels: Record<string, string> = { passport: 'Passeport', photo: 'Photo', visa: 'Visa', vaccination: 'Vaccination', other: 'Autre' };

export default async function DossierDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: claims } = await supabase.auth.getClaims();
  const userId = claims?.claims?.sub;
  if (!userId) redirect(`/connexion?next=/espace-client/dossiers/${id}`);

  const { data: registration } = await supabase.from('registrations').select('*').eq('id', id).eq('user_id', userId).single();
  if (!registration) notFound();

  const [{ data: documents }, { data: history }] = await Promise.all([
    supabase.from('registration_documents').select('*').eq('registration_id', id).order('uploaded_at', { ascending: false }),
    supabase.from('registration_status_history').select('*').eq('registration_id', id).order('created_at', { ascending: false }),
  ]);

  async function getDownloadUrl(path: string) {
    'use server';
    const serverSupabase = await createClient();
    const { data: current } = await serverSupabase.auth.getClaims();
    if (!current?.claims?.sub) return null;
    const { data: owned } = await serverSupabase.from('registration_documents').select('id').eq('registration_id', id).eq('storage_path', path).single();
    if (!owned) return null;
    const { data } = await serverSupabase.storage.from('registration-documents').createSignedUrl(path, 300);
    return data?.signedUrl ?? null;
  }

  return (
    <main className="min-h-screen bg-[#f8f8f5] px-5 py-10 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-6xl">
        <Link href="/espace-client/dossiers" className="text-sm font-bold text-[#0c4f33]">← Retour à mes dossiers</Link>
        <div className="mt-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-xs font-bold uppercase tracking-wider text-[#c79f33]">Dossier #{id.slice(0, 8).toUpperCase()}</p><h1 className="mt-2 text-3xl font-bold text-[#0c4f33]">{registration.registration_type === 'hajj' ? 'Hajj' : 'Oumra'} — {registration.first_name} {registration.last_name}</h1></div><span className="w-fit rounded-full bg-[#f5eee0] px-4 py-2 text-sm font-bold text-[#0c4f33]">{labels[registration.status] ?? registration.status}</span></div>
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5 lg:col-span-2"><h2 className="text-xl font-bold text-[#0c4f33]">Informations du dossier</h2><dl className="mt-5 grid gap-4 sm:grid-cols-2 text-sm"><div><dt className="text-slate-500">Téléphone</dt><dd className="mt-1 font-semibold">{registration.phone}</dd></div><div><dt className="text-slate-500">E-mail</dt><dd className="mt-1 font-semibold break-all">{registration.email}</dd></div><div><dt className="text-slate-500">Passeport</dt><dd className="mt-1 font-semibold">{registration.passport_number}</dd></div><div><dt className="text-slate-500">Expiration</dt><dd className="mt-1 font-semibold">{new Date(registration.passport_expiry).toLocaleDateString('fr-FR')}</dd></div><div><dt className="text-slate-500">Contact d'urgence</dt><dd className="mt-1 font-semibold">{registration.emergency_contact_name}</dd></div><div><dt className="text-slate-500">Téléphone urgence</dt><dd className="mt-1 font-semibold">{registration.emergency_contact_phone}</dd></div></dl></section>
          <section className="rounded-3xl bg-[#0c4f33] p-6 text-white"><p className="text-sm text-white/70">Créé le</p><p className="mt-1 font-bold">{new Date(registration.created_at).toLocaleDateString('fr-FR')}</p><p className="mt-5 text-sm text-white/70">Dernière mise à jour</p><p className="mt-1 font-bold">{new Date(registration.updated_at).toLocaleDateString('fr-FR')}</p></section>
        </div>
        <section className="mt-6 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5"><h2 className="text-xl font-bold text-[#0c4f33]">Documents</h2><div className="mt-5 divide-y divide-slate-100">{(documents ?? []).map((doc) => <div key={doc.id} className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between"><div><p className="font-semibold">{typeLabels[doc.document_type] ?? doc.document_type}</p><p className="text-sm text-slate-500">{doc.file_name} · {Math.ceil(doc.file_size / 1024)} Ko</p></div><form action={async () => { const url = await getDownloadUrl(doc.storage_path); if (url) redirect(url); }}><button className="rounded-xl border border-[#0c4f33] px-4 py-2 text-sm font-bold text-[#0c4f33]">Télécharger</button></form></div>)}</div></section>
        <section className="mt-6 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5"><h2 className="text-xl font-bold text-[#0c4f33]">Historique du dossier</h2><div className="mt-5 space-y-5">{(history ?? []).map((event) => <div key={event.id} className="border-l-2 border-[#c79f33] pl-4"><p className="font-semibold">{labels[event.new_status] ?? event.new_status}</p><p className="text-sm text-slate-500">{new Date(event.created_at).toLocaleString('fr-FR')}</p>{event.note && <p className="mt-1 text-sm text-slate-600">{event.note}</p>}</div>)}{!history?.length && <p className="text-sm text-slate-500">Votre dossier est en attente de traitement.</p>}</div></section>
      </div>
    </main>
  );
}
