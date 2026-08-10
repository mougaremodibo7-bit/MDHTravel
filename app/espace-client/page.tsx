import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function EspaceClientPage() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();
  if (error || !data?.claims?.sub) redirect('/connexion');

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, phone, role')
    .eq('id', data.claims.sub)
    .single();

  return (
    <main className="min-h-screen bg-[#f8f8f5] px-5 py-12 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div><p className="text-sm font-bold uppercase tracking-[0.2em] text-[#c79f33]">Arafat Voyage</p><h1 className="mt-2 text-3xl font-bold text-[#0c4f33]">Mon espace client</h1></div>
          <form action="/auth/signout" method="post"><button className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-[#0c4f33]">Se déconnecter</button></form>
        </div>
        <section className="mt-8 rounded-3xl bg-white p-7 shadow-sm ring-1 ring-black/5">
          <h2 className="text-xl font-bold text-[#0c4f33]">Bienvenue {profile?.full_name ?? data.claims.email}</h2>
          <p className="mt-2 text-slate-600">Votre compte est sécurisé. Vous pourrez retrouver ici vos inscriptions et leur état d'avancement.</p>
          <div className="mt-7 grid gap-4 sm:grid-cols-3">
            <a href="/inscription" className="rounded-2xl bg-[#0c4f33] p-5 font-bold text-white">Nouvelle inscription</a>
            <div className="rounded-2xl bg-[#f5eee0] p-5"><p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Téléphone</p><p className="mt-2 font-bold text-[#0c4f33]">{profile?.phone ?? 'Non renseigné'}</p></div>
            <div className="rounded-2xl bg-[#f5eee0] p-5"><p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Type de compte</p><p className="mt-2 font-bold capitalize text-[#0c4f33]">{profile?.role ?? 'client'}</p></div>
          </div>
        </section>
      </div>
    </main>
  );
}
