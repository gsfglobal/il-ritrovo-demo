'use client';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';

const HeroScene = dynamic(() => import('./HeroScene'), { ssr: false });

function webglOK() {
  try {
    const c = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')));
  } catch {
    return false;
  }
}

/** Fallback statico (nessun WebGL o risparmio dati): piatto in ceramica illustrato. */
export function PlateFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center" aria-hidden>
      <svg viewBox="0 0 400 400" className="w-[78%] max-w-[560px] drop-shadow-[0_40px_60px_rgba(0,0,0,.55)]">
        <defs>
          <radialGradient id="glaze" cx="45%" cy="40%" r="60%">
            <stop offset="0" stopColor="#f7eedd" /><stop offset="1" stopColor="#d9c7aa" />
          </radialGradient>
          <radialGradient id="pasta" cx="45%" cy="40%" r="60%">
            <stop offset="0" stopColor="#e9bd73" /><stop offset="1" stopColor="#b9773d" />
          </radialGradient>
        </defs>
        <circle cx="200" cy="200" r="190" fill="url(#glaze)" />
        <circle cx="200" cy="200" r="168" fill="none" stroke="#692d35" strokeWidth="2" />
        {Array.from({ length: 28 }).map((_, i) => {
          const a = (i / 28) * Math.PI * 2;
          const x = 200 + Math.cos(a) * 156, y = 200 + Math.sin(a) * 156;
          return <rect key={i} x={x - 5} y={y - 5} width="10" height="10" fill="#a65f3e" transform={`rotate(${(a * 180) / Math.PI + 45} ${x} ${y})`} />;
        })}
        <circle cx="200" cy="200" r="138" fill="none" stroke="#a65f3e" strokeWidth="4" />
        <circle cx="200" cy="200" r="104" fill="url(#pasta)" />
        {Array.from({ length: 60 }).map((_, i) => {
          const a = i * 2.39996, r = Math.sqrt(i / 60) * 92;
          return <ellipse key={i} cx={200 + Math.cos(a) * r} cy={200 + Math.sin(a) * r} rx="11" ry="5" fill={i % 4 ? '#e4b46a' : '#93401f'} stroke="#a4683a" strokeWidth=".6" transform={`rotate(${i * 47} ${200 + Math.cos(a) * r} ${200 + Math.sin(a) * r})`} />;
        })}
      </svg>
    </div>
  );
}

export function Scene3D() {
  const ref = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<'pending' | '3d' | 'fallback'>('pending');
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const red = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    setReduced(red);
    if (!webglOK() || conn?.saveData) { setMode('fallback'); return; }
    const start = () => setMode('3d');
    const ric = (window as Window & { requestIdleCallback?: (cb: () => void) => number }).requestIdleCallback;
    if (ric) ric(start); else setTimeout(start, 200);
  }, []);

  return (
    <div ref={ref} className="absolute inset-0">
      {mode !== '3d' && <PlateFallback />}
      {mode === '3d' && <HeroScene reduced={reduced} />}
    </div>
  );
}
