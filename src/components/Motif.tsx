/** Fascia decorativa geometrica ispirata alla tessitura tradizionale (motivo generico a rombi). */
export function MotifBand({ className = '', color = 'currentColor' }: { className?: string; color?: string }) {
  return (
    <svg aria-hidden className={className} width="100%" height="18" preserveAspectRatio="none">
      <defs>
        <pattern id="mb" width="36" height="18" patternUnits="userSpaceOnUse">
          <path d="M0 9 L9 0 L18 9 L9 18 Z M18 9 L27 0 L36 9 L27 18 Z" fill="none" stroke={color} strokeWidth="1" />
          <circle cx="9" cy="9" r="1.6" fill={color} />
          <path d="M27 5 L31 9 L27 13 L23 9 Z" fill={color} />
        </pattern>
      </defs>
      <rect width="100%" height="18" fill="url(#mb)" />
    </svg>
  );
}

export function Monogram({ className = '' }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 48 48" className={className}>
      <rect x="4" y="4" width="40" height="40" transform="rotate(45 24 24)" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <text x="24" y="31" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="22" fill="currentColor">R</text>
    </svg>
  );
}
