import type { Lang } from '@/content/site';
import { t } from '@/content/i18n';
import { Camera } from 'lucide-react';

const tones: Record<string, string> = {
  charcoal: 'from-[#2e2822] via-[#221e19] to-[#120f0c] text-stone',
  terracotta: 'from-[#c17a55] via-[#a65f3e] to-[#6e3a24] text-cream',
  cannonau: 'from-[#8a3e48] via-[#692d35] to-[#3b161c] text-cream',
  olive: 'from-[#7d7f5d] via-[#626448] to-[#3a3b2a] text-cream',
  bronze: 'from-[#cfab72] via-[#b08a55] to-[#7a5b32] text-charcoal',
  stone: 'from-[#ece0cb] via-[#d9c7aa] to-[#b9a27c] text-charcoal',
};

/** Segnaposto fotografico onesto: nessuna foto di altri locali attribuita a Il Ritrovo. */
export function PhotoSlot({ label, tone = 'charcoal', lang, className = '' }: { label: string; tone?: string; lang: Lang; className?: string }) {
  return (
    <div className={`grain relative overflow-hidden bg-gradient-to-br ${tones[tone] ?? tones.charcoal} ${className}`}>
      <svg aria-hidden className="absolute inset-0 h-full w-full opacity-[0.10]" preserveAspectRatio="xMidYMid slice" viewBox="0 0 200 200">
        <defs>
          <pattern id={`p-${tone}`} width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M10 0 L20 10 L10 20 L0 10 Z" fill="none" stroke="currentColor" strokeWidth=".6" />
          </pattern>
        </defs>
        <rect width="200" height="200" fill={`url(#p-${tone})`} />
      </svg>
      <div className="absolute inset-0 flex flex-col justify-end p-5">
        <p className="display text-2xl italic">{label}</p>
        <p className="mt-1 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider opacity-70">
          <Camera size={12} aria-hidden /> {t(lang).photoSoon}
        </p>
      </div>
    </div>
  );
}
