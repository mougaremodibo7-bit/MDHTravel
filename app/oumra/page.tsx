const services = [
  ['01', 'Préparation du dossier', 'Nous vous guidons dans la préparation des informations et documents nécessaires.'],
  ['02', 'Organisation du séjour', 'Une organisation claire pour votre transport, hébergement et programme.'],
  ['03', 'Assistance', 'Une équipe disponible pour vous accompagner avant et pendant votre voyage.'],
];

export default function OumraPage() {
  return (
    <main className="min-h-screen bg-white text-[#191c1b]">
      <section className="bg-[#f5eee0] px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#c79f33]">Oumra</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight text-[#0c4f33] sm:text-6xl">Vivez votre Oumra dans les meilleures conditions.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">Découvrez une offre pensée pour simplifier votre préparation et vous permettre de vous concentrer sur votre expérience spirituelle.</p>
          <div className="mt-9 flex flex-wrap gap-4"><a href="/inscription?type=oumra" className="rounded-xl bg-[#0c4f33] px-6 py-3 font-semibold text-white">S'inscrire à l'Oumra</a><a href="/#contact" className="rounded-xl border border-[#c79f33] px-6 py-3 font-semibold text-[#0c4f33]">Demander des informations</a></div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8"><div className="max-w-2xl"><p className="text-sm font-bold uppercase tracking-[0.18em] text-[#c79f33]">Notre service</p><h2 className="mt-3 text-3xl font-bold text-[#0c4f33] sm:text-4xl">Un accompagnement simple et humain.</h2></div><div className="mt-10 grid gap-5 md:grid-cols-3">{services.map(([number, title, text]) => <article key={number} className="rounded-2xl border border-slate-100 bg-white p-7 shadow-sm"><span className="text-sm font-bold text-[#c79f33]">{number}</span><h3 className="mt-4 text-xl font-bold text-[#0c4f33]">{title}</h3><p className="mt-3 leading-7 text-slate-600">{text}</p></article>)}</div></section>
      <section className="bg-[#0c4f33] px-6 py-16 text-center text-white lg:px-8"><h2 className="text-3xl font-bold">Votre projet d'Oumra commence maintenant.</h2><p className="mx-auto mt-3 max-w-xl text-white/75">Parlez-nous de votre projet et notre équipe vous orientera vers la formule adaptée.</p><a href="/inscription?type=oumra" className="mt-7 inline-flex rounded-xl bg-[#c79f33] px-6 py-3 font-semibold text-white">Commencer</a></section>
    </main>
  );
}
