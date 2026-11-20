'use client';
import { useState } from 'react';
import { MapPin } from 'lucide-react';
import { business, directionsUrl, type Lang } from '@/content/site';

/** Mappa Google caricata solo dopo il consenso (evita cookie di terze parti senza permesso). */
export function MapConsent({ lang }: { lang: Lang }) {
  const [on, setOn] = useState(false);
  const src = `https://www.google.com/maps?q=${encodeURIComponent(business.mapsQuery)}&z=16&output=embed`;
  return (
    <div className="relative h-full min-h-[360px] overflow-hidden rounded-2xl bg-stone">
      {on ? (
        <iframe title={lang === 'it' ? 'Mappa — Il Ritrovo, Mamoiada' : 'Map — Il Ritrovo, Mamoiada'} src={src} className="absolute inset-0 h-full w-full border-0 grayscale-[35%] sepia-[15%]" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
      ) : (
        <div className="grain absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[radial-gradient(circle_at_50%_45%,#e8dcc5,#d9c7aa_60%,#c4ad87)] p-6 text-center">
          <svg aria-hidden viewBox="0 0 400 260" className="absolute inset-0 h-full w-full opacity-30">
            <path d="M-10 160 C 80 140, 140 180, 210 150 S 340 110, 420 130" stroke="#221e19" strokeWidth="10" fill="none" />
            <path d="M120 -10 C 140 80, 170 120, 200 150 S 230 240, 250 280" stroke="#221e19" strokeWidth="4" fill="none" />
            <path d="M300 -10 L 260 300" stroke="#221e19" strokeWidth="3" fill="none" />
          </svg>
          <MapPin className="relative text-terracotta" size={40} />
          <p className="relative display text-2xl">{business.street}, {business.city}</p>
          <div className="relative flex flex-wrap justify-center gap-3">
            <button type="button" className="btn-dark" onClick={() => setOn(true)}>{lang === 'it' ? 'Carica la mappa Google' : 'Load Google map'}</button>
            <a href={directionsUrl} target="_blank" rel="noopener" className="btn border border-charcoal/25">{lang === 'it' ? 'Apri in Maps' : 'Open in Maps'}</a>
          </div>
          <p className="relative max-w-xs text-xs text-charcoal/60">{lang === 'it' ? 'Caricando la mappa accetti i cookie di Google Maps.' : 'Loading the map accepts Google Maps cookies.'}</p>
        </div>
      )}
    </div>
  );
}
