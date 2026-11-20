'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Menu as MenuIcon, X, Phone } from 'lucide-react';
import { business, type Lang } from '@/content/site';
import { href, nav, t, type RouteKey } from '@/content/i18n';
import { Monogram } from './Motif';

export function Header({ lang, current, overHero = false }: { lang: Lang; current?: RouteKey; overHero?: boolean }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const d = t(lang);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  const light = overHero && !scrolled && !open;
  const otherLang: Lang = lang === 'it' ? 'en' : 'it';

  return (
    <header
      className={`fixed inset-x-0 top-[var(--demo-h,0px)] z-40 transition-colors duration-500 ${
        light ? 'text-cream' : 'bg-cream/90 text-charcoal shadow-[0_1px_0_rgba(34,30,25,.08)] backdrop-blur-md'
      }`}
    >
      <div className="wrap flex h-16 items-center justify-between gap-6 lg:h-20">
        <Link href={href('home', lang)} className="flex items-center gap-3" aria-label={`${business.name} — Home`}>
          <Monogram className="h-9 w-9" />
          <span className="leading-none">
            <span className="display block text-2xl">Il Ritrovo</span>
            <span className="eyebrow block text-[9px] opacity-70">Mamoiada · Barbagia</span>
          </span>
        </Link>

        <nav aria-label="Principale" className="hidden items-center gap-7 lg:flex">
          {nav.map((k) => (
            <Link
              key={k}
              href={href(k, lang)}
              aria-current={current === k ? 'page' : undefined}
              className={`text-[13px] font-medium tracking-wide transition hover:text-terracotta ${current === k ? 'text-terracotta' : ''}`}
            >
              {d.nav[k]}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link href={href(current ?? 'home', otherLang)} className="hidden text-xs font-semibold uppercase tracking-wider opacity-80 hover:opacity-100 sm:block" hrefLang={otherLang}>
            {otherLang.toUpperCase()}
          </Link>
          <a href={business.phoneHref} className="hidden h-10 w-10 items-center justify-center rounded-full border border-[color:color-mix(in_srgb,currentColor_30%,transparent)] sm:flex" aria-label={d.call}>
            <Phone size={16} />
          </a>
          <Link href={`${href('contact', lang)}#prenota`} className="btn-primary hidden !px-5 !py-2.5 md:inline-flex">
            {d.book}
          </Link>
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Chiudi menu' : 'Apri menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X /> : <MenuIcon />}
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-[calc(var(--demo-h,0px)+4rem)] overflow-y-auto bg-cream px-6 pb-28 pt-6 lg:hidden"
      >
        <nav aria-label="Mobile" className="flex flex-col">
          {(['home', ...nav] as RouteKey[]).map((k) => (
            <Link key={k} href={href(k, lang)} onClick={() => setOpen(false)} className="display border-b border-charcoal/10 py-4 text-4xl">
              {d.nav[k]}
            </Link>
          ))}
        </nav>
        <div className="mt-8 flex flex-col gap-3">
          <a href={business.phoneHref} className="btn-dark"><Phone size={16} /> {business.phoneDisplay}</a>
          <Link href={href(current ?? 'home', otherLang)} onClick={() => setOpen(false)} className="btn border border-charcoal/20">{d.langSwitch}</Link>
        </div>
      </div>
    </header>
  );
}
