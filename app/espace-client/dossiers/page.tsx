import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

const labels: Record<string, string> = { pending: 'En attente', review: 'En vérification', approved: 'Approuvé', rejected: 'Rejeté', completed: 'Terminé' };
const steps = ['pending', 'review', 'approved', 'completed'];

function progress(status: string) {
  if (status === 'rejected') return 0;
  const index = steps.indexOf(status);
  return Math.round(((index < 0 ? 0 : index) + 1) / steps.length * 100);
}

export default async function DossiersPage() {
  const supabase = await createClient();
  const { data: claims } = await supabase.auth.getClaims();
  const userId = claims?.claims?.sub;
  if (!userId) redirect('/connexion?next=/espace-client/dossiers');

  const { data: registrations } = await supabase.from('registrations').select('id, registration_type, status, created_at, updated_at, first_name, last_name').eq('user_id', userId).order('created_at', { ascending: false });
  const ids = registrations?.map((r) => r.id) ?? [];
  const { data: documents } = ids.length ? await supabase.from('registration_documents').select('id, registration_id, document_type, file_name, storage_path, mime_type, file_size, uploaded_at').in('registration_id', ids) : { data: [] };
  const { data: history } = ids.length ? await supabase.from('registration_status_history').select('registration_id, old_status, new_status, note, created_at').in('registration_id', ids).order('created_at', { ascending: false }) : { data: [] };

  return (
    <main className="min-h-screen bg-[#f8f8f5] px-5 py-10 text-[#191c1b] lg:px-8 lg:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="text-sm font-bold uppercase tracking-[0.2em] text-[#c79f33]">Arafat Voyage</p><h1 className="mt-2 text-3xl font-bold text-[#0c4f33]">Mes dossiers</h1><p className="mt-2 text-slate-600">Suivez l'état de vos demandes Hajj et Oumra.</p></div><Link href="/inscription" className="rounded-xl bg-[#0c4f33] px-5 py-3 text-center font-bold text-white">Nouvelle inscription</Link></div>
        <div className="mt-8 space-y-6">
          {(registrations ?? []).map((registration) => {
            const docs = (documents ?? []).filter((d) => d.registration_id === registration.id);
            const events = (history ?? []).filter((h) => h.registration_id === registration.id);
            const pct = progress(registration.status);
            return <article key={registration.id} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5 sm:p-8">
              <div className="flex flex-col justify-between gap-4 sm:flex-row"><div><p className="text-xs font-bold uppercase tracking-wider text-[#c79f33]">Dossier #{registration.id.slice(0, 8).toUpperCase()}</p><h2 className="mt-2 text-xl font-bold text-[#0c4f33]">{registration.registration_type === 'hajj' ? 'Hajj' : 'Oumra'} — {registration.first_name} {registration.last_name}</h2><p className="mt-1 text-sm text-slate-500">Inscrit le {new Date(registration.created_at).toLocaleDateString('fr-FR')}</p></div><span className="h-fit rounded-full bg-[#f5eee0] px-4 py-2 text-sm font-bold text-[#0c4f33]">{labels[registration.status] ?? registration.status}</span></div>
              <div className="mt-7"><div className="mb-2 flex justify-between text-xs font-semibold"><span>Progression</span><span>{pct}%</span></div><div className="h-3 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-[#0c4f33] transition-all" style={{ width: `${pct}%` }} /></div></div>
              <div className="mt-7 grid gap-4 md:grid-cols-2"><div className="rounded-2xl bg-[#f5eee0] p-5"><h3 className="font-bold text-[#0c4f33]">Documents transmis ({docs.length})</h3><ul className="mt-3 space-y-2 text-sm text-slate-700">{docs.length ? docs.map((doc) => <li key={doc.id} className="flex justify-between gap-3"><span className="truncate">{doc.document_type} — {doc.file_name}</span><span className="text-xs text-slate-500">{Math.ceil(doc.file_size / 1024)} Ko</span></li>) : <li>Aucun document.</li>}</ul></div><div className="rounded-2xl border border-slate-100 p-5"><h3 className="font-bold text-[#0c4f33]">Historique</h3><ul className="mt-3 space-y-3 text-sm">{events.length ? events.map((event, i) => <li key={`${event.created_at}-${i}`}><strong>{labels[event.new_status] ?? event.new_status}</strong><span className="ml-2 text-slate-500">{new Date(event.created_at).toLocaleDateString('fr-FR')}</span></li>) : <li className="text-slate-500">Dossier créé et en attente de traitement.</li>}</ul></div></div>
              <div className="mt-6 flex flex-wrap gap-3"><Link href={`/espace-client/dossiers/${registration.id}`} className="rounded-xl bg-[#0c4f33] px-5 py-3 text-sm font-bold text-white">Voir les détails</Link></div>
            </article>;
          })}
          {!registrations?.length && <div className="rounded-3xl bg-white p-10 text-center shadow-sm ring-1 ring-black/5"><h2 className="text-xl font-bold text-[#0c4f33]">Aucun dossier</h2><p className="mt-2 text-slate-600">Vous n'avez pas encore envoyé de demande Hajj ou Oumra.</p><Link href="/inscription" className="mt-6 inline-flex rounded-xl bg-[#0c4f33] px-5 py-3 font-bold text-white">Commencer une inscription</Link></div>}
        </div>
      </div>
    </main>
  );
}
