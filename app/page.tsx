export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 py-16 lg:px-8">
        <span className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#c79f33]">
          Arafat Voyage
        </span>
        <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-[#0c4f33] sm:text-6xl">
          Votre voyage Hajj, Oumra et international commence ici.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
          Une plateforme moderne pour découvrir nos offres, préparer votre inscription et suivre votre dossier.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <button className="rounded-xl bg-[#0c4f33] px-6 py-3 font-semibold text-white shadow-sm transition hover:opacity-90">
            Découvrir nos offres
          </button>
          <button className="rounded-xl border border-[#c79f33] px-6 py-3 font-semibold text-[#0c4f33] transition hover:bg-[#f5eee0]">
            S'inscrire au Hajj / Oumra
          </button>
        </div>
      </section>
    </main>
  );
}
