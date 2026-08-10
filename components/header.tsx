'use client';

import { useState } from 'react';

const links = [
  ['Accueil', '#accueil'],
  ['Hajj', '#hajj'],
  ['Oumra', '#oumra'],
  ['Voyages', '#voyages'],
  ['À propos', '#apropos'],
  ['Contact', '#contact'],
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        <a href="#accueil" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#0c4f33] text-sm font-bold text-white">AV</span>
          <span className="leading-none"><strong className="block text-lg text-[#0c4f33]">ARAFAT</strong><span className="text-xs font-semibold tracking-[0.18em] text-[#c79f33]">VOYAGE</span></span>
        </a>
        <nav className="hidden items-center gap-7 lg:flex">
          {links.map(([label, href]) => <a key={href} href={href} className="text-sm font-medium text-slate-700 transition hover:text-[#0c4f33]">{label}</a>)}
        </nav>
        <a href="#inscription" className="hidden rounded-xl bg-[#0c4f33] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 lg:inline-flex">Réserver</a>
        <button aria-label="Ouvrir le menu" className="grid h-11 w-11 place-items-center rounded-xl border border-slate-200 lg:hidden" onClick={() => setOpen(!open)}>
          <span className="text-xl">{open ? '×' : '☰'}</span>
        </button>
      </div>
      {open && <nav className="border-t border-slate-100 bg-white px-5 py-4 lg:hidden">{links.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)} className="block border-b border-slate-100 py-3 text-sm font-semibold text-slate-700">{label}</a>)}<a href="#inscription" onClick={() => setOpen(false)} className="mt-4 block rounded-xl bg-[#0c4f33] px-5 py-3 text-center font-semibold text-white">Réserver</a></nav>}
    </header>
  );
}
