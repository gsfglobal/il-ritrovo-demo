'use client';
import { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { gallery, type Lang } from '@/content/site';
import { PhotoSlot } from './PhotoSlot';

const spans: Record<string, string> = {
  tall: 'aspect-[4/5] md:aspect-auto md:row-span-2',
  wide: 'aspect-[16/10] md:aspect-auto md:col-span-2',
  square: 'aspect-square md:aspect-auto',
};

export function Gallery({ lang, limit }: { lang: Lang; limit?: number }) {
  const items = limit ? gallery.slice(0, limit) : gallery;
  const [open, setOpen] = useState<number | null>(null);
  const close = useCallback(() => setOpen(null), []);
  const move = useCallback((dir: number) => setOpen((o) => (o === null ? o : (o + dir + items.length) % items.length)), [items.length]);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') move(1);
      if (e.key === 'ArrowLeft') move(-1);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [open, close, move]);

  return (
    <>
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:auto-rows-[220px] md:grid-flow-row-dense md:grid-cols-4 md:gap-4">
        {items.map((g, i) => (
          <li key={g.id} className={spans[g.span]} data-reveal data-delay={(i % 4) * 0.08}>
            <button type="button" onClick={() => setOpen(i)} className="group block h-full w-full overflow-hidden rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta" aria-label={g.label[lang]}>
              <PhotoSlot lang={lang} label={g.label[lang]} tone={g.tone} className="h-full w-full transition duration-700 group-hover:scale-[1.04]" />
            </button>
          </li>
        ))}
      </ul>
      {open !== null && (
        <div role="dialog" aria-modal="true" aria-label={items[open].label[lang]} className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/95 p-4" onClick={close}>
          <div className="relative aspect-[4/3] w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <PhotoSlot lang={lang} label={items[open].label[lang]} tone={items[open].tone} className="h-full w-full rounded-xl" />
          </div>
          <button className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-cream/10 text-cream" onClick={close} aria-label="Chiudi"><X /></button>
          <button className="absolute left-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-cream/10 text-cream" onClick={(e) => { e.stopPropagation(); move(-1); }} aria-label="Precedente"><ChevronLeft /></button>
          <button className="absolute right-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-cream/10 text-cream" onClick={(e) => { e.stopPropagation(); move(1); }} aria-label="Successiva"><ChevronRight /></button>
          <p className="absolute bottom-6 text-sm text-stone">{open + 1} / {items.length}</p>
        </div>
      )}
    </>
  );
}
