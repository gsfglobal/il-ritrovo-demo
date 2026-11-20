import { ExternalLink, Star } from 'lucide-react';
import { ratings, reviews, type Lang } from '@/content/site';
import { t } from '@/content/i18n';

export function Stars({ value, className = '' }: { value: number; className?: string }) {
  return (
    <span className={`inline-flex gap-0.5 ${className}`} aria-label={`${value} / 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} size={14} aria-hidden className={i < Math.round(value) ? 'fill-bronze text-bronze' : 'text-current opacity-30'} />
      ))}
    </span>
  );
}

export function RatingBadges({ lang, dark = false }: { lang: Lang; dark?: boolean }) {
  return (
    <div className="flex flex-wrap gap-4">
      {ratings.map((r) => (
        <a key={r.source} href={r.href} target="_blank" rel="noopener" className={`group flex items-center gap-4 rounded-2xl border px-5 py-4 transition ${dark ? 'border-stone/15 hover:border-bronze' : 'border-charcoal/10 bg-white/50 hover:border-terracotta'}`}>
          <span className="display text-5xl">{r.value.toLocaleString(lang === 'it' ? 'it-IT' : 'en-GB')}</span>
          <span className="text-sm">
            <Stars value={r.value} />
            <span className="mt-1 block font-semibold">{r.source} · {r.count} {lang === 'it' ? 'recensioni' : 'reviews'}</span>
            <span className="block text-xs opacity-60">{r.note[lang]}</span>
          </span>
          <ExternalLink size={14} className="opacity-40 transition group-hover:opacity-100" aria-hidden />
        </a>
      ))}
    </div>
  );
}

export function ReviewCards({ lang, limit }: { lang: Lang; limit?: number }) {
  const list = limit ? reviews.slice(0, limit) : reviews;
  return (
    <>
      <ul className="grid gap-5 md:grid-cols-3">
        {list.map((r, i) => (
          <li key={r.author} data-reveal data-delay={(i % 3) * 0.1} className="flex flex-col rounded-2xl border border-charcoal/10 bg-white/55 p-7">
            <Stars value={r.rating} />
            <blockquote className="mt-5 flex-1 font-serif text-2xl leading-snug">{r.summary[lang]}</blockquote>
            <footer className="mt-6 flex items-end justify-between gap-4 border-t border-charcoal/10 pt-4 text-sm">
              <span><span className="block font-semibold">{r.author}</span><span className="text-charcoal/60">{r.date[lang]}</span></span>
              <a href={r.href} target="_blank" rel="noopener" className="link-u shrink-0 text-xs font-semibold">{t(lang).readOn} {r.source}</a>
            </footer>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-xs text-charcoal/60">{t(lang).reviewsNote}</p>
    </>
  );
}
