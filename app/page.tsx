import { Header } from '@/components/header';
import { SectionHeading } from '@/components/section-heading';

const services = [
  { title: 'Hajj', text: 'Un accompagnement structuré pour préparer votre pèlerinage dans les meilleures conditions.', href: '#inscription' },
  { title: 'Oumra', text: 'Des formules adaptées pour vivre votre Oumra avec sérénité et un suivi personnalisé.', href: '#inscription' },
  { title: 'Voyages internationaux', text: 'Billets, visas et hébergements pour vos déplacements professionnels ou personnels.', href: '#voyages' },
];

const benefits = ['Accompagnement personnalisé', 'Dossiers suivis avec rigueur', 'Assistance avant et pendant le voyage', 'Paiements adaptés au contexte malien'];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-[#1a1c1f]">
      <Header />

      <section id="accueil" className="relative overflow-hidden bg-[#0c4f33]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(199,158,51,.22),transparent_32%),linear-gradient(135deg,#0c4f33,#083b27)]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-24 lg:grid-cols-[1.1fr_.9fr] lg:items-center lg:px-8 lg:py-32">
          <div>
            <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#f5eddb]">Hajj • Oumra • International</span>
            <h1 className="mt-6 max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-6xl">Votre voyage commence par une organisation fiable.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/80">Arafat Voyage vous accompagne pour le Hajj, la Oumra et vos voyages internationaux depuis le Mali.</p>
            <div className="mt-9 flex flex-wrap gap-4" id="inscription">
              <a href="#hajj" className="rounded-xl bg-[#c79e33] px-6 py-3.5 font-bold text-white shadow-lg transition hover:-translate-y-0.5">Découvrir nos offres</a>
              <a href="#contact" className="rounded-xl border border-white/30 bg-white/10 px-6 py-3.5 font-bold text-white transition hover:bg-white/15">Nous contacter</a>
            </div>
          </div>
          <div className="rounded-3xl border border-white/15 bg-white/10 p-6 shadow-2xl backdrop-blur-sm">
            <div className="rounded-2xl bg-[#f5eddb] p-6 text-[#0c4f33]">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#c79e33]">Arafat Voyage</p>
              <h2 className="mt-3 text-3xl font-bold">Préparez votre pèlerinage en toute sérénité.</h2>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {['Inscription', 'Documents', 'Suivi du dossier', 'Assistance'].map((item) => <div key={item} className="rounded-xl bg-white p-4 text-sm font-semibold shadow-sm">{item}</div>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <SectionHeading eyebrow="Nos services" title="Une agence pensée pour vos projets de voyage" description="Des services clairs, un accompagnement humain et une organisation adaptée à chaque étape." />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {services.map((service) => <article key={service.title} className="group rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"><div className="grid h-12 w-12 place-items-center rounded-xl bg-[#f5eddb] font-bold text-[#0c4f33]">AV</div><h3 className="mt-6 text-2xl font-bold text-[#0c4f33]">{service.title}</h3><p className="mt-3 leading-7 text-slate-600">{service.text}</p><a href={service.href} className="mt-6 inline-flex font-bold text-[#0c4f33]">En savoir plus →</a></article>)}
        </div>
      </section>

      <section id="hajj" className="bg-[#f5eddb] px-5 py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
          <div><p className="text-sm font-bold uppercase tracking-[0.2em] text-[#c79e33]">Hajj & Oumra</p><h2 className="mt-3 text-3xl font-bold text-[#0c4f33] sm:text-4xl">Un accompagnement à chaque étape</h2><p className="mt-5 max-w-xl leading-8 text-slate-700">De la préparation du dossier aux informations pratiques du voyage, nous centralisons les étapes essentielles pour vous simplifier la préparation.</p><a href="#contact" className="mt-7 inline-flex rounded-xl bg-[#0c4f33] px-6 py-3 font-bold text-white">Demander des informations</a></div>
          <div className="grid gap-4 sm:grid-cols-2">{benefits.map((benefit, index) => <div key={benefit} className="rounded-2xl bg-white p-5 shadow-sm"><span className="text-sm font-bold text-[#c79e33]">0{index + 1}</span><p className="mt-2 font-semibold text-[#0c4f33]">{benefit}</p></div>)}</div>
        </div>
      </section>

      <section id="oumra" className="mx-auto max-w-7xl px-5 py-20 lg:px-8"><SectionHeading eyebrow="Oumra" title="Des formules simples à comprendre" description="Présentez vos besoins et notre équipe vous orientera vers la formule adaptée à votre projet." /><div className="mx-auto mt-10 max-w-4xl rounded-3xl border border-[#c79e33]/30 bg-white p-8 shadow-lg sm:p-10"><div className="grid gap-8 md:grid-cols-3"><div><p className="text-sm text-slate-500">Formule</p><p className="mt-1 text-xl font-bold text-[#0c4f33]">Oumra</p></div><div><p className="text-sm text-slate-500">Accompagnement</p><p className="mt-1 text-xl font-bold text-[#0c4f33]">Personnalisé</p></div><div><p className="text-sm text-slate-500">Inscription</p><a href="#contact" className="mt-1 inline-block font-bold text-[#c79e33]">Nous contacter →</a></div></div></div></section>

      <section id="voyages" className="bg-[#0c4f33] px-5 py-20 text-white lg:px-8"><div className="mx-auto max-w-7xl"><SectionHeading eyebrow="International" title="Voyagez au-delà du pèlerinage" description="Billetterie, visas et hébergement pour faciliter vos déplacements internationaux." /><div className="mt-12 grid gap-5 md:grid-cols-3">{['Billets d’avion', 'Visas', 'Hôtels'].map((item) => <div key={item} className="rounded-2xl border border-white/15 bg-white/10 p-7 backdrop-blur"><h3 className="text-xl font-bold">{item}</h3><p className="mt-3 text-white/70">Une assistance adaptée à votre destination et à votre dossier.</p></div>)}</div></div></section>

      <section id="apropos" className="mx-auto max-w-7xl px-5 py-20 lg:px-8"><SectionHeading eyebrow="Pourquoi Arafat Voyage" title="Une expérience claire, humaine et professionnelle" description="Notre interface et nos processus sont conçus pour rendre vos démarches plus simples, du premier contact au suivi du voyage." /></section>

      <section id="contact" className="bg-[#f5eddb] px-5 py-20 lg:px-8"><div className="mx-auto max-w-3xl"><SectionHeading eyebrow="Contact" title="Parlons de votre prochain voyage" description="Contactez-nous pour obtenir des informations sur le Hajj, la Oumra ou un voyage international." /><div className="mt-10 grid gap-4 rounded-3xl bg-white p-7 shadow-lg sm:grid-cols-2"><input className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#0c4f33]" placeholder="Nom et prénom" /><input className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#0c4f33]" placeholder="Téléphone" /><input className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#0c4f33] sm:col-span-2" placeholder="Email" /><textarea className="min-h-32 rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#0c4f33] sm:col-span-2" placeholder="Votre message" /><button className="rounded-xl bg-[#0c4f33] px-6 py-3 font-bold text-white sm:col-span-2">Envoyer le message</button></div></div></section>

      <footer className="bg-[#1a1c1f] px-5 py-10 text-white lg:px-8"><div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div><p className="font-bold">ARAFAT VOYAGE</p><p className="mt-1 text-sm text-white/60">Hajj • Oumra • Voyages internationaux</p></div><p className="text-sm text-white/50">© 2026 Arafat Voyage. Tous droits réservés.</p></div></footer>
    </main>
  );
}
