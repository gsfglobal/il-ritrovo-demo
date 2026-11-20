'use client';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import type { Lang } from '@/content/site';

const SignatureScene = dynamic(() => import('./SignatureScene'), { ssr: false });

type Panel = { n: string; title: string; sard?: string; text: string };

export function Signature({ lang, panels, eyebrow, heading }: { lang: Lang; panels: Panel[]; eyebrow: string; heading: string }) {
  const section = useRef<HTMLElement>(null);
  const progress = useRef(0);
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  const [webgl, setWebgl] = useState(true);

  useEffect(() => {
    try {
      const c = document.createElement('canvas');
      setWebgl(!!(c.getContext('webgl2') || c.getContext('webgl')));
    } catch { setWebgl(false); }
    const el = section.current!;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setVisible(true), { rootMargin: '400px' });
    io.observe(el);
    const onScroll = () => {
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      const p = Math.min(Math.max(-r.top / total, 0), 1);
      progress.current = p;
      setActive(Math.min(panels.length - 1, Math.round(p * (panels.length - 1))));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { io.disconnect(); window.removeEventListener('scroll', onScroll); };
  }, [panels.length]);

  return (
    <section ref={section} aria-label={heading} className="relative bg-ink text-cream" style={{ height: `${panels.length * 100 + 40}vh` }}>
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div className="absolute inset-0">
          {visible && webgl && <SignatureScene progress={progress} />}
          {!webgl && <div className="absolute inset-0 bg-gradient-to-br from-cannonau/40 via-ink to-ink" />}
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-transparent md:via-ink/40" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink to-transparent md:hidden" />

        <div className="wrap relative flex h-full flex-col justify-end pb-28 pt-24 md:justify-center md:pb-0">
          <p className="eyebrow text-bronze">{eyebrow}</p>
          <h2 className="display mt-4 max-w-md text-4xl md:text-6xl">{heading}</h2>
          <div className="mt-8 grid max-w-md md:mt-12">
            {panels.map((p, i) => (
              <article
                key={p.n}
                aria-hidden={active !== i}
                className={`col-start-1 row-start-1 transition-all duration-700 ease-out ${active === i ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'}`}
              >
                <p className="font-serif text-6xl italic text-terracotta/80">{p.n}</p>
                <h3 className="display mt-2 text-3xl md:text-4xl">{p.title}</h3>
                {p.sard && <p className="mt-1 text-xs uppercase tracking-widest2 text-bronze">{p.sard}</p>}
                <p className="mt-4 leading-relaxed text-stone">{p.text}</p>
              </article>
            ))}
          </div>
          <ol className="mt-6 flex gap-2" aria-label={lang === 'it' ? 'Avanzamento' : 'Progress'}>
            {panels.map((p, i) => (
              <li key={p.n} className={`h-[2px] w-10 transition-colors ${i <= active ? 'bg-bronze' : 'bg-stone/20'}`} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
