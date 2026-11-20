import type { ReactNode } from 'react';
import type { Lang } from '@/content/site';
import type { RouteKey } from '@/content/i18n';
import { t } from '@/content/i18n';
import { Header } from './Header';
import { Footer } from './Footer';
import { DemoBanner } from './DemoBanner';
import { MobileBookBar } from './MobileBookBar';
import { RevealController } from './Reveal';

export function Shell({ lang, current, overHero, children }: { lang: Lang; current?: RouteKey; overHero?: boolean; children: ReactNode }) {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-14 focus:z-[60] focus:rounded focus:bg-charcoal focus:px-4 focus:py-2 focus:text-cream">{t(lang).skip}</a>
      <DemoBanner lang={lang} />
      <Header lang={lang} current={current} overHero={overHero} />
      <main id="main">{children}</main>
      <Footer lang={lang} />
      <MobileBookBar lang={lang} />
      <RevealController />
    </>
  );
}

/** Intestazione standard per le pagine interne. */
export function PageHero({ eyebrow, title, intro }: { eyebrow: string; title: ReactNode; intro?: ReactNode }) {
  return (
    <section className="relative overflow-hidden bg-charcoal pb-20 pt-[calc(var(--demo-h,0px)+9rem)] text-cream md:pb-28 md:pt-[calc(var(--demo-h,0px)+12rem)]">
      <div className="grain absolute inset-0" aria-hidden />
      <div aria-hidden className="absolute -right-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-terracotta/20 blur-3xl" />
      <div className="wrap relative">
        <p className="eyebrow text-bronze" data-reveal>{eyebrow}</p>
        <h1 className="display mt-5 max-w-4xl text-5xl sm:text-6xl md:text-8xl" data-reveal data-delay=".1">{title}</h1>
        {intro && <div className="mt-8 max-w-2xl text-lg leading-relaxed text-stone" data-reveal data-delay=".2">{intro}</div>}
      </div>
    </section>
  );
}
