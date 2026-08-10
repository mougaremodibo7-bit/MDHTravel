'use client';

import { FormEvent, useState } from 'react';
import { useSearchParams } from 'next/navigation';

const inputClass = 'mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#0c4f33] focus:ring-2 focus:ring-[#0c4f33]/10';

export default function InscriptionPage() {
  const searchParams = useSearchParams();
  const initialType = searchParams.get('type') === 'oumra' ? 'oumra' : 'hajj';
  const [type, setType] = useState(initialType);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="min-h-screen bg-[#f8f8f5] px-5 py-12 text-[#191c1b] lg:px-8 lg:py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#c79f33]">Arafat Voyage</p>
          <h1 className="mt-3 text-3xl font-bold text-[#0c4f33] sm:text-5xl">Inscription Hajj / Oumra</h1>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600">Remplissez vos informations. Nous vous contacterons pour la suite de votre dossier.</p>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5 sm:p-10">
          <div className="mb-8 grid grid-cols-2 rounded-2xl bg-[#f5eee0] p-1">
            <button type="button" onClick={() => setType('hajj')} className={`rounded-xl px-4 py-3 text-sm font-bold transition ${type === 'hajj' ? 'bg-[#0c4f33] text-white shadow-sm' : 'text-[#0c4f33]'}`}>Hajj</button>
            <button type="button" onClick={() => setType('oumra')} className={`rounded-xl px-4 py-3 text-sm font-bold transition ${type === 'oumra' ? 'bg-[#0c4f33] text-white shadow-sm' : 'text-[#0c4f33]'}`}>Oumra</button>
          </div>

          {submitted && <div className="mb-8 rounded-2xl border border-green-200 bg-green-50 p-4 text-sm text-green-800">Votre formulaire est prêt. La prochaine étape sera l'enregistrement sécurisé dans Supabase.</div>}

          <form onSubmit={handleSubmit} className="space-y-10">
            <section>
              <h2 className="text-xl font-bold text-[#0c4f33]">1. Informations personnelles</h2>
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <label className="text-sm font-semibold">Prénom<input required name="firstName" className={inputClass} /></label>
                <label className="text-sm font-semibold">Nom<input required name="lastName" className={inputClass} /></label>
                <label className="text-sm font-semibold">Date de naissance<input required type="date" name="birthDate" className={inputClass} /></label>
                <label className="text-sm font-semibold">Lieu de naissance<input required name="birthPlace" className={inputClass} /></label>
                <label className="text-sm font-semibold">Nationalité<input required name="nationality" defaultValue="Malienne" className={inputClass} /></label>
                <label className="text-sm font-semibold">Téléphone<input required type="tel" name="phone" placeholder="+223 ..." className={inputClass} /></label>
                <label className="text-sm font-semibold sm:col-span-2">Adresse<input name="address" className={inputClass} /></label>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#0c4f33]">2. Passeport</h2>
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <label className="text-sm font-semibold">Numéro de passeport<input required name="passportNumber" className={inputClass} /></label>
                <label className="text-sm font-semibold">Date d'expiration<input required type="date" name="passportExpiry" className={inputClass} /></label>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#0c4f33]">3. Contact d'urgence</h2>
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <label className="text-sm font-semibold">Nom du contact<input required name="emergencyName" className={inputClass} /></label>
                <label className="text-sm font-semibold">Téléphone du contact<input required type="tel" name="emergencyPhone" className={inputClass} /></label>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#0c4f33]">4. Documents</h2>
              <p className="mt-2 text-sm text-slate-500">Les fichiers seront envoyés vers le Storage Supabase à l'étape suivante.</p>
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <label className="text-sm font-semibold">Passeport<input required type="file" accept="application/pdf,image/jpeg,image/png,image/webp" name="passportFile" className={inputClass} /></label>
                <label className="text-sm font-semibold">Photo d'identité<input required type="file" accept="image/jpeg,image/png,image/webp" name="photoFile" className={inputClass} /></label>
                <label className="text-sm font-semibold sm:col-span-2">Autres documents<input multiple type="file" accept="application/pdf,image/jpeg,image/png,image/webp" name="otherDocuments" className={inputClass} /></label>
              </div>
            </section>

            <section>
              <label className="text-sm font-semibold">Informations complémentaires<textarea name="notes" rows={4} className={inputClass} /></label>
            </section>

            <input type="hidden" name="registrationType" value={type} />
            <button type="submit" className="w-full rounded-xl bg-[#0c4f33] px-6 py-4 font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:opacity-95">Envoyer ma demande {type === 'hajj' ? 'Hajj' : 'Oumra'}</button>
          </form>
        </div>
      </div>
    </main>
  );
}
