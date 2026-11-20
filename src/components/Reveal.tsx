'use client';
import { useEffect } from 'react';

/** Attiva le animazioni d'ingresso [data-reveal] e i parallax [data-parallax] con GSAP ScrollTrigger. */
export function RevealController() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => { el.style.opacity = '1'; el.style.transform = 'none'; });
      return;
    }
    let ctx: { revert: () => void } | undefined;
    (async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
          const delay = Number(el.dataset.delay ?? 0);
          const inView = el.getBoundingClientRect().top < window.innerHeight;
          gsap.to(el, {
            opacity: 1, y: 0, duration: 1.1, ease: 'power3.out',
            delay: inView ? 0.15 + delay : delay,
            ...(inView ? {} : { scrollTrigger: { trigger: el, start: 'top 92%', once: true } }),
          });
        });
        gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
          const amt = Number(el.dataset.parallax ?? 60);
          gsap.fromTo(el, { y: -amt / 2 }, { y: amt / 2, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } });
        });
      });
    })();
    return () => ctx?.revert();
  }, []);
  return null;
}
