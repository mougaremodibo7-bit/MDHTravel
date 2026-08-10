import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

const labels: Record<string,string> = { pending:'En attente', review:'En vérification', approved:'Approuvé', rejected:'Rejeté', completed:'Terminé' };

export default async function AdminPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const userId = data?.claims?.sub;
  if (!userId) redirect('/connexion?next=/admin');
  const { data: profile } = await supabase.from('profiles').select('full_name, role').eq('id', userId).single();
  if (!profile || !['admin','agent'].includes(String(profile.role))) redirect('/espace-client');

  const [{ data: registrations }, { count: clients }, { count: documents }] = await Promise.all([
    supabase.from('registrations').select('id, registration_type, status, first_name, last_name, created_at').order('created_at',{ascending:false}).limit(8),
    supabase.from('profiles').select('*',{count:'exact',head:true}).eq('role','client'),
    supabase.from('registration_documents').select('*',{count:'exact',head:true}),
  ]);
  const all = registrations ?? [];
  const counts = { total: all.length, pending: all.filter(r=>r.status==='pending').length, review: all.filter(r=>r.status==='review').length, approved: all.filter(r=>r.status==='approved').length };

  return <main className="min-h-screen bg-[#f8f8f5] px-5 py-8 lg:px-8"><div className="mx-auto max-w-7xl"><header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"><div><p className="text-sm font-bold uppercase tracking-[0.2em] text-[#c79f33]">Arafat Voyage</p><h1 className="mt-2 text-3xl font-bold text-[#0c4f33]">Administration</h1><p className="mt-1 text-slate-600">Bienvenue {profile.full_name ?? ''}.</p></div><form action="/auth/signout" method="post"><button className="rounded-xl border bg-white px-5 py-3 text-sm font-bold text-[#0c4f33]">Déconnexion</button></form></header>
  <nav className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">{['/admin','/admin/dossiers','/admin/clients','/admin/documents','/admin/statistiques','/admin/parametres'].map((href)=><Link key={href} href={href} className="rounded-xl bg-white px-4 py-3 text-center text-sm font-bold text-[#0c4f33] shadow-sm ring-1 ring-black/5">{href.split('/').pop()==='admin'?'Dashboard':href.split('/').pop()?.replace('statistiques','Statistiques').replace('parametres','Paramètres')}</Link>)}</nav>
  <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">{[['Dossiers récents',counts.total],['En attente',counts.pending],['En vérification',counts.review],['Approuvés',counts.approved],['Clients',clients ?? 0]].map(([name,value])=><div key={String(name)} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5"><p className="text-sm text-slate-500">{name}</p><p className="mt-2 text-3xl font-bold text-[#0c4f33]">{value}</p></div>)}</section>
  <section className="mt-8 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5"><div className="flex justify-between gap-4"><div><h2 className="text-xl font-bold text-[#0c4f33]">Dossiers récents</h2><p className="mt-1 text-sm text-slate-500">Documents transmis : {documents ?? 0}</p></div><Link href="/admin/dossiers" className="font-bold text-[#0c4f33]">Tout voir →</Link></div><div className="mt-5 overflow-x-auto"><table className="w-full min-w-[700px] text-left text-sm"><thead className="border-b text-slate-500"><tr><th className="p-3">Dossier</th><th className="p-3">Client</th><th className="p-3">Type</th><th className="p-3">Statut</th><th className="p-3">Date</th></tr></thead><tbody>{all.map(r=><tr key={r.id} className="border-b last:border-0"><td className="p-3 font-semibold">#{r.id.slice(0,8).toUpperCase()}</td><td className="p-3">{r.first_name} {r.last_name}</td><td className="p-3 uppercase">{r.registration_type}</td><td className="p-3">{labels[r.status] ?? r.status}</td><td className="p-3">{new Date(r.created_at).toLocaleDateString('fr-FR')}</td></tr>)}</tbody></table></div></section></div></main>;
}
