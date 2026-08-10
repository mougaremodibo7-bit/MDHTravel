const services = [
  ['Billets d’avion', 'Trouvez et préparez votre voyage avec un accompagnement adapté à votre destination.'],
  ['Visas', 'Bénéficiez d’une assistance pour comprendre et préparer vos démarches de visa.'],
  ['Hôtels', 'Préparez votre séjour avec des solutions d’hébergement adaptées à votre itinéraire.'],
];

const destinations = ['Arabie Saoudite', 'Émirats Arabes Unis', 'Turquie', 'Maroc', 'Europe'];

export default function VoyagesPage() {
  return (
    <main className="min-h-screen bg-white text-[#191c1b]">
      <section className="bg-[#0c4f33] px-6 py-24 text-white lg:px-8"><div className="mx-auto max-w-7xl"><p className="text-sm font-bold uppercase tracking-[0.2em] text-[#c79f33]">Voyages internationaux</p><h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight sm:text-6xl">Organisez votre prochain voyage avec Arafat Voyage.</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-white/80">Billets d’avion, visas et hôtels : nous vous accompagnons pour construire un voyage simple et bien préparé.</p><a href="/#contact" className="mt-9 inline-flex rounded-xl bg-[#c79f33] px-6 py-3 font-semibold text-white">Demander un accompagnement</a></div></section>
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8"><div className="grid gap-5 md:grid-cols-3">{services.map(([title, text]) => <article key={title} className="rounded-2xl border border-slate-100 p-7 shadow-sm"><div className="grid h-12 w-12 place-items-center rounded-xl bg-[#f5eee0] text-[#0c4f33]">✦</div><h2 className="mt-5 text-xl font-bold text-[#0c4f33]">{title}</h2><p className="mt-3 leading-7 text-slate-600">{text}</p></article>)}</div></section>
      <section className="bg-[#f5eee0] px-6 py-20 lg:px-8"><div className="mx-auto max-w-7xl"><p className="text-sm font-bold uppercase tracking-[0.18em] text-[#c79f33]">Destinations</p><h2 className="mt-3 text-3xl font-bold text-[#0c4f33]">Quelques destinations</h2><div className="mt-8 flex flex-wrap gap-3">{destinations.map((destination) => <span key={destination} className="rounded-full bg-white px-5 py-3 font-medium text-[#0c4f33] shadow-sm">{destination}</span>)}</div></div></section>
      <section className="px-6 py-16 text-center lg:px-8"><h2 className="text-3xl font-bold text-[#0c4f33]">Un projet de voyage ?</h2><p className="mx-auto mt-3 max-w-xl text-slate-600">Contactez-nous pour définir votre itinéraire et vos besoins.</p><a href="/#contact" className="mt-7 inline-flex rounded-xl bg-[#0c4f33] px-6 py-3 font-semibold text-white">Nous contacter</a></section>
    </main>
  );
}
