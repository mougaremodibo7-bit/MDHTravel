import Link from 'next/link';
import { signup } from './actions';

export default async function InscriptionClientPage({ searchParams }: { searchParams: Promise<{ error?: string; success?: string }> }) {
  const params = await searchParams;
  return (
    <main className="min-h-screen bg-[#f8f8f5] px-5 py-16 lg:px-8">
      <div className="mx-auto max-w-md rounded-3xl bg-white p-7 shadow-sm ring-1 ring-black/5 sm:p-10">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#c79f33]">Arafat Voyage</p>
        <h1 className="mt-3 text-3xl font-bold text-[#0c4f33]">Créer votre compte</h1>
        <p className="mt-3 text-sm text-slate-600">Votre compte vous permettra de suivre votre dossier Hajj ou Oumra.</p>
        {params.error && <p className="mt-5 rounded-xl bg-red-50 p-3 text-sm text-red-700">{params.error}</p>}
        {params.success && <p className="mt-5 rounded-xl bg-green-50 p-3 text-sm text-green-700">{params.success}</p>}
        <form action={signup} className="mt-7 space-y-5">
          <label className="block text-sm font-semibold">Nom complet<input required name="fullName" autoComplete="name" className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#0c4f33]" /></label>
          <label className="block text-sm font-semibold">Téléphone<input required name="phone" type="tel" autoComplete="tel" placeholder="+223 ..." className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#0c4f33]" /></label>
          <label className="block text-sm font-semibold">E-mail<input required name="email" type="email" autoComplete="email" className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#0c4f33]" /></label>
          <label className="block text-sm font-semibold">Mot de passe<input required minLength={8} name="password" type="password" autoComplete="new-password" className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#0c4f33]" /></label>
          <button className="w-full rounded-xl bg-[#0c4f33] px-5 py-3 font-bold text-white">Créer mon compte</button>
        </form>
        <p className="mt-6 text-center text-sm text-slate-600">Déjà un compte ? <Link href="/connexion" className="font-bold text-[#0c4f33]">Se connecter</Link></p>
      </div>
    </main>
  );
}
