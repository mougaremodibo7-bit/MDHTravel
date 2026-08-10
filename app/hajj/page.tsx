const highlights = [
  'Accompagnement administratif et personnalisé',
  'Organisation du séjour et hébergement',
  'Assistance avant et pendant le pèlerinage',
  'Suivi du dossier et des documents',
];

export default function HajjPage() {
  return (
    <main className="min-h-screen bg-white text-[#191c1b]">
      <section className="bg-[#0c4f33] px-6 py-24 text-white lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-[#c79f33]">Arafat Voyage</p>
          <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-6xl">Hajj : préparez votre pèlerinage avec sérénité.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/80">Un accompagnement structuré pour préparer votre voyage, vos documents et votre séjour en toute confiance.</p>
          <a href="/inscription?type=hajj" className="mt-9 inline-flex rounded-xl bg-[#c79f33] px-6 py-3 font-semibold text-white transition hover:opacity-90">Commencer mon inscription</a>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-2 lg:px-8">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#c79f33]">Notre accompagnement</p>
          <h2 className="mt-3 text-3xl font-bold text-[#0c4f33] sm:text-4xl">Tout préparer, étape par étape.</h2>
          <p className="mt-5 leading-7 text-slate-600">Arafat Voyage vous accompagne dans les différentes étapes de votre projet de Hajj, de la préparation du dossier jusqu'au voyage.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {highlights.map((item, index) => <article key={item} className="rounded-2xl border border-slate-100 bg-[#f5eee0] p-6 shadow-sm"><span className="text-sm font-bold text-[#c79f33]">0{index + 1}</span><h3 className="mt-3 font-semibold text-[#0c4f33]">{item}</h3></article>)}
        </div>
      </section>
      <section className="bg-slate-50 px-6 py-16 text-center lg:px-8"><h2 className="text-2xl font-bold text-[#0c4f33]">Prêt à préparer votre Hajj ?</h2><p className="mx-auto mt-3 max-w-xl text-slate-600">Inscrivez-vous pour transmettre vos informations et préparer votre dossier.</p><a href="/inscription?type=hajj" className="mt-6 inline-flex rounded-xl bg-[#0c4f33] px-6 py-3 font-semibold text-white">S'inscrire au Hajj</a></section>
    </main>
  );
}
