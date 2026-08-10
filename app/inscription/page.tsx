import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { InscriptionForm } from './inscription-form';

export default async function InscriptionPage() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();
  if (error || !data?.claims?.sub) redirect('/connexion?next=/inscription');

  return (
    <main className="min-h-screen bg-[#f8f8f5] px-5 py-12 text-[#191c1b] lg:px-8 lg:py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 text-center"><p className="text-sm font-bold uppercase tracking-[0.2em] text-[#c79f33]">Arafat Voyage</p><h1 className="mt-3 text-3xl font-bold text-[#0c4f33] sm:text-5xl">Inscription Hajj / Oumra</h1><p className="mx-auto mt-4 max-w-2xl text-slate-600">Remplissez vos informations. Les données et documents sont traités de manière sécurisée.</p></div>
        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5 sm:p-10"><InscriptionForm /></div>
      </div>
    </main>
  );
}
