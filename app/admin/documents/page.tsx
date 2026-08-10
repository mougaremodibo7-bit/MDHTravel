import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export default async function AdminDocuments() {
  const s = await createClient();
  const { data: claims } = await s.auth.getClaims();
  if (!claims?.claims?.sub) redirect('/connexion');
  const { data: profile } = await s.from('profiles').select('role').eq('id', claims.claims.sub).single();
  if (!profile || !['admin', 'agent'].includes(String(profile.role))) redirect('/espace-client');
  const { data: docs } = await s.from('registration_documents').select('id,registration_id,document_type,file_name,file_size,mime_type,uploaded_at').order('uploaded_at', { ascending: false });
  return <main className="min-h-screen bg-[#f8f8f5] px-5 py-8 lg:px-8"><div className="mx-auto max-w-7xl"><Link href="/admin" className="font-bold text-[#0c4f33]">← Administration</Link><h1 className="mt-5 text-3xl font-bold text-[#0c4f33]">Documents</h1><p className="mt-2 text-slate-600">Documents transmis par les clients. L'accès aux fichiers reste privé.</p><div className="mt-6 overflow-x-auto rounded-3xl bg-white shadow-sm ring-1 ring-black/5"><table className="w-full min-w-[850px] text-left text-sm"><thead className="border-b"><tr><th className="p-4">Type</th><th className="p-4">Fichier</th><th className="p-4">Dossier</th><th className="p-4">Taille</th><th className="p-4">Date</th><th className="p-4"></th></tr></thead><tbody>{(docs??[]).map(d=><tr key={d.id} className="border-b last:border-0"><td className="p-4 font-semibold">{d.document_type}</td><td className="p-4">{d.file_name}</td><td className="p-4">#{d.registration_id.slice(0,8).toUpperCase()}</td><td className="p-4">{Math.ceil(d.file_size/1024)} Ko</td><td className="p-4">{new Date(d.uploaded_at).toLocaleDateString('fr-FR')}</td><td className="p-4"><a href={`/api/admin/documents/${d.id}`} target="_blank" className="font-bold text-[#0c4f33]">Ouvrir</a></td></tr>)}</tbody></table></div></div></main>;
}
